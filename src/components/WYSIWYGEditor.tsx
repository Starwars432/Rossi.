import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Save, Download, Undo, Redo, Type, Image, Square, 
  List, Quote, Video, Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Search,
  Plus, Move, Trash2, Copy, Link, Upload, ArrowUp, ArrowDown,
  ArrowLeft, ArrowRight, Eye, EyeOff, Layers, Palette, Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface WYSIWYGEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditableElement {
  id: string;
  element: HTMLElement;
  type: 'text' | 'image' | 'button' | 'section';
  content: string;
  styles: Record<string, string>;
}

interface HistoryState {
  elements: EditableElement[];
  timestamp: number;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [editableElements, setEditableElements] = useState<EditableElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [inlineEditElement, setInlineEditElement] = useState<HTMLElement | null>(null);
  const [showStyles, setShowStyles] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // GitHub settings
  const [githubSettings, setGithubSettings] = useState({
    token: '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',
    repo: 'Starwars432/Rossi'
  });

  // Initialize editor and detect elements
  useEffect(() => {
    if (isOpen) {
      initializeEditor();
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cleanupEditor();
    };
  }, [isOpen]);

  const initializeEditor = () => {
    const elements = findEditableElements();
    setEditableElements(elements);
    saveToHistory(elements);
    setIsEditMode(true);
  };

  const cleanupEditor = () => {
    // Remove all editor overlays and restore original state
    document.querySelectorAll('.wysiwyg-overlay, .wysiwyg-hover, .wysiwyg-selected').forEach(el => {
      el.remove();
    });
    document.querySelectorAll('[data-wysiwyg-editing]').forEach(el => {
      el.removeAttribute('data-wysiwyg-editing');
      el.style.outline = '';
    });
    setIsEditMode(false);
    setSelectedElement(null);
    setHoveredElement(null);
    setIsInlineEditing(false);
    setInlineEditElement(null);
  };

  const findEditableElements = (): EditableElement[] => {
    const elements: EditableElement[] = [];
    const selectors = [
      'h1, h2, h3, h4, h5, h6',
      'p',
      'span',
      'div:not([class*="wysiwyg"]):not([id*="wysiwyg"])',
      'button',
      'a',
      'img',
      'section',
      'article',
      'aside',
      'header',
      'footer',
      'nav',
      'li',
      'td',
      'th',
      'blockquote',
      'figcaption'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        
        // Skip editor elements and empty elements
        if (htmlEl.closest('[data-wysiwyg-editor]') || 
            htmlEl.classList.contains('wysiwyg-editor') ||
            (!htmlEl.textContent?.trim() && htmlEl.tagName !== 'IMG')) {
          return;
        }

        const id = `element-${selector.replace(/[^a-zA-Z0-9]/g, '')}-${index}`;
        htmlEl.setAttribute('data-wysiwyg-id', id);
        
        let type: 'text' | 'image' | 'button' | 'section' = 'text';
        if (htmlEl.tagName === 'IMG') type = 'image';
        else if (htmlEl.tagName === 'BUTTON') type = 'button';
        else if (['SECTION', 'DIV', 'ARTICLE', 'ASIDE', 'HEADER', 'FOOTER', 'NAV'].includes(htmlEl.tagName)) type = 'section';

        elements.push({
          id,
          element: htmlEl,
          type,
          content: type === 'image' ? (htmlEl as HTMLImageElement).src : htmlEl.textContent || '',
          styles: getComputedStyles(htmlEl)
        });
      });
    });

    return elements;
  };

  const getComputedStyles = (element: HTMLElement): Record<string, string> => {
    const computed = window.getComputedStyle(element);
    return {
      fontSize: computed.fontSize,
      fontFamily: computed.fontFamily,
      fontWeight: computed.fontWeight,
      color: computed.color,
      backgroundColor: computed.backgroundColor,
      textAlign: computed.textAlign,
      lineHeight: computed.lineHeight,
      letterSpacing: computed.letterSpacing,
      textDecoration: computed.textDecoration,
      borderRadius: computed.borderRadius,
      padding: computed.padding,
      margin: computed.margin,
      border: computed.border,
      opacity: computed.opacity,
      transform: computed.transform
    };
  };

  const handleMouseOver = (e: MouseEvent) => {
    if (!isEditMode || isInlineEditing || isDragging) return;
    
    const target = e.target as HTMLElement;
    const editableEl = target.closest('[data-wysiwyg-id]') as HTMLElement;
    
    if (editableEl && editableEl !== selectedElement?.element) {
      setHoveredElement(editableEl);
      editableEl.style.outline = '2px dashed #60A5FA';
      editableEl.style.outlineOffset = '2px';
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    if (!isEditMode || isInlineEditing) return;
    
    const target = e.target as HTMLElement;
    const editableEl = target.closest('[data-wysiwyg-id]') as HTMLElement;
    
    if (editableEl && editableEl !== selectedElement?.element) {
      editableEl.style.outline = '';
      setHoveredElement(null);
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (!isEditMode) return;
    
    const target = e.target as HTMLElement;
    
    // Check if clicking on editor UI
    if (target.closest('[data-wysiwyg-editor]')) {
      return;
    }

    const editableEl = target.closest('[data-wysiwyg-id]') as HTMLElement;
    
    if (editableEl) {
      e.preventDefault();
      e.stopPropagation();
      
      const elementId = editableEl.getAttribute('data-wysiwyg-id');
      const element = editableElements.find(el => el.id === elementId);
      
      if (element) {
        selectElement(element);
        
        // Double click for inline editing
        if (e.detail === 2 && (element.type === 'text' || element.type === 'button')) {
          startInlineEditing(element);
        }
      }
    } else {
      // Clicked outside, deselect
      setSelectedElement(null);
      setShowStyles(false);
      document.querySelectorAll('[data-wysiwyg-id]').forEach(el => {
        (el as HTMLElement).style.outline = '';
      });
    }
  };

  const selectElement = (element: EditableElement) => {
    // Clear previous selection
    document.querySelectorAll('[data-wysiwyg-id]').forEach(el => {
      (el as HTMLElement).style.outline = '';
    });
    
    setSelectedElement(element);
    setShowStyles(true);
    
    // Highlight selected element
    element.element.style.outline = '3px solid #3B82F6';
    element.element.style.outlineOffset = '2px';
    
    // Scroll element into view if needed
    element.element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const startInlineEditing = (element: EditableElement) => {
    if (element.type !== 'text' && element.type !== 'button') return;
    
    setIsInlineEditing(true);
    setInlineEditElement(element.element);
    
    // Make element editable
    element.element.contentEditable = 'true';
    element.element.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element.element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    // Handle blur to finish editing
    const handleBlur = () => {
      finishInlineEditing();
      element.element.removeEventListener('blur', handleBlur);
    };
    
    element.element.addEventListener('blur', handleBlur);
  };

  const finishInlineEditing = () => {
    if (!inlineEditElement) return;
    
    inlineEditElement.contentEditable = 'false';
    
    // Update element content
    const elementId = inlineEditElement.getAttribute('data-wysiwyg-id');
    if (elementId) {
      const updatedElements = editableElements.map(el => {
        if (el.id === elementId) {
          return { ...el, content: inlineEditElement.textContent || '' };
        }
        return el;
      });
      setEditableElements(updatedElements);
      saveToHistory(updatedElements);
    }
    
    setIsInlineEditing(false);
    setInlineEditElement(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isEditMode) return;
    
    // Undo/Redo
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
        e.preventDefault();
        redo();
      }
    }
    
    // Arrow keys for positioning
    if (selectedElement && !isInlineEditing) {
      const step = e.shiftKey ? 10 : 1;
      let moved = false;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          moveElement(selectedElement, 0, -step);
          moved = true;
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveElement(selectedElement, 0, step);
          moved = true;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          moveElement(selectedElement, -step, 0);
          moved = true;
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveElement(selectedElement, step, 0);
          moved = true;
          break;
        case 'Delete':
          e.preventDefault();
          deleteElement(selectedElement);
          break;
        case 'Escape':
          if (isInlineEditing) {
            finishInlineEditing();
          } else {
            setSelectedElement(null);
            setShowStyles(false);
          }
          break;
      }
      
      if (moved) {
        const updatedElements = editableElements.map(el => 
          el.id === selectedElement.id ? { ...el, styles: getComputedStyles(el.element) } : el
        );
        setEditableElements(updatedElements);
        saveToHistory(updatedElements);
      }
    }
  };

  const moveElement = (element: EditableElement, deltaX: number, deltaY: number) => {
    const el = element.element;
    const rect = el.getBoundingClientRect();
    
    // Make element absolutely positioned if not already
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    
    const currentLeft = parseInt(el.style.left || '0');
    const currentTop = parseInt(el.style.top || '0');
    
    el.style.left = `${currentLeft + deltaX}px`;
    el.style.top = `${currentTop + deltaY}px`;
  };

  const deleteElement = (element: EditableElement) => {
    element.element.remove();
    const updatedElements = editableElements.filter(el => el.id !== element.id);
    setEditableElements(updatedElements);
    setSelectedElement(null);
    setShowStyles(false);
    saveToHistory(updatedElements);
  };

  const duplicateElement = (element: EditableElement) => {
    const cloned = element.element.cloneNode(true) as HTMLElement;
    const newId = `${element.id}-copy-${Date.now()}`;
    cloned.setAttribute('data-wysiwyg-id', newId);
    
    // Position slightly offset
    cloned.style.position = 'relative';
    cloned.style.left = '10px';
    cloned.style.top = '10px';
    
    element.element.parentNode?.insertBefore(cloned, element.element.nextSibling);
    
    const newElement: EditableElement = {
      id: newId,
      element: cloned,
      type: element.type,
      content: element.content,
      styles: getComputedStyles(cloned)
    };
    
    const updatedElements = [...editableElements, newElement];
    setEditableElements(updatedElements);
    saveToHistory(updatedElements);
    selectElement(newElement);
  };

  const saveToHistory = (elements: EditableElement[]) => {
    const newState: HistoryState = {
      elements: elements.map(el => ({ ...el })),
      timestamp: Date.now()
    };
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    
    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      restoreFromHistory(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      restoreFromHistory(history[historyIndex + 1]);
    }
  };

  const restoreFromHistory = (state: HistoryState) => {
    // This is a simplified restore - in a real implementation,
    // you'd need to restore the actual DOM state
    setEditableElements(state.elements);
  };

  const handleDragStart = (elementType: string) => {
    setIsDragging(true);
    setDraggedElement(elementType);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!draggedElement) return;
    
    const rect = document.body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createElement(draggedElement, x, y);
    
    setIsDragging(false);
    setDraggedElement(null);
  };

  const createElement = (type: string, x?: number, y?: number) => {
    let element: HTMLElement;
    const id = `new-${type}-${Date.now()}`;
    
    switch (type) {
      case 'heading':
        element = document.createElement('h2');
        element.textContent = 'New Heading';
        element.style.fontSize = '2rem';
        element.style.fontWeight = 'bold';
        break;
      case 'paragraph':
        element = document.createElement('p');
        element.textContent = 'New paragraph text. Click to edit.';
        break;
      case 'image':
        // Trigger file input
        fileInputRef.current?.click();
        return;
      case 'button':
        element = document.createElement('button');
        element.textContent = 'New Button';
        element.style.padding = '10px 20px';
        element.style.backgroundColor = '#3B82F6';
        element.style.color = 'white';
        element.style.border = 'none';
        element.style.borderRadius = '6px';
        element.style.cursor = 'pointer';
        break;
      case 'section':
        element = document.createElement('div');
        element.textContent = 'New Section';
        element.style.padding = '20px';
        element.style.border = '2px dashed #ccc';
        element.style.minHeight = '100px';
        break;
      case 'list':
        element = document.createElement('ul');
        const li = document.createElement('li');
        li.textContent = 'List item';
        element.appendChild(li);
        break;
      case 'quote':
        element = document.createElement('blockquote');
        element.textContent = 'Quote text here';
        element.style.borderLeft = '4px solid #3B82F6';
        element.style.paddingLeft = '20px';
        element.style.fontStyle = 'italic';
        break;
      case 'video':
        element = document.createElement('div');
        element.innerHTML = '<p>Video placeholder - add embed code</p>';
        element.style.backgroundColor = '#f0f0f0';
        element.style.padding = '40px';
        element.style.textAlign = 'center';
        break;
      default:
        return;
    }
    
    element.setAttribute('data-wysiwyg-id', id);
    
    // Position element
    if (x !== undefined && y !== undefined) {
      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.zIndex = '1000';
    } else if (selectedElement) {
      // Insert after selected element
      selectedElement.element.parentNode?.insertBefore(element, selectedElement.element.nextSibling);
    } else {
      // Append to body
      document.body.appendChild(element);
    }
    
    const newElement: EditableElement = {
      id,
      element,
      type: type === 'image' ? 'image' : type === 'button' ? 'button' : type === 'section' ? 'section' : 'text',
      content: element.textContent || '',
      styles: getComputedStyles(element)
    };
    
    const updatedElements = [...editableElements, newElement];
    setEditableElements(updatedElements);
    saveToHistory(updatedElements);
    selectElement(newElement);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.style.maxWidth = '300px';
      img.style.height = 'auto';
      img.style.cursor = 'pointer';
      
      const id = `new-image-${Date.now()}`;
      img.setAttribute('data-wysiwyg-id', id);
      
      if (selectedElement) {
        selectedElement.element.parentNode?.insertBefore(img, selectedElement.element.nextSibling);
      } else {
        document.body.appendChild(img);
      }
      
      const newElement: EditableElement = {
        id,
        element: img,
        type: 'image',
        content: img.src,
        styles: getComputedStyles(img)
      };
      
      const updatedElements = [...editableElements, newElement];
      setEditableElements(updatedElements);
      saveToHistory(updatedElements);
      selectElement(newElement);
    };
    
    reader.readAsDataURL(file);
    
    // Reset input
    e.target.value = '';
  };

  const updateElementStyle = (property: string, value: string) => {
    if (!selectedElement) return;
    
    selectedElement.element.style[property as any] = value;
    
    const updatedElements = editableElements.map(el => 
      el.id === selectedElement.id 
        ? { ...el, styles: { ...el.styles, [property]: value } }
        : el
    );
    
    setEditableElements(updatedElements);
    saveToHistory(updatedElements);
  };

  const findAndReplace = () => {
    if (!findText) return;
    
    let replacements = 0;
    editableElements.forEach(element => {
      if (element.type === 'text' || element.type === 'button') {
        const originalText = element.element.textContent || '';
        const newText = originalText.replace(new RegExp(findText, 'gi'), replaceText);
        if (newText !== originalText) {
          element.element.textContent = newText;
          replacements++;
        }
      }
    });
    
    if (replacements > 0) {
      const updatedElements = editableElements.map(el => ({
        ...el,
        content: el.element.textContent || ''
      }));
      setEditableElements(updatedElements);
      saveToHistory(updatedElements);
      alert(`Replaced ${replacements} instances`);
    } else {
      alert('No matches found');
    }
  };

  const saveToGitHub = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Get current page HTML
      const html = document.documentElement.outerHTML;
      
      // Clean up editor artifacts
      const cleanHtml = html
        .replace(/data-wysiwyg-[^=]*="[^"]*"/g, '')
        .replace(/style="[^"]*outline[^"]*"/g, '')
        .replace(/<div[^>]*data-wysiwyg-editor[^>]*>.*?<\/div>/gs, '');
      
      const [owner, repo] = githubSettings.repo.split('/');
      
      // Get current file SHA
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/public/static/homepage.html`,
        {
          headers: {
            'Authorization': `token ${githubSettings.token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      
      let sha = undefined;
      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
      }
      
      // Update file
      const updateResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/public/static/homepage.html`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubSettings.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Update homepage via WYSIWYG editor`,
            content: btoa(cleanHtml),
            sha,
            committer: {
              name: 'WYSIWYG Editor',
              email: user.email || 'editor@manifestillusions.com',
            },
          }),
        }
      );
      
      if (updateResponse.ok) {
        alert('Changes saved to GitHub successfully!');
      } else {
        throw new Error('Failed to save to GitHub');
      }
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      alert('Failed to save to GitHub. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const exportHTML = () => {
    const html = document.documentElement.outerHTML;
    const cleanHtml = html
      .replace(/data-wysiwyg-[^=]*="[^"]*"/g, '')
      .replace(/style="[^"]*outline[^"]*"/g, '')
      .replace(/<div[^>]*data-wysiwyg-editor[^>]*>.*?<\/div>/gs, '');
    
    const blob = new Blob([cleanHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const createNewPage = () => {
    if (!selectedElement) return;
    
    const pageName = prompt('Enter page name:');
    if (!pageName) return;
    
    const slug = pageName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // This would typically create a new page in your routing system
    alert(`New page "${pageName}" would be created with slug: ${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20" data-wysiwyg-editor>
      {/* Top Toolbar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-[10001]">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-800">WYSIWYG Editor</h2>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Live Edit</span>
          </div>
          <span className="text-sm text-gray-500">{editableElements.length} editable elements</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
          <button
            onClick={saveToGitHub}
            disabled={isSaving}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
          <button
            onClick={exportHTML}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Left Panel - Smaller width */}
      <div className="absolute left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto z-[10000]">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Add Elements</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div
              draggable
              onDragStart={() => handleDragStart('heading')}
              onDragEnd={handleDragEnd}
              onClick={() => createElement('heading')}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 text-center"
            >
              <Type className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <span className="text-xs text-gray-800">Heading</span>
            </div>
            
            <div
              draggable
              onDragStart={() => handleDragStart('paragraph')}
              onDragEnd={handleDragEnd}
              onClick={() => createElement('paragraph')}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 text-center"
            >
              <Type className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <span className="text-xs text-gray-800">Paragraph</span>
            </div>
            
            <div
              draggable
              onDragStart={() => handleDragStart('image')}
              onDragEnd={handleDragEnd}
              onClick={() => createElement('image')}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 text-center"
            >
              <Image className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <span className="text-xs text-gray-800">Image</span>
            </div>
            
            <div
              draggable
              onDragStart={() => handleDragStart('button')}
              onDragEnd={handleDragEnd}
              onClick={() => createElement('button')}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 text-center"
            >
              <Square className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <span className="text-xs text-gray-800">Button</span>
            </div>
            
            <div
              draggable
              onDragStart={() => handleDragStart('section')}
              onDragEnd={handleDragEnd}
              onClick={() => createElement('section')}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 text-center"
            >
              <Square className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <span className="text-xs text-gray-800">Section</span>
            </div>
            
            <div
              draggable
              onDragStart={() => handleDragStart('list')}
              onDragEnd={handleDragEnd}
              onClick={() => createElement('list')}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 text-center"
            >
              <List className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <span className="text-xs text-gray-800">List</span>
            </div>
            
            <div
              draggable
              onDragStart={() => handleDragStart('quote')}
              onDragEnd={handleDragEnd}
              onClick={() => createElement('quote')}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 text-center"
            >
              <Quote className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <span className="text-xs text-gray-800">Quote</span>
            </div>
            
            <div
              draggable
              onDragStart={() => handleDragStart('video')}
              onDragEnd={handleDragEnd}
              onClick={() => createElement('video')}
              className="p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 text-center"
            >
              <Video className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <span className="text-xs text-gray-800">Video</span>
            </div>
          </div>

          {/* Text Formatting */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Text Formatting</h4>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => document.execCommand('bold')}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                title="Bold"
              >
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => document.execCommand('italic')}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                title="Italic"
              >
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => document.execCommand('underline')}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                title="Underline"
              >
                <Underline className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => document.execCommand('strikethrough')}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                title="Strikethrough"
              >
                <Strikethrough className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Text Alignment */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Text Alignment</h4>
            <div className="flex gap-1">
              <button
                onClick={() => updateElementStyle('textAlign', 'left')}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => updateElementStyle('textAlign', 'center')}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                title="Align Center"
              >
                <AlignCenter className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => updateElementStyle('textAlign', 'right')}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                title="Align Right"
              >
                <AlignRight className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => updateElementStyle('textAlign', 'justify')}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50"
                title="Justify"
              >
                <AlignJustify className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Find & Replace */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Find & Replace</h4>
            <input
              type="text"
              placeholder="Find text..."
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded mb-2 text-gray-800 bg-white"
            />
            <input
              type="text"
              placeholder="Replace with..."
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded mb-2 text-gray-800 bg-white"
            />
            <button
              onClick={findAndReplace}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Replace All
            </button>
          </div>

          {/* Instructions */}
          <div className="text-xs text-gray-600 space-y-1">
            <p>• Click on any text to edit it directly</p>
            <p>• Double-click text for inline editing</p>
            <p>• Click on images to replace them</p>
            <p>• Use arrow keys to move selected elements</p>
            <p>• Drag elements from above to add new content</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Smaller width */}
      <div className="absolute right-0 top-16 bottom-0 w-80 bg-white border-l border-gray-200 overflow-y-auto z-[10000]">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Properties</h3>
          
          {selectedElement ? (
            <div className="space-y-4">
              {/* Element Info */}
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-800 mb-1">
                  {selectedElement.element.tagName.toLowerCase()}
                </div>
                <div className="text-xs text-gray-600">
                  {selectedElement.type} element
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => duplicateElement(selectedElement)}
                  className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center space-x-1"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Duplicate</span>
                </button>
                <button
                  onClick={() => deleteElement(selectedElement)}
                  className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-xs">Delete</span>
                </button>
                <button
                  onClick={createNewPage}
                  className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-xs">New Page</span>
                </button>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={parseInt(selectedElement.styles.fontSize) || 16}
                  onChange={(e) => updateElementStyle('fontSize', `${e.target.value}px`)}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {parseInt(selectedElement.styles.fontSize) || 16}px
                </div>
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                <select
                  value={selectedElement.styles.fontFamily?.replace(/['"]/g, '') || 'inherit'}
                  onChange={(e) => updateElementStyle('fontFamily', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded text-gray-800 bg-white"
                >
                  <option value="inherit">Inherit</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                  <option value="Times New Roman, serif">Times New Roman</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                  <option value="Courier New, monospace">Courier New</option>
                  <option value="Playfair Display, serif">Playfair Display</option>
                </select>
              </div>

              {/* Font Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                <select
                  value={selectedElement.styles.fontWeight || 'normal'}
                  onChange={(e) => updateElementStyle('fontWeight', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded text-gray-800 bg-white"
                >
                  <option value="100">Thin</option>
                  <option value="200">Extra Light</option>
                  <option value="300">Light</option>
                  <option value="400">Normal</option>
                  <option value="500">Medium</option>
                  <option value="600">Semi Bold</option>
                  <option value="700">Bold</option>
                  <option value="800">Extra Bold</option>
                  <option value="900">Black</option>
                </select>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                <input
                  type="color"
                  value={rgbToHex(selectedElement.styles.color) || '#000000'}
                  onChange={(e) => updateElementStyle('color', e.target.value)}
                  className="w-full h-10 border border-gray-200 rounded"
                />
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                <input
                  type="color"
                  value={rgbToHex(selectedElement.styles.backgroundColor) || '#ffffff'}
                  onChange={(e) => updateElementStyle('backgroundColor', e.target.value)}
                  className="w-full h-10 border border-gray-200 rounded"
                />
              </div>

              {/* Line Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Line Height</label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={parseFloat(selectedElement.styles.lineHeight) || 1.5}
                  onChange={(e) => updateElementStyle('lineHeight', e.target.value)}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {parseFloat(selectedElement.styles.lineHeight) || 1.5}
                </div>
              </div>

              {/* Letter Spacing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Letter Spacing</label>
                <input
                  type="range"
                  min="-2"
                  max="10"
                  step="0.1"
                  value={parseFloat(selectedElement.styles.letterSpacing) || 0}
                  onChange={(e) => updateElementStyle('letterSpacing', `${e.target.value}px`)}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {parseFloat(selectedElement.styles.letterSpacing) || 0}px
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={parseInt(selectedElement.styles.borderRadius) || 0}
                  onChange={(e) => updateElementStyle('borderRadius', `${e.target.value}px`)}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {parseInt(selectedElement.styles.borderRadius) || 0}px
                </div>
              </div>

              {/* Opacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={parseFloat(selectedElement.styles.opacity) || 1}
                  onChange={(e) => updateElementStyle('opacity', e.target.value)}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((parseFloat(selectedElement.styles.opacity) || 1) * 100)}%
                </div>
              </div>

              {/* Image specific controls */}
              {selectedElement.type === 'image' && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800">Image Controls</h4>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Replace Image
                  </button>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                    <input
                      type="number"
                      value={parseInt(selectedElement.element.style.width) || ''}
                      onChange={(e) => updateElementStyle('width', `${e.target.value}px`)}
                      className="w-full p-2 border border-gray-200 rounded text-gray-800 bg-white"
                      placeholder="Auto"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                    <input
                      type="number"
                      value={parseInt(selectedElement.element.style.height) || ''}
                      onChange={(e) => updateElementStyle('height', `${e.target.value}px`)}
                      className="w-full p-2 border border-gray-200 rounded text-gray-800 bg-white"
                      placeholder="Auto"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">Select an element to view its properties</p>
              <p className="text-xs mt-2">Click on any element on the page to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,.pdf"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Main content area - adjusted margins */}
      <div 
        className="absolute top-16 left-64 right-80 bottom-0 overflow-auto"
        style={{ 
          background: 'transparent',
          pointerEvents: isInlineEditing ? 'auto' : 'none' 
        }}
      >
        {/* Content is the actual website */}
      </div>
    </div>
  );
};

// Helper function to convert RGB to Hex
const rgbToHex = (rgb: string): string => {
  if (!rgb || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'transparent') return '#ffffff';
  
  const result = rgb.match(/\d+/g);
  if (!result) return '#000000';
  
  const r = parseInt(result[0]);
  const g = parseInt(result[1]);
  const b = parseInt(result[2]);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export default WYSIWYGEditor;