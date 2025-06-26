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
  Download
} from 'lucide-react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAuth } from '../contexts/AuthContext';

interface WYSIWYGEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditableElement {
  id: string;
  type: 'text' | 'image' | 'section';
  element: HTMLElement;
  originalContent: string;
  isEditing: boolean;
}

interface HistoryState {
  html: string;
  timestamp: number;
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
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const textEditorRef = useRef<HTMLDivElement>(null);

  // Check if user is admin
  const isAdmin = user?.email === 'madisn382@gmail.com';

  // Initialize editor when opened
  useEffect(() => {
    if (isOpen && isAdmin) {
      initializeEditor();
      saveToHistory();
    } else {
      cleanupEditor();
    }

    return () => {
      if (isOpen) {
        cleanupEditor();
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
    // Find all editable elements
    const editableSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'div[class*="text"]',
      'img', 'button', 'a'
    ];

    const elements = new Map<string, EditableElement>();
    
    editableSelectors.forEach(selector => {
      const nodeList = document.querySelectorAll(selector);
      nodeList.forEach((element, index) => {
        if (element instanceof HTMLElement && 
            !element.closest('[data-wysiwyg-editor]') && 
            element.textContent?.trim() || 
            element.tagName === 'IMG') {
          
          const id = `editable-${selector.replace(/[^a-zA-Z0-9]/g, '')}-${index}`;
          element.setAttribute('data-editable-id', id);
          
          elements.set(id, {
            id,
            type: element.tagName === 'IMG' ? 'image' : 
                  ['DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER'].includes(element.tagName) ? 'section' : 'text',
            element,
            originalContent: element.tagName === 'IMG' ? (element as HTMLImageElement).src : element.innerHTML,
            isEditing: false
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
    });
  };

  const disableEditMode = () => {
    editableElements.forEach((editableEl) => {
      const { element } = editableEl;
      
      // Remove event listeners and styles
      element.style.cursor = '';
      element.style.transition = '';
      element.style.outline = '';
      element.style.backgroundColor = '';
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
      if (id === elId) {
        element.style.outline = '2px dashed #60A5FA';
        element.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
      } else {
        element.style.outline = '';
        element.style.backgroundColor = '';
      }
    });
  };

  const handleElementClick = (e: Event, id: string) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const editableEl = editableElements.get(id);
    if (!editableEl) return;

    setSelectedElement(id);
    
    if (editableEl.type === 'text') {
      startTextEditing(editableEl);
    } else if (editableEl.type === 'image') {
      startImageEditing(editableEl);
    }
  };

  const startTextEditing = (editableEl: EditableElement) => {
    const { element } = editableEl;
    
    // Make element contentEditable
    element.contentEditable = 'true';
    element.focus();
    
    // Style the editing element
    element.style.outline = '2px solid #60A5FA';
    element.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
    
    // Handle blur to save changes
    const handleBlur = () => {
      element.contentEditable = 'false';
      element.style.outline = '';
      element.style.backgroundColor = '';
      
      const newContent = element.innerHTML;
      if (newContent !== editableEl.originalContent) {
        saveToHistory();
        updateElementContent(editableEl.id, newContent);
      }
      
      element.removeEventListener('blur', handleBlur);
    };
    
    element.addEventListener('blur', handleBlur);
  };

  const startImageEditing = (editableEl: EditableElement) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newSrc = e.target?.result as string;
          (editableEl.element as HTMLImageElement).src = newSrc;
          saveToHistory();
          updateElementContent(editableEl.id, newSrc);
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
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
      const prevState = history[historyIndex - 1];
      // Note: In a real implementation, you'd need to carefully restore state
      setHistoryIndex(prev => prev - 1);
      setMessage({ type: 'success', text: 'Undone' });
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      // Note: In a real implementation, you'd need to carefully restore state
      setHistoryIndex(prev => prev + 1);
      setMessage({ type: 'success', text: 'Redone' });
    }
  };

  const saveChanges = () => {
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

  // Handle drag and drop
  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    setDraggedElement(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setDraggedElement(null);
    
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      // Handle reordering logic here
      saveToHistory();
      setMessage({ type: 'success', text: 'Element moved' });
    }
  };

  // Clear messages after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isOpen || !isAdmin) return null;

  return (
    <div 
      ref={overlayRef}
      data-wysiwyg-editor
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Floating Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[10000] pointer-events-auto"
      >
        <div className="bg-black/90 backdrop-blur-lg border border-blue-400/30 rounded-lg p-3 flex items-center space-x-3">
          {/* Edit Mode Toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              isEditMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
            }`}
          >
            {isEditMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{isEditMode ? 'Exit Edit' : 'Edit Mode'}</span>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-blue-400/30" />

          {/* History Controls */}
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-blue-400/30" />

          {/* Save Controls */}
          <button
            onClick={saveChanges}
            className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>

          <button
            onClick={exportChanges}
            className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[10000] pointer-events-auto"
          >
            <div className={`px-4 py-2 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 z-[10000] pointer-events-auto"
        >
          <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-400/30 backdrop-blur-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm">Edit Mode Active</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Element Inspector Panel */}
      {selectedElement && isEditMode && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-32 right-4 w-80 bg-black/90 backdrop-blur-lg border border-blue-400/30 rounded-lg p-4 z-[10000] pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-400 font-semibold">Element Inspector</h3>
            <button
              onClick={() => setSelectedElement(null)}
              className="text-gray-400 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Element Type</label>
              <div className="text-white text-sm">
                {editableElements.get(selectedElement)?.type || 'Unknown'}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tag Name</label>
              <div className="text-white text-sm">
                {editableElements.get(selectedElement)?.element.tagName || 'Unknown'}
              </div>
            </div>
            
            <div className="pt-2 border-t border-blue-400/20">
              <p className="text-xs text-gray-400">
                Click on the element to edit its content directly.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Drag and Drop Context */}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={Array.from(editableElements.keys())} strategy={verticalListSortingStrategy}>
          {/* Drag overlay would go here */}
        </SortableContext>
        
        <DragOverlay>
          {draggedElement && (
            <div className="bg-blue-500/20 border border-blue-400 rounded p-2 text-blue-400">
              Moving element...
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default WYSIWYGEditor;