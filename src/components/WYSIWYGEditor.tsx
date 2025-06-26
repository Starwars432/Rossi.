import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Move, 
  Type, 
  Image as ImageIcon,
  Settings,
  Undo,
  Redo,
  Upload,
  Download,
  Layers,
  Palette,
  Square,
  MousePointer,
  Grid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Plus,
  Trash2,
  Copy,
  RotateCw,
  Crop,
  Filter
} from 'lucide-react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAuth } from '../contexts/AuthContext';

interface WYSIWYGEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditableElement {
  id: string;
  type: 'text' | 'image' | 'section' | 'button' | 'heading';
  element: HTMLElement;
  originalContent: string;
  isEditing: boolean;
  rect?: DOMRect;
}

interface HistoryState {
  html: string;
  timestamp: number;
}

interface TextStyle {
  fontSize: string;
  fontWeight: string;
  color: string;
  textAlign: string;
  fontFamily: string;
}

interface ImageStyle {
  width: string;
  height: string;
  borderRadius: string;
  filter: string;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableElements, setEditableElements] = useState<Map<string, EditableElement>>(new Map());
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activePanel, setActivePanel] = useState<'elements' | 'styles' | 'layers'>('elements');
  const [textStyle, setTextStyle] = useState<TextStyle>({
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#ffffff',
    textAlign: 'left',
    fontFamily: 'inherit'
  });
  const [imageStyle, setImageStyle] = useState<ImageStyle>({
    width: 'auto',
    height: 'auto',
    borderRadius: '0px',
    filter: 'none'
  });
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Check if user is admin
  const isAdmin = user?.email === 'madisn382@gmail.com';

  // Initialize editor when opened
  useEffect(() => {
    if (isOpen && isAdmin) {
      initializeEditor();
      saveToHistory();
      document.body.style.overflow = 'hidden';
    } else {
      cleanupEditor();
      document.body.style.overflow = '';
    }

    return () => {
      if (isOpen) {
        cleanupEditor();
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, isAdmin]);

  // Handle edit mode toggle
  useEffect(() => {
    if (isEditMode) {
      enableEditMode();
    } else {
      disableEditMode();
    }
  }, [isEditMode]);

  const initializeEditor = () => {
    // Find all editable elements with more comprehensive selectors
    const editableSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span:not([class*="icon"])', 'div[class*="text"]',
      'img', 'button', 'a[href]',
      'section', 'article', 'header', 'footer',
      '[class*="title"]', '[class*="heading"]', '[class*="description"]',
      '[class*="content"]', '[class*="text"]'
    ];

    const elements = new Map<string, EditableElement>();
    
    editableSelectors.forEach(selector => {
      const nodeList = document.querySelectorAll(selector);
      nodeList.forEach((element, index) => {
        if (element instanceof HTMLElement && 
            !element.closest('[data-wysiwyg-editor]') && 
            !element.closest('[data-wysiwyg-overlay]') &&
            (element.textContent?.trim() || element.tagName === 'IMG' || element.tagName === 'BUTTON')) {
          
          const id = `editable-${selector.replace(/[^a-zA-Z0-9]/g, '')}-${index}`;
          element.setAttribute('data-editable-id', id);
          element.setAttribute('data-original-style', element.getAttribute('style') || '');
          
          let type: EditableElement['type'] = 'text';
          if (element.tagName === 'IMG') type = 'image';
          else if (element.tagName === 'BUTTON') type = 'button';
          else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) type = 'heading';
          else if (['DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER'].includes(element.tagName)) type = 'section';
          
          elements.set(id, {
            id,
            type,
            element,
            originalContent: element.tagName === 'IMG' ? (element as HTMLImageElement).src : element.innerHTML,
            isEditing: false,
            rect: element.getBoundingClientRect()
          });
        }
      });
    });

    setEditableElements(elements);
  };

  const enableEditMode = () => {
    editableElements.forEach((editableEl) => {
      const { element, id } = editableEl;
      
      // Add hover effects
      element.addEventListener('mouseenter', () => handleElementHover(id));
      element.addEventListener('mouseleave', () => handleElementHover(null));
      element.addEventListener('click', (e) => handleElementClick(e, id));
      
      // Add visual indicators
      element.style.cursor = 'pointer';
      element.style.transition = 'all 0.2s ease';
      element.style.position = 'relative';
    });
  };

  const disableEditMode = () => {
    editableElements.forEach((editableEl) => {
      const { element } = editableEl;
      
      // Remove event listeners and restore original styles
      const originalStyle = element.getAttribute('data-original-style') || '';
      element.setAttribute('style', originalStyle);
      
      // Remove our custom attributes
      element.removeAttribute('data-editable-highlight');
      element.removeAttribute('data-editable-selected');
    });
    
    setSelectedElement(null);
    setHoveredElement(null);
  };

  const cleanupEditor = () => {
    disableEditMode();
    setEditableElements(new Map());
    setIsEditMode(false);
  };

  const handleElementHover = (id: string | null) => {
    if (!isEditMode) return;
    
    setHoveredElement(id);
    
    editableElements.forEach((editableEl) => {
      const { element, id: elId } = editableEl;
      if (id === elId && id !== selectedElement) {
        element.style.outline = '2px dashed #60A5FA';
        element.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
        element.setAttribute('data-editable-highlight', 'true');
      } else if (elId !== selectedElement) {
        element.style.outline = '';
        element.style.backgroundColor = '';
        element.removeAttribute('data-editable-highlight');
      }
    });
  };

  const handleElementClick = (e: Event, id: string) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const editableEl = editableElements.get(id);
    if (!editableEl) return;

    // Clear previous selection
    editableElements.forEach((el) => {
      if (el.id !== id) {
        el.element.style.outline = '';
        el.element.style.backgroundColor = '';
        el.element.removeAttribute('data-editable-selected');
      }
    });

    setSelectedElement(id);
    
    // Highlight selected element
    editableEl.element.style.outline = '2px solid #60A5FA';
    editableEl.element.style.backgroundColor = 'rgba(96, 165, 250, 0.15)';
    editableEl.element.setAttribute('data-editable-selected', 'true');
    
    // Load current styles
    loadElementStyles(editableEl);
  };

  const loadElementStyles = (editableEl: EditableElement) => {
    const { element, type } = editableEl;
    const computedStyle = window.getComputedStyle(element);
    
    if (type === 'text' || type === 'heading' || type === 'button') {
      setTextStyle({
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        color: computedStyle.color,
        textAlign: computedStyle.textAlign,
        fontFamily: computedStyle.fontFamily
      });
    } else if (type === 'image') {
      setImageStyle({
        width: computedStyle.width,
        height: computedStyle.height,
        borderRadius: computedStyle.borderRadius,
        filter: computedStyle.filter
      });
    }
  };

  const startTextEditing = (editableEl: EditableElement) => {
    const { element } = editableEl;
    
    // Make element contentEditable
    element.contentEditable = 'true';
    element.focus();
    
    // Handle blur to save changes
    const handleBlur = () => {
      element.contentEditable = 'false';
      
      const newContent = element.innerHTML;
      if (newContent !== editableEl.originalContent) {
        saveToHistory();
        updateElementContent(editableEl.id, newContent);
      }
      
      element.removeEventListener('blur', handleBlur);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
    };
    
    element.addEventListener('blur', handleBlur);
    element.addEventListener('keydown', handleKeyDown);
  };

  const updateElementContent = (id: string, newContent: string) => {
    setEditableElements(prev => {
      const updated = new Map(prev);
      const element = updated.get(id);
      if (element) {
        updated.set(id, {
          ...element,
          originalContent: newContent
        });
      }
      return updated;
    });
  };

  const applyTextStyle = (property: keyof TextStyle, value: string) => {
    if (!selectedElement) return;
    
    const editableEl = editableElements.get(selectedElement);
    if (!editableEl) return;
    
    const { element } = editableEl;
    
    switch (property) {
      case 'fontSize':
        element.style.fontSize = value;
        break;
      case 'fontWeight':
        element.style.fontWeight = value;
        break;
      case 'color':
        element.style.color = value;
        break;
      case 'textAlign':
        element.style.textAlign = value;
        break;
      case 'fontFamily':
        element.style.fontFamily = value;
        break;
    }
    
    setTextStyle(prev => ({ ...prev, [property]: value }));
    saveToHistory();
  };

  const applyImageStyle = (property: keyof ImageStyle, value: string) => {
    if (!selectedElement) return;
    
    const editableEl = editableElements.get(selectedElement);
    if (!editableEl || editableEl.type !== 'image') return;
    
    const { element } = editableEl;
    
    switch (property) {
      case 'width':
        element.style.width = value;
        break;
      case 'height':
        element.style.height = value;
        break;
      case 'borderRadius':
        element.style.borderRadius = value;
        break;
      case 'filter':
        element.style.filter = value;
        break;
    }
    
    setImageStyle(prev => ({ ...prev, [property]: value }));
    saveToHistory();
  };

  const saveToHistory = () => {
    const currentHtml = document.documentElement.outerHTML;
    const newState: HistoryState = {
      html: currentHtml,
      timestamp: Date.now()
    };
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newState);
      return newHistory.slice(-50); // Keep last 50 states
    });
    
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setMessage({ type: 'success', text: 'Undone' });
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setMessage({ type: 'success', text: 'Redone' });
    }
  };

  const saveChanges = async () => {
    try {
      // Get current page HTML
      const currentHtml = document.documentElement.outerHTML;
      
      // Save to localStorage for now
      localStorage.setItem('wysiwyg_page_content', currentHtml);
      localStorage.setItem('wysiwyg_save_timestamp', Date.now().toString());
      
      setMessage({ type: 'success', text: 'Changes saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save changes' });
    }
  };

  const exportChanges = () => {
    try {
      const currentHtml = document.documentElement.outerHTML;
      const blob = new Blob([currentHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited-page.html';
      a.click();
      URL.revokeObjectURL(url);
      
      setMessage({ type: 'success', text: 'Page exported successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export page' });
    }
  };

  const handleImageUpload = (file: File) => {
    if (!selectedElement) return;
    
    const editableEl = editableElements.get(selectedElement);
    if (!editableEl || editableEl.type !== 'image') return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const newSrc = e.target?.result as string;
      (editableEl.element as HTMLImageElement).src = newSrc;
      saveToHistory();
      updateElementContent(editableEl.id, newSrc);
      setMessage({ type: 'success', text: 'Image updated successfully!' });
    };
    reader.readAsDataURL(file);
  };

  // Clear messages after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isOpen || !isAdmin) return null;

  const selectedElementData = selectedElement ? editableElements.get(selectedElement) : null;

  return (
    <div 
      ref={overlayRef}
      data-wysiwyg-editor
      className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm"
      data-wysiwyg-overlay
    >
      {/* Main Editor Layout */}
      <div className="flex h-full">
        {/* Left Panel - Elements & Components */}
        <motion.div
          ref={leftPanelRef}
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-xl"
        >
          {/* Panel Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Editor</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    isEditMode 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isEditMode ? 'Exit Edit' : 'Edit Mode'}
                </button>
              </div>
            </div>
            
            {/* Panel Tabs */}
            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setActivePanel('elements')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activePanel === 'elements'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Square className="w-4 h-4 mx-auto mb-1" />
                Elements
              </button>
              <button
                onClick={() => setActivePanel('styles')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activePanel === 'styles'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Palette className="w-4 h-4 mx-auto mb-1" />
                Styles
              </button>
              <button
                onClick={() => setActivePanel('layers')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activePanel === 'layers'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Layers className="w-4 h-4 mx-auto mb-1" />
                Layers
              </button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === 'elements' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Add Elements</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                      <Type className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <span className="text-xs text-gray-600">Text</span>
                    </button>
                    <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                      <ImageIcon className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <span className="text-xs text-gray-600">Image</span>
                    </button>
                    <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                      <Square className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <span className="text-xs text-gray-600">Button</span>
                    </button>
                    <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                      <Grid className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <span className="text-xs text-gray-600">Section</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Instructions</h3>
                  <div className="text-xs text-gray-600 space-y-2">
                    <p>1. Enable "Edit Mode" to start editing</p>
                    <p>2. Click on any text to edit it directly</p>
                    <p>3. Click on images to replace them</p>
                    <p>4. Use the Styles panel to customize appearance</p>
                  </div>
                </div>
              </div>
            )}

            {activePanel === 'styles' && (
              <div className="space-y-4">
                {selectedElementData ? (
                  <>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Selected: {selectedElementData.type} element
                      </h3>
                      <p className="text-xs text-gray-500 mb-4">
                        Tag: {selectedElementData.element.tagName}
                      </p>
                    </div>

                    {(selectedElementData.type === 'text' || selectedElementData.type === 'heading' || selectedElementData.type === 'button') && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
                          <input
                            type="range"
                            min="10"
                            max="72"
                            value={parseInt(textStyle.fontSize)}
                            onChange={(e) => applyTextStyle('fontSize', `${e.target.value}px`)}
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">{textStyle.fontSize}</span>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Font Weight</label>
                          <select
                            value={textStyle.fontWeight}
                            onChange={(e) => applyTextStyle('fontWeight', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="lighter">Light</option>
                            <option value="bolder">Extra Bold</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
                          <input
                            type="color"
                            value={textStyle.color}
                            onChange={(e) => applyTextStyle('color', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Text Align</label>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => applyTextStyle('textAlign', 'left')}
                              className={`p-2 border rounded ${textStyle.textAlign === 'left' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                            >
                              <AlignLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => applyTextStyle('textAlign', 'center')}
                              className={`p-2 border rounded ${textStyle.textAlign === 'center' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                            >
                              <AlignCenter className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => applyTextStyle('textAlign', 'right')}
                              className={`p-2 border rounded ${textStyle.textAlign === 'right' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                            >
                              <AlignRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() => selectedElementData && startTextEditing(selectedElementData)}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                          >
                            Edit Text Content
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedElementData.type === 'image' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Replace Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file);
                            }}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Border Radius</label>
                          <input
                            type="range"
                            min="0"
                            max="50"
                            value={parseInt(imageStyle.borderRadius)}
                            onChange={(e) => applyImageStyle('borderRadius', `${e.target.value}px`)}
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">{imageStyle.borderRadius}</span>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Filter</label>
                          <select
                            value={imageStyle.filter}
                            onChange={(e) => applyImageStyle('filter', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          >
                            <option value="none">None</option>
                            <option value="grayscale(100%)">Grayscale</option>
                            <option value="sepia(100%)">Sepia</option>
                            <option value="blur(2px)">Blur</option>
                            <option value="brightness(150%)">Bright</option>
                            <option value="contrast(150%)">High Contrast</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <MousePointer className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Select an element to edit its styles</p>
                  </div>
                )}
              </div>
            )}

            {activePanel === 'layers' && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Page Elements</h3>
                {Array.from(editableElements.values()).map((element) => (
                  <div
                    key={element.id}
                    onClick={() => handleElementClick(new Event('click'), element.id)}
                    className={`p-2 border rounded cursor-pointer transition-colors ${
                      selectedElement === element.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {element.type === 'text' && <Type className="w-4 h-4 text-gray-500" />}
                      {element.type === 'image' && <ImageIcon className="w-4 h-4 text-gray-500" />}
                      {element.type === 'heading' && <Type className="w-4 h-4 text-gray-500" />}
                      {element.type === 'button' && <Square className="w-4 h-4 text-gray-500" />}
                      {element.type === 'section' && <Grid className="w-4 h-4 text-gray-500" />}
                      <span className="text-sm text-gray-700 capitalize">{element.type}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {element.element.tagName} - {element.type === 'image' ? 'Image' : element.element.textContent?.slice(0, 30) + '...'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Center - Website Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo"
              >
                <Undo className="w-4 h-4" />
              </button>
              
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo"
              >
                <Redo className="w-4 h-4" />
              </button>

              <div className="w-px h-6 bg-gray-300" />

              <button
                onClick={saveChanges}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>

              <button
                onClick={exportChanges}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isEditMode 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isEditMode ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span>{isEditMode ? 'Edit Mode' : 'View Mode'}</span>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Website Content Area */}
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              {/* The actual website content is rendered here */}
              <div className="relative">
                {/* This is where the website content appears */}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Properties & Settings */}
        <motion.div
          ref={rightPanelRef}
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl"
        >
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Properties</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {selectedElementData ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Element Info</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Type: <span className="font-medium">{selectedElementData.type}</span></p>
                    <p className="text-xs text-gray-600">Tag: <span className="font-medium">{selectedElementData.element.tagName}</span></p>
                    <p className="text-xs text-gray-600">ID: <span className="font-medium">{selectedElementData.id}</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => selectedElementData && startTextEditing(selectedElementData)}
                      className="w-full bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 inline mr-2" />
                      Edit Content
                    </button>
                    
                    <button className="w-full bg-gray-500 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors">
                      <Copy className="w-4 h-4 inline mr-2" />
                      Duplicate
                    </button>
                    
                    <button className="w-full bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors">
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Settings className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Select an element to view its properties</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-[10001]"
          >
            <div className={`px-4 py-2 rounded-lg text-sm shadow-lg ${
              message.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WYSIWYGEditor;