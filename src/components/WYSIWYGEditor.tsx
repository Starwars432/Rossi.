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
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  Plus,
  Trash2,
  Copy,
  RotateCw,
  Crop,
  Filter,
  List,
  ListOrdered,
  Quote,
  Minus,
  Superscript,
  Subscript,
  Search,
  Paintbrush,
  Droplet,
  Sun,
  Moon,
  Contrast,
  Sliders,
  Table,
  Video,
  Music,
  FileText,
  Code,
  Scissors,
  ClipboardPaste,
  MoreHorizontal
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
  type: 'text' | 'image' | 'section' | 'button' | 'heading' | 'paragraph' | 'link' | 'list' | 'table';
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
  backgroundColor: string;
  textAlign: string;
  fontFamily: string;
  textDecoration: string;
  lineHeight: string;
  letterSpacing: string;
}

interface ImageStyle {
  width: string;
  height: string;
  borderRadius: string;
  filter: string;
  opacity: string;
  transform: string;
}

interface BlockElement {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'section' | 'list' | 'table' | 'video' | 'quote';
  label: string;
  icon: React.ReactNode;
  template: string;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
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
    backgroundColor: 'transparent',
    textAlign: 'left',
    fontFamily: 'inherit',
    textDecoration: 'none',
    lineHeight: '1.5',
    letterSpacing: 'normal'
  });
  const [imageStyle, setImageStyle] = useState<ImageStyle>({
    width: 'auto',
    height: 'auto',
    borderRadius: '0px',
    filter: 'none',
    opacity: '1',
    transform: 'none'
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceText, setReplaceText] = useState('');
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Check if user is admin
  const isAdmin = user?.email === 'madisn382@gmail.com';

  // Block elements for drag and drop
  const blockElements: BlockElement[] = [
    {
      id: 'heading',
      type: 'heading',
      label: 'Heading',
      icon: <Type className="w-5 h-5" />,
      template: '<h2 style="color: white; font-family: Playfair Display, serif;">New Heading</h2>'
    },
    {
      id: 'paragraph',
      type: 'paragraph',
      label: 'Paragraph',
      icon: <FileText className="w-5 h-5" />,
      template: '<p style="color: white; font-family: Playfair Display, serif;">New paragraph text goes here.</p>'
    },
    {
      id: 'image',
      type: 'image',
      label: 'Image',
      icon: <ImageIcon className="w-5 h-5" />,
      template: '<img src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400" alt="New image" style="width: 300px; height: 200px; object-fit: cover; border-radius: 8px;" />'
    },
    {
      id: 'button',
      type: 'button',
      label: 'Button',
      icon: <Square className="w-5 h-5" />,
      template: '<button style="background: #3B82F6; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-family: Playfair Display, serif; cursor: pointer;">Click Me</button>'
    },
    {
      id: 'section',
      type: 'section',
      label: 'Section',
      icon: <Grid className="w-5 h-5" />,
      template: '<section style="background: rgba(0,0,0,0.5); padding: 40px; border-radius: 12px; margin: 20px 0;"><h3 style="color: #60A5FA; margin-bottom: 16px;">Section Title</h3><p style="color: white;">Section content goes here.</p></section>'
    },
    {
      id: 'list',
      type: 'list',
      label: 'List',
      icon: <List className="w-5 h-5" />,
      template: '<ul style="color: white; padding-left: 20px;"><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>'
    },
    {
      id: 'quote',
      type: 'quote',
      label: 'Quote',
      icon: <Quote className="w-5 h-5" />,
      template: '<blockquote style="border-left: 4px solid #60A5FA; padding-left: 20px; margin: 20px 0; font-style: italic; color: #D1D5DB;">"This is a quote block for highlighting important text."</blockquote>'
    },
    {
      id: 'video',
      type: 'video',
      label: 'Video',
      icon: <Video className="w-5 h-5" />,
      template: '<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; background: #000; border-radius: 8px;"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;" allowfullscreen></iframe></div>'
    }
  ];

  // Font families
  const fontFamilies = [
    'Playfair Display, serif',
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Verdana, sans-serif',
    'Courier New, monospace',
    'Impact, sans-serif',
    'Comic Sans MS, cursive'
  ];

  // Initialize editor when opened
  useEffect(() => {
    if (isOpen && isAdmin) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initializeEditor();
        saveToHistory();
      }, 100);
    } else {
      cleanupEditor();
    }

    return () => {
      if (isOpen) {
        cleanupEditor();
      }
    };
  }, [isOpen, isAdmin]);

  // Handle clicks outside color picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initializeEditor = () => {
    // Find all editable elements with comprehensive selectors
    const editableSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span:not([class*="icon"]):not([class*="lucide"])', 
      'div:not([data-wysiwyg-editor]):not([data-wysiwyg-overlay])',
      'img:not([data-wysiwyg-editor])', 
      'button:not([data-wysiwyg-editor])', 
      'a[href]:not([data-wysiwyg-editor])',
      'section:not([data-wysiwyg-editor])', 
      'article:not([data-wysiwyg-editor])', 
      'header:not([data-wysiwyg-editor])', 
      'footer:not([data-wysiwyg-editor])',
      'ul', 'ol', 'li',
      'blockquote',
      'table', 'td', 'th',
      '[class*="title"]:not([data-wysiwyg-editor])', 
      '[class*="heading"]:not([data-wysiwyg-editor])', 
      '[class*="description"]:not([data-wysiwyg-editor])',
      '[class*="content"]:not([data-wysiwyg-editor])', 
      '[class*="text"]:not([data-wysiwyg-editor])'
    ];

    const elements = new Map<string, EditableElement>();
    
    editableSelectors.forEach(selector => {
      try {
        const nodeList = document.querySelectorAll(selector);
        nodeList.forEach((element, index) => {
          if (element instanceof HTMLElement && 
              !element.closest('[data-wysiwyg-editor]') && 
              !element.closest('[data-wysiwyg-overlay]') &&
              !element.hasAttribute('data-wysiwyg-editor') &&
              (element.textContent?.trim() || element.tagName === 'IMG' || element.tagName === 'BUTTON' || element.tagName === 'VIDEO')) {
            
            const id = `editable-${selector.replace(/[^a-zA-Z0-9]/g, '')}-${index}-${Date.now()}`;
            element.setAttribute('data-editable-id', id);
            element.setAttribute('data-original-style', element.getAttribute('style') || '');
            
            let type: EditableElement['type'] = 'text';
            if (element.tagName === 'IMG') type = 'image';
            else if (element.tagName === 'BUTTON') type = 'button';
            else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) type = 'heading';
            else if (element.tagName === 'P') type = 'paragraph';
            else if (element.tagName === 'A') type = 'link';
            else if (['UL', 'OL', 'LI'].includes(element.tagName)) type = 'list';
            else if (element.tagName === 'TABLE' || element.tagName === 'TD' || element.tagName === 'TH') type = 'table';
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
      } catch (error) {
        console.warn(`Error processing selector ${selector}:`, error);
      }
    });

    setEditableElements(elements);
    enableEditMode();
  };

  const enableEditMode = () => {
    editableElements.forEach((editableEl) => {
      const { element, id } = editableEl;
      
      // Add hover effects
      const handleMouseEnter = () => handleElementHover(id);
      const handleMouseLeave = () => handleElementHover(null);
      const handleClick = (e: Event) => handleElementClick(e, id);
      
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('click', handleClick);
      
      // Store event listeners for cleanup
      (element as any)._wysiwygListeners = {
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave,
        click: handleClick
      };
      
      // Add visual indicators
      element.style.cursor = 'pointer';
      element.style.transition = 'all 0.2s ease';
      element.style.position = 'relative';
    });
  };

  const disableEditMode = () => {
    editableElements.forEach((editableEl) => {
      const { element } = editableEl;
      
      // Remove event listeners
      const listeners = (element as any)._wysiwygListeners;
      if (listeners) {
        element.removeEventListener('mouseenter', listeners.mouseenter);
        element.removeEventListener('mouseleave', listeners.mouseleave);
        element.removeEventListener('click', listeners.click);
        delete (element as any)._wysiwygListeners;
      }
      
      // Restore original styles
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
  };

  const handleElementHover = (id: string | null) => {
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
    editableEl.element.style.outline = '3px solid #60A5FA';
    editableEl.element.style.backgroundColor = 'rgba(96, 165, 250, 0.15)';
    editableEl.element.setAttribute('data-editable-selected', 'true');
    
    // Load current styles
    loadElementStyles(editableEl);
  };

  const loadElementStyles = (editableEl: EditableElement) => {
    const { element, type } = editableEl;
    const computedStyle = window.getComputedStyle(element);
    
    if (type === 'text' || type === 'heading' || type === 'button' || type === 'paragraph' || type === 'link') {
      setTextStyle({
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        color: rgb2hex(computedStyle.color),
        backgroundColor: computedStyle.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'transparent' : rgb2hex(computedStyle.backgroundColor),
        textAlign: computedStyle.textAlign,
        fontFamily: computedStyle.fontFamily,
        textDecoration: computedStyle.textDecoration,
        lineHeight: computedStyle.lineHeight,
        letterSpacing: computedStyle.letterSpacing
      });
    } else if (type === 'image') {
      setImageStyle({
        width: computedStyle.width,
        height: computedStyle.height,
        borderRadius: computedStyle.borderRadius,
        filter: computedStyle.filter,
        opacity: computedStyle.opacity,
        transform: computedStyle.transform
      });
    }
  };

  // Helper function to convert rgb to hex
  const rgb2hex = (rgb: string): string => {
    if (rgb.startsWith('#')) return rgb;
    if (rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return '#000000';
    
    const match = rgb.match(/\d+/g);
    if (!match) return '#000000';
    
    const [r, g, b] = match.map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const startTextEditing = (editableEl: EditableElement) => {
    const { element } = editableEl;
    
    // Make element contentEditable
    element.contentEditable = 'true';
    element.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    // Handle blur to save changes
    const handleBlur = () => {
      element.contentEditable = 'false';
      
      const newContent = element.innerHTML;
      if (newContent !== editableEl.originalContent) {
        saveToHistory();
        updateElementContent(editableEl.id, newContent);
      }
      
      element.removeEventListener('blur', handleBlur);
      element.removeEventListener('keydown', handleKeyDown);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && editableEl.type !== 'paragraph') {
        e.preventDefault();
        element.blur();
      }
      if (e.key === 'Escape') {
        element.innerHTML = editableEl.originalContent;
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
      case 'backgroundColor':
        element.style.backgroundColor = value;
        break;
      case 'textAlign':
        element.style.textAlign = value;
        break;
      case 'fontFamily':
        element.style.fontFamily = value;
        break;
      case 'textDecoration':
        element.style.textDecoration = value;
        break;
      case 'lineHeight':
        element.style.lineHeight = value;
        break;
      case 'letterSpacing':
        element.style.letterSpacing = value;
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
      case 'opacity':
        element.style.opacity = value;
        break;
      case 'transform':
        element.style.transform = value;
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

  const addNewElement = (blockElement: BlockElement) => {
    // Find a suitable container to add the element
    const containers = document.querySelectorAll('main, section, article, div[class*="content"], div[class*="container"]');
    let targetContainer = containers[0] as HTMLElement;
    
    // Prefer containers that are visible and have content
    for (const container of containers) {
      if (container instanceof HTMLElement && 
          container.offsetHeight > 0 && 
          !container.closest('[data-wysiwyg-editor]')) {
        targetContainer = container;
        break;
      }
    }
    
    if (!targetContainer) {
      setMessage({ type: 'error', text: 'Could not find a suitable container to add the element' });
      return;
    }
    
    // Create new element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = blockElement.template;
    const newElement = tempDiv.firstElementChild as HTMLElement;
    
    if (!newElement) {
      setMessage({ type: 'error', text: 'Failed to create new element' });
      return;
    }
    
    // Add to DOM
    targetContainer.appendChild(newElement);
    
    // Re-initialize editor to include new element
    setTimeout(() => {
      initializeEditor();
      saveToHistory();
      setMessage({ type: 'success', text: `${blockElement.label} added successfully!` });
    }, 100);
  };

  const deleteElement = () => {
    if (!selectedElement) return;
    
    const editableEl = editableElements.get(selectedElement);
    if (!editableEl) return;
    
    editableEl.element.remove();
    setEditableElements(prev => {
      const updated = new Map(prev);
      updated.delete(selectedElement);
      return updated;
    });
    
    setSelectedElement(null);
    saveToHistory();
    setMessage({ type: 'success', text: 'Element deleted successfully!' });
  };

  const duplicateElement = () => {
    if (!selectedElement) return;
    
    const editableEl = editableElements.get(selectedElement);
    if (!editableEl) return;
    
    const clonedElement = editableEl.element.cloneNode(true) as HTMLElement;
    editableEl.element.parentNode?.insertBefore(clonedElement, editableEl.element.nextSibling);
    
    setTimeout(() => {
      initializeEditor();
      saveToHistory();
      setMessage({ type: 'success', text: 'Element duplicated successfully!' });
    }, 100);
  };

  const findAndReplace = () => {
    if (!searchTerm) return;
    
    let replacements = 0;
    editableElements.forEach((editableEl) => {
      if (editableEl.type !== 'image') {
        const element = editableEl.element;
        const originalText = element.textContent || '';
        if (originalText.includes(searchTerm)) {
          const newText = originalText.replace(new RegExp(searchTerm, 'g'), replaceText);
          element.textContent = newText;
          replacements++;
        }
      }
    });
    
    if (replacements > 0) {
      saveToHistory();
      setMessage({ type: 'success', text: `Replaced ${replacements} occurrence(s)` });
    } else {
      setMessage({ type: 'error', text: 'No matches found' });
    }
    
    setSearchTerm('');
    setReplaceText('');
  };

  const removeFormatting = () => {
    if (!selectedElement) return;
    
    const editableEl = editableElements.get(selectedElement);
    if (!editableEl || editableEl.type === 'image') return;
    
    const element = editableEl.element;
    const textContent = element.textContent || '';
    element.innerHTML = textContent;
    
    // Reset styles to defaults
    element.style.fontSize = '';
    element.style.fontWeight = '';
    element.style.color = '';
    element.style.backgroundColor = '';
    element.style.textAlign = '';
    element.style.fontFamily = '';
    element.style.textDecoration = '';
    element.style.lineHeight = '';
    element.style.letterSpacing = '';
    
    saveToHistory();
    setMessage({ type: 'success', text: 'Formatting removed' });
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
      className="fixed inset-0 z-[9999]"
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
              <h2 className="text-lg font-semibold text-gray-800">WYSIWYG Editor</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Live Edit</span>
                </div>
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Elements</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {blockElements.map((block) => (
                      <button
                        key={block.id}
                        onClick={() => addNewElement(block)}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 text-center transition-colors group"
                      >
                        <div className="text-gray-600 group-hover:text-blue-600 mb-1">
                          {block.icon}
                        </div>
                        <span className="text-xs text-gray-600 group-hover:text-blue-600">
                          {block.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Text Formatting</h3>
                  <div className="grid grid-cols-4 gap-1">
                    <button
                      onClick={() => selectedElementData && applyTextStyle('fontWeight', textStyle.fontWeight === 'bold' ? 'normal' : 'bold')}
                      className={`p-2 border rounded hover:bg-gray-50 ${textStyle.fontWeight === 'bold' ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => selectedElementData && applyTextStyle('textDecoration', textStyle.textDecoration.includes('italic') ? 'none' : 'italic')}
                      className={`p-2 border rounded hover:bg-gray-50 ${textStyle.textDecoration.includes('italic') ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => selectedElementData && applyTextStyle('textDecoration', textStyle.textDecoration.includes('underline') ? 'none' : 'underline')}
                      className={`p-2 border rounded hover:bg-gray-50 ${textStyle.textDecoration.includes('underline') ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
                      title="Underline"
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => selectedElementData && applyTextStyle('textDecoration', textStyle.textDecoration.includes('line-through') ? 'none' : 'line-through')}
                      className={`p-2 border rounded hover:bg-gray-50 ${textStyle.textDecoration.includes('line-through') ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
                      title="Strikethrough"
                    >
                      <Strikethrough className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Text Alignment</h3>
                  <div className="grid grid-cols-4 gap-1">
                    <button
                      onClick={() => selectedElementData && applyTextStyle('textAlign', 'left')}
                      className={`p-2 border rounded hover:bg-gray-50 ${textStyle.textAlign === 'left' ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
                      title="Align Left"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => selectedElementData && applyTextStyle('textAlign', 'center')}
                      className={`p-2 border rounded hover:bg-gray-50 ${textStyle.textAlign === 'center' ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
                      title="Align Center"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => selectedElementData && applyTextStyle('textAlign', 'right')}
                      className={`p-2 border rounded hover:bg-gray-50 ${textStyle.textAlign === 'right' ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
                      title="Align Right"
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => selectedElementData && applyTextStyle('textAlign', 'justify')}
                      className={`p-2 border rounded hover:bg-gray-50 ${textStyle.textAlign === 'justify' ? 'bg-blue-100 border-blue-300' : 'border-gray-200'}`}
                      title="Justify"
                    >
                      <AlignJustify className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Find & Replace</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Find text..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Replace with..."
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                    <button
                      onClick={findAndReplace}
                      className="w-full bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      <Search className="w-4 h-4 inline mr-2" />
                      Replace All
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Instructions</h3>
                  <div className="text-xs text-gray-600 space-y-2">
                    <p>• Click on any text to edit it directly</p>
                    <p>• Click on images to replace them</p>
                    <p>• Use the Styles panel to customize appearance</p>
                    <p>• Drag elements from above to add new content</p>
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

                    {(selectedElementData.type === 'text' || selectedElementData.type === 'heading' || selectedElementData.type === 'button' || selectedElementData.type === 'paragraph' || selectedElementData.type === 'link') && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Font Family</label>
                          <select
                            value={textStyle.fontFamily}
                            onChange={(e) => applyTextStyle('fontFamily', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          >
                            {fontFamilies.map((font) => (
                              <option key={font} value={font}>{font.split(',')[0]}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
                          <input
                            type="range"
                            min="8"
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
                            <option value="100">Thin</option>
                            <option value="200">Extra Light</option>
                            <option value="300">Light</option>
                            <option value="normal">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                            <option value="bold">Bold</option>
                            <option value="800">Extra Bold</option>
                            <option value="900">Black</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
                          <div className="flex space-x-2">
                            <input
                              type="color"
                              value={textStyle.color}
                              onChange={(e) => applyTextStyle('color', e.target.value)}
                              className="w-12 h-8 border border-gray-300 rounded"
                            />
                            <input
                              type="text"
                              value={textStyle.color}
                              onChange={(e) => applyTextStyle('color', e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded text-sm"
                              placeholder="#000000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Background Color</label>
                          <div className="flex space-x-2">
                            <input
                              type="color"
                              value={textStyle.backgroundColor === 'transparent' ? '#000000' : textStyle.backgroundColor}
                              onChange={(e) => applyTextStyle('backgroundColor', e.target.value)}
                              className="w-12 h-8 border border-gray-300 rounded"
                            />
                            <input
                              type="text"
                              value={textStyle.backgroundColor}
                              onChange={(e) => applyTextStyle('backgroundColor', e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded text-sm"
                              placeholder="transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Line Height</label>
                          <input
                            type="range"
                            min="0.8"
                            max="3"
                            step="0.1"
                            value={parseFloat(textStyle.lineHeight) || 1.5}
                            onChange={(e) => applyTextStyle('lineHeight', e.target.value)}
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">{textStyle.lineHeight}</span>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Letter Spacing</label>
                          <input
                            type="range"
                            min="-2"
                            max="10"
                            step="0.1"
                            value={parseFloat(textStyle.letterSpacing) || 0}
                            onChange={(e) => applyTextStyle('letterSpacing', `${e.target.value}px`)}
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">{textStyle.letterSpacing}</span>
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={() => selectedElementData && startTextEditing(selectedElementData)}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                          >
                            <Edit3 className="w-4 h-4 inline mr-2" />
                            Edit Text Content
                          </button>
                          
                          <button
                            onClick={removeFormatting}
                            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                          >
                            <Scissors className="w-4 h-4 inline mr-2" />
                            Remove Formatting
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
                          <label className="block text-xs font-medium text-gray-700 mb-1">Width</label>
                          <input
                            type="text"
                            value={imageStyle.width}
                            onChange={(e) => applyImageStyle('width', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="auto, 300px, 50%"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Height</label>
                          <input
                            type="text"
                            value={imageStyle.height}
                            onChange={(e) => applyImageStyle('height', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="auto, 200px, 50%"
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
                          <label className="block text-xs font-medium text-gray-700 mb-1">Opacity</label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={parseFloat(imageStyle.opacity)}
                            onChange={(e) => applyImageStyle('opacity', e.target.value)}
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">{Math.round(parseFloat(imageStyle.opacity) * 100)}%</span>
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
                            <option value="brightness(50%)">Dark</option>
                            <option value="contrast(150%)">High Contrast</option>
                            <option value="saturate(200%)">Saturated</option>
                            <option value="hue-rotate(90deg)">Hue Rotate</option>
                            <option value="invert(100%)">Invert</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Transform</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => applyImageStyle('transform', 'rotate(90deg)')}
                              className="p-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                            >
                              <RotateCw className="w-4 h-4 inline mr-1" />
                              Rotate
                            </button>
                            <button
                              onClick={() => applyImageStyle('transform', 'scaleX(-1)')}
                              className="p-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                            >
                              Flip H
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <MousePointer className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Select an element to edit its styles</p>
                    <p className="text-xs text-gray-400 mt-2">Click on any text, image, or element on the page</p>
                  </div>
                )}
              </div>
            )}

            {activePanel === 'layers' && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Page Elements ({editableElements.size})</h3>
                <div className="max-h-96 overflow-y-auto space-y-1">
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
                        {element.type === 'heading' && <Type className="w-4 h-4 text-blue-500" />}
                        {element.type === 'paragraph' && <FileText className="w-4 h-4 text-gray-500" />}
                        {element.type === 'button' && <Square className="w-4 h-4 text-green-500" />}
                        {element.type === 'link' && <Link className="w-4 h-4 text-purple-500" />}
                        {element.type === 'list' && <List className="w-4 h-4 text-orange-500" />}
                        {element.type === 'table' && <Table className="w-4 h-4 text-red-500" />}
                        {element.type === 'section' && <Grid className="w-4 h-4 text-indigo-500" />}
                        <span className="text-sm text-gray-700 capitalize font-medium">{element.type}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {element.element.tagName} - {element.type === 'image' ? 'Image Element' : (element.element.textContent?.slice(0, 40) + '...' || 'Empty')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Center - Website Content (No changes to actual content) */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </button>
              
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo (Ctrl+Y)"
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
              <div className="text-sm text-gray-600">
                {editableElements.size} editable elements
              </div>

              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Close Editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Website Content Area - This shows the actual website */}
          <div className="flex-1 overflow-auto">
            {/* The actual website content is rendered here naturally */}
            {/* No iframe or separate container - the editor overlays on the real site */}
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
                    <p className="text-xs text-gray-600">Type: <span className="font-medium capitalize">{selectedElementData.type}</span></p>
                    <p className="text-xs text-gray-600">Tag: <span className="font-medium">{selectedElementData.element.tagName}</span></p>
                    <p className="text-xs text-gray-600">Classes: <span className="font-medium">{selectedElementData.element.className || 'None'}</span></p>
                    <p className="text-xs text-gray-600">ID: <span className="font-medium">{selectedElementData.element.id || 'None'}</span></p>
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
                    
                    <button
                      onClick={duplicateElement}
                      className="w-full bg-gray-500 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4 inline mr-2" />
                      Duplicate
                    </button>
                    
                    <button
                      onClick={deleteElement}
                      className="w-full bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Delete
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Element Content</h4>
                  <div className="bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
                    <p className="text-xs text-gray-600 whitespace-pre-wrap">
                      {selectedElementData.type === 'image' 
                        ? `Image source: ${(selectedElementData.element as HTMLImageElement).src}`
                        : selectedElementData.element.textContent || 'No text content'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Settings className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Select an element to view its properties</p>
                <p className="text-xs text-gray-400 mt-2">Click on any element on the page to get started</p>
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