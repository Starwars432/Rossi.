import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Download, 
  Undo, 
  Redo, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Search,
  Copy,
  Trash2,
  Plus,
  Type,
  Image as ImageIcon,
  Square,
  List,
  Quote,
  Video,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface WYSIWYGEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'section' | 'list' | 'quote' | 'video';
  content: string;
  styles: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  parentId?: string;
}

interface Page {
  id: string;
  name: string;
  slug: string;
  elements: EditorElement[];
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'elements' | 'layers' | 'styles'>('elements');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [pages, setPages] = useState<Page[]>([
    {
      id: 'home',
      name: 'Home',
      slug: '',
      elements: []
    }
  ]);
  const [currentPageId, setCurrentPageId] = useState('home');
  const [isEditMode, setIsEditMode] = useState(true);
  const [editableElements, setEditableElements] = useState<EditorElement[]>([]);
  const [undoStack, setUndoStack] = useState<EditorElement[][]>([]);
  const [redoStack, setRedoStack] = useState<EditorElement[][]>([]);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [websiteContent, setWebsiteContent] = useState<string>('');
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.email === 'madisn382@gmail.com';

  // Load the actual website content
  useEffect(() => {
    if (isOpen && isAdmin) {
      loadWebsiteContent();
    }
  }, [isOpen, isAdmin]);

  const loadWebsiteContent = async () => {
    try {
      // Load the actual website content from the static homepage
      const response = await fetch('/static/homepage.html');
      const htmlContent = await response.text();
      setWebsiteContent(htmlContent);
      
      // Parse the HTML and extract editable elements
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      const elements: EditorElement[] = [];
      let elementId = 0;

      // Extract text elements (h1, h2, h3, p, etc.)
      const textElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
      textElements.forEach((el) => {
        if (el.textContent && el.textContent.trim() && el.textContent.length > 3) {
          elements.push({
            id: `element-${elementId++}`,
            type: 'text',
            content: el.textContent.trim(),
            styles: {
              fontSize: '16px',
              fontFamily: 'Playfair Display, serif',
              color: '#ffffff',
              fontWeight: 'normal',
              textAlign: 'left',
              tagName: el.tagName.toLowerCase()
            },
            position: { x: 0, y: 0 },
            size: { width: 100, height: 'auto' }
          });
        }
      });

      // Extract images
      const images = doc.querySelectorAll('img');
      images.forEach((img) => {
        elements.push({
          id: `element-${elementId++}`,
          type: 'image',
          content: img.src,
          styles: {
            width: 'auto',
            height: 'auto',
            alt: img.alt || ''
          },
          position: { x: 0, y: 0 },
          size: { width: 200, height: 'auto' }
        });
      });

      // Extract buttons
      const buttons = doc.querySelectorAll('button, a[class*="button"], a[class*="btn"]');
      buttons.forEach((btn) => {
        if (btn.textContent && btn.textContent.trim()) {
          elements.push({
            id: `element-${elementId++}`,
            type: 'button',
            content: btn.textContent.trim(),
            styles: {
              backgroundColor: '#3B82F6',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none'
            },
            position: { x: 0, y: 0 },
            size: { width: 'auto', height: 'auto' }
          });
        }
      });

      setEditableElements(elements);
      
      // Update the current page with these elements
      setPages(prev => prev.map(page => 
        page.id === currentPageId 
          ? { ...page, elements }
          : page
      ));

    } catch (error) {
      console.error('Error loading website content:', error);
    }
  };

  const saveToUndoStack = useCallback(() => {
    setUndoStack(prev => [...prev.slice(-19), [...editableElements]]);
    setRedoStack([]);
  }, [editableElements]);

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack(prev => [editableElements, ...prev.slice(0, 19)]);
      setEditableElements(previousState);
      setUndoStack(prev => prev.slice(0, -1));
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setUndoStack(prev => [...prev.slice(-19), editableElements]);
      setEditableElements(nextState);
      setRedoStack(prev => prev.slice(1));
    }
  };

  const addElement = (type: EditorElement['type']) => {
    if (type === 'image') {
      fileInputRef.current?.click();
      return;
    }

    saveToUndoStack();
    
    const newElement: EditorElement = {
      id: `element-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
      position: { x: 50, y: 50 },
      size: { width: getDefaultWidth(type), height: 'auto' }
    };

    setEditableElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const getDefaultContent = (type: EditorElement['type']): string => {
    switch (type) {
      case 'text': return 'New text element';
      case 'button': return 'Button';
      case 'list': return 'List item 1\nList item 2\nList item 3';
      case 'quote': return 'This is a quote';
      case 'section': return 'New section';
      case 'video': return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      default: return '';
    }
  };

  const getDefaultStyles = (type: EditorElement['type']) => {
    const baseStyles = {
      fontSize: '16px',
      fontFamily: 'Playfair Display, serif',
      color: '#ffffff',
      fontWeight: 'normal',
      textAlign: 'left'
    };

    switch (type) {
      case 'button':
        return {
          ...baseStyles,
          backgroundColor: '#3B82F6',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        };
      case 'quote':
        return {
          ...baseStyles,
          fontStyle: 'italic',
          borderLeft: '4px solid #60A5FA',
          paddingLeft: '16px',
          margin: '16px 0'
        };
      case 'section':
        return {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid rgba(96, 165, 250, 0.3)'
        };
      default:
        return baseStyles;
    }
  };

  const getDefaultWidth = (type: EditorElement['type']): number | string => {
    switch (type) {
      case 'button': return 'auto';
      case 'image': return 200;
      case 'video': return 400;
      case 'section': return 300;
      default: return 'auto';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        saveToUndoStack();
        const newElement: EditorElement = {
          id: `element-${Date.now()}`,
          type: 'image',
          content: e.target?.result as string,
          styles: {
            width: 'auto',
            height: 'auto',
            alt: file.name
          },
          position: { x: 50, y: 50 },
          size: { width: 200, height: 'auto' }
        };
        setEditableElements(prev => [...prev, newElement]);
        setSelectedElement(newElement.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateElement = (id: string, updates: Partial<EditorElement>) => {
    saveToUndoStack();
    setEditableElements(prev =>
      prev.map(el => el.id === id ? { ...el, ...updates } : el)
    );
  };

  const deleteElement = (id: string) => {
    saveToUndoStack();
    setEditableElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const duplicateElement = (id: string) => {
    const element = editableElements.find(el => el.id === id);
    if (element) {
      saveToUndoStack();
      const newElement = {
        ...element,
        id: `element-${Date.now()}`,
        position: { x: element.position.x + 20, y: element.position.y + 20 }
      };
      setEditableElements(prev => [...prev, newElement]);
    }
  };

  const createPage = () => {
    const selectedEl = editableElements.find(el => el.id === selectedElement);
    if (selectedEl) {
      const pageName = prompt('Enter page name:');
      if (pageName) {
        const newPage: Page = {
          id: `page-${Date.now()}`,
          name: pageName,
          slug: pageName.toLowerCase().replace(/\s+/g, '-'),
          elements: []
        };
        setPages(prev => [...prev, newPage]);
      }
    }
  };

  const saveChanges = async () => {
    if (!isAdmin) return;

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('pages')
        .upsert({
          slug: pages.find(p => p.id === currentPageId)?.slug || '',
          title: pages.find(p => p.id === currentPageId)?.name || 'Home',
          content: { elements: editableElements },
          metadata: { lastModified: new Date().toISOString() }
        });

      if (error) throw error;

      // Sync with GitHub if configured
      const { data: settings } = await supabase
        .from('editor_settings')
        .select('github_token, github_repo')
        .eq('user_id', user.id)
        .single();

      if (settings?.github_token && settings?.github_repo) {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-github`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pageId: currentPageId })
        });
      }

      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    }
  };

  const exportPage = () => {
    const pageData = {
      page: pages.find(p => p.id === currentPageId),
      elements: editableElements
    };
    const blob = new Blob([JSON.stringify(pageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pages.find(p => p.id === currentPageId)?.name || 'page'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const findAndReplace = () => {
    if (!findText) return;
    
    saveToUndoStack();
    setEditableElements(prev =>
      prev.map(el => ({
        ...el,
        content: el.content.replace(new RegExp(findText, 'g'), replaceText)
      }))
    );
  };

  const selectedElementData = editableElements.find(el => el.id === selectedElement);

  if (!isOpen || !isAdmin) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-64 bg-black/90 border-r border-blue-400/30 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-blue-400/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-blue-400">WYSIWYG Editor</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm">● Live Edit</span>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 disabled:opacity-50"
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 disabled:opacity-50"
                  title="Redo"
                >
                  <Redo className="w-4 h-4" />
                </button>
                <button
                  onClick={saveChanges}
                  className="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={exportPage}
                  className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              {/* Page Tabs */}
              <div className="flex space-x-1 mb-4">
                {pages.map(page => (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPageId(page.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      currentPageId === page.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    }`}
                  >
                    {page.name}
                  </button>
                ))}
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1">
                {(['elements', 'layers', 'styles'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-3 rounded text-sm capitalize ${
                      activeTab === tab
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'elements' && (
                <div className="space-y-4">
                  <h3 className="text-lg text-blue-400 mb-4">Add Elements</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addElement('text')}
                      className="flex flex-col items-center p-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      <Type className="w-6 h-6 mb-1" />
                      <span className="text-xs">Heading</span>
                    </button>
                    
                    <button
                      onClick={() => addElement('text')}
                      className="flex flex-col items-center p-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      <Type className="w-6 h-6 mb-1" />
                      <span className="text-xs">Paragraph</span>
                    </button>
                    
                    <button
                      onClick={() => addElement('image')}
                      className="flex flex-col items-center p-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      <ImageIcon className="w-6 h-6 mb-1" />
                      <span className="text-xs">Image</span>
                    </button>
                    
                    <button
                      onClick={() => addElement('button')}
                      className="flex flex-col items-center p-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      <Square className="w-6 h-6 mb-1" />
                      <span className="text-xs">Button</span>
                    </button>
                    
                    <button
                      onClick={() => addElement('section')}
                      className="flex flex-col items-center p-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      <Square className="w-6 h-6 mb-1" />
                      <span className="text-xs">Section</span>
                    </button>
                    
                    <button
                      onClick={() => addElement('list')}
                      className="flex flex-col items-center p-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      <List className="w-6 h-6 mb-1" />
                      <span className="text-xs">List</span>
                    </button>
                    
                    <button
                      onClick={() => addElement('quote')}
                      className="flex flex-col items-center p-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      <Quote className="w-6 h-6 mb-1" />
                      <span className="text-xs">Quote</span>
                    </button>
                    
                    <button
                      onClick={() => addElement('video')}
                      className="flex flex-col items-center p-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      <Video className="w-6 h-6 mb-1" />
                      <span className="text-xs">Video</span>
                    </button>
                  </div>

                  {/* Text Formatting */}
                  <div className="mt-6">
                    <h4 className="text-blue-400 mb-2">Text Formatting</h4>
                    <div className="flex space-x-1">
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                        <Underline className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                        <Strikethrough className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Text Alignment */}
                  <div>
                    <h4 className="text-blue-400 mb-2">Text Alignment</h4>
                    <div className="flex space-x-1">
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                        <AlignLeft className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                        <AlignCenter className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                        <AlignRight className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                        <AlignJustify className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Find & Replace */}
                  <div>
                    <h4 className="text-blue-400 mb-2">Find & Replace</h4>
                    <input
                      type="text"
                      placeholder="Find text..."
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-black placeholder-gray-400 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Replace with..."
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-black placeholder-gray-400 mb-2"
                    />
                    <button
                      onClick={findAndReplace}
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                      Replace All
                    </button>
                  </div>

                  {/* Instructions */}
                  <div className="mt-6 p-3 bg-blue-500/10 rounded border border-blue-400/30">
                    <h4 className="text-blue-400 mb-2">Instructions</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Click on any text to edit it directly</li>
                      <li>• Click on images to replace them</li>
                      <li>• Use the Styles panel to customize appearance</li>
                      <li>• Drag elements from above to add new content</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'layers' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg text-blue-400">Layers</h3>
                    <span className="text-sm text-gray-400">{editableElements.length} editable elements</span>
                  </div>
                  
                  {editableElements.map((element) => (
                    <div
                      key={element.id}
                      onClick={() => setSelectedElement(element.id)}
                      className={`p-3 rounded border cursor-pointer ${
                        selectedElement === element.id
                          ? 'bg-blue-500/30 border-blue-400'
                          : 'bg-black/50 border-blue-400/20 hover:border-blue-400/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">
                            {element.type}
                          </div>
                          <div className="text-gray-400 text-sm truncate">
                            {element.content.substring(0, 30)}...
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateElement(element.id);
                            }}
                            className="p-1 text-blue-400 hover:text-blue-300"
                            title="Copy"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteElement(element.id);
                            }}
                            className="p-1 text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {selectedElement === element.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                createPage();
                              }}
                              className="p-1 text-green-400 hover:text-green-300"
                              title="+ Page"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'styles' && selectedElementData && (
                <div className="space-y-4">
                  <h3 className="text-lg text-blue-400">Properties</h3>
                  
                  <div className="text-sm text-gray-400 mb-4">
                    Select an element to view its properties<br/>
                    Click on any element on the page to get started
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Font Size</label>
                    <input
                      type="range"
                      min="8"
                      max="72"
                      value={parseInt(selectedElementData.styles.fontSize) || 16}
                      onChange={(e) => updateElement(selectedElement!, {
                        styles: { ...selectedElementData.styles, fontSize: `${e.target.value}px` }
                      })}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-400">{selectedElementData.styles.fontSize}</span>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Font Family</label>
                    <select
                      value={selectedElementData.styles.fontFamily || 'Playfair Display'}
                      onChange={(e) => updateElement(selectedElement!, {
                        styles: { ...selectedElementData.styles, fontFamily: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white border border-blue-400/30 rounded text-black"
                    >
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Georgia">Georgia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Font Weight</label>
                    <select
                      value={selectedElementData.styles.fontWeight || 'normal'}
                      onChange={(e) => updateElement(selectedElement!, {
                        styles: { ...selectedElementData.styles, fontWeight: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white border border-blue-400/30 rounded text-black"
                    >
                      <option value="normal">Normal</option>
                      <option value="bold">Bold</option>
                      <option value="lighter">Lighter</option>
                      <option value="bolder">Bolder</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Text Color</label>
                    <input
                      type="color"
                      value={selectedElementData.styles.color || '#ffffff'}
                      onChange={(e) => updateElement(selectedElement!, {
                        styles: { ...selectedElementData.styles, color: e.target.value }
                      })}
                      className="w-full h-10 rounded border border-blue-400/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Background Color</label>
                    <input
                      type="color"
                      value={selectedElementData.styles.backgroundColor || '#000000'}
                      onChange={(e) => updateElement(selectedElement!, {
                        styles: { ...selectedElementData.styles, backgroundColor: e.target.value }
                      })}
                      className="w-full h-10 rounded border border-blue-400/30"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 bg-black overflow-auto">
            <div 
              ref={canvasRef}
              className="min-h-full"
              style={{ 
                background: 'black',
                minWidth: '1200px',
                padding: '20px'
              }}
            >
              {/* Render the actual website content */}
              {websiteContent && (
                <div 
                  dangerouslySetInnerHTML={{ __html: websiteContent }}
                  className="w-full"
                  style={{
                    background: 'black',
                    color: 'white',
                    fontFamily: 'Playfair Display, serif'
                  }}
                />
              )}
            </div>
          </div>

          {/* Right Properties Panel */}
          <div className="w-80 bg-black/90 border-l border-blue-400/30 p-4">
            <h3 className="text-xl text-blue-400 mb-4">Properties</h3>
            
            {selectedElementData ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Content</label>
                  <textarea
                    value={selectedElementData.content}
                    onChange={(e) => updateElement(selectedElement!, { content: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-blue-400/30 rounded text-black"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Font Size</label>
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={parseInt(selectedElementData.styles.fontSize) || 16}
                    onChange={(e) => updateElement(selectedElement!, {
                      styles: { ...selectedElementData.styles, fontSize: `${e.target.value}px` }
                    })}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-400">{selectedElementData.styles.fontSize}</span>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Text Color</label>
                  <input
                    type="color"
                    value={selectedElementData.styles.color || '#ffffff'}
                    onChange={(e) => updateElement(selectedElement!, {
                      styles: { ...selectedElementData.styles, color: e.target.value }
                    })}
                    className="w-full h-10 rounded border border-blue-400/30"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Background Color</label>
                  <input
                    type="color"
                    value={selectedElementData.styles.backgroundColor || '#000000'}
                    onChange={(e) => updateElement(selectedElement!, {
                      styles: { ...selectedElementData.styles, backgroundColor: e.target.value }
                    })}
                    className="w-full h-10 rounded border border-blue-400/30"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select an element to view its properties</p>
                <p className="text-sm mt-2">Click on any element on the page to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,.pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </AnimatePresence>
  );
};

export default WYSIWYGEditor;