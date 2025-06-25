import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Download, Upload, Settings, Eye, EyeOff, Layers, Palette, Square } from 'lucide-react';
import grapesjs from '../lib/grapesjs-global';
import 'grapesjs/dist/css/grapes.min.css';
import * as presetWebpage from 'grapesjs-preset-webpage';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface OverlayEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const OverlayEditor: React.FC<OverlayEditorProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [editor, setEditor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [settings, setSettings] = useState({ 
    github_token: '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', 
    github_repo: 'Starwars432/Rossi' 
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showPanels, setShowPanels] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !editor) {
      initializeOverlayEditor();
    }
    return () => {
      if (editor) {
        editor.destroy();
        setEditor(null);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('editor_settings')
        .select('github_token, github_repo')
        .eq('user_id', user.id)
        .single();
      
      if (data && data.github_token && data.github_repo) {
        setSettings({
          github_token: data.github_token,
          github_repo: data.github_repo
        });
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    }
  };

  const initializeOverlayEditor = () => {
    if (!editorRef.current || !panelsRef.current) return;

    const editorInstance = grapesjs.init({
      container: editorRef.current,
      height: '100vh',
      width: '100%',
      storageManager: false,
      canvas: {
        styles: [
          '/static/homepage.css',
          'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
        ],
      },
      panels: {
        defaults: [
          {
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
              {
                id: 'visibility',
                active: true,
                className: 'btn-toggle-borders',
                label: '<i class="fa fa-clone"></i>',
                command: 'sw-visibility',
              },
            ],
          },
          {
            id: 'panel-devices',
            el: '.panel__devices',
            buttons: [
              {
                id: 'device-desktop',
                label: '<i class="fa fa-desktop"></i>',
                command: 'set-device-desktop',
                active: true,
                togglable: false,
              },
              {
                id: 'device-tablet',
                label: '<i class="fa fa-tablet"></i>',
                command: 'set-device-tablet',
                togglable: false,
              },
              {
                id: 'device-mobile',
                label: '<i class="fa fa-mobile"></i>',
                command: 'set-device-mobile',
                togglable: false,
              },
            ],
          },
        ],
      },
      blockManager: {
        appendTo: '#blocks-panel',
      },
      layerManager: {
        appendTo: '#layers-panel',
      },
      styleManager: {
        appendTo: '#styles-panel',
        sectors: [
          {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'min-height', 'padding'],
          },
          {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height'],
          },
          {
            name: 'Decorations',
            open: false,
            buildProps: ['opacity', 'border-radius', 'border', 'box-shadow', 'background'],
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['transition', 'perspective', 'transform'],
          },
        ],
      },
      traitManager: {
        appendTo: '#traits-panel',
      },
      plugins: [
        (e) => presetWebpage.default(e, {
          blocks: ['text', 'link', 'image', 'video', 'map'],
        }),
      ],
    });

    // Add device commands
    editorInstance.Commands.add('set-device-desktop', {
      run: (editor) => editor.setDevice('Desktop'),
    });
    editorInstance.Commands.add('set-device-tablet', {
      run: (editor) => editor.setDevice('Tablet'),
    });
    editorInstance.Commands.add('set-device-mobile', {
      run: (editor) => editor.setDevice('Mobile portrait'),
    });

    setEditor(editorInstance);
    initializeEditorStyles(editorInstance);

    // Load current homepage content
    editorInstance.on('load', async () => {
      try {
        const htmlResponse = await fetch('/static/homepage.html');
        const cssResponse = await fetch('/static/homepage.css');
        const rawHtml = await htmlResponse.text();
        const rawCss = await cssResponse.text();

        loadContentIntoEditor(editorInstance, rawHtml, rawCss);
      } catch (err) {
        console.error('Failed to load content:', err);
      }
    });
  };

  const initializeEditorStyles = (editorInstance: any) => {
    // Apply dark theme and overlay styles
    const overlayStyles = document.createElement('style');
    overlayStyles.innerHTML = `
      /* Overlay Editor Styles */
      .overlay-editor-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: transparent;
        pointer-events: none;
      }

      .overlay-editor-container > * {
        pointer-events: auto;
      }

      .gjs-cv-canvas {
        background: transparent !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 1 !important;
      }

      .gjs-frame {
        background: transparent !important;
        border: none !important;
        width: 100% !important;
        height: 100% !important;
      }

      .gjs-frame-wrapper {
        padding: 0 !important;
        background: transparent !important;
      }

      /* Editor panels styling */
      .editor-panels {
        position: fixed;
        top: 80px;
        right: 20px;
        width: 300px;
        height: calc(100vh - 100px);
        background: rgba(0, 0, 0, 0.95);
        border: 1px solid rgba(96, 165, 250, 0.3);
        border-radius: 8px;
        backdrop-filter: blur(10px);
        z-index: 10000;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .editor-panels.hidden {
        transform: translateX(320px);
      }

      .panel-tabs {
        display: flex;
        background: rgba(96, 165, 250, 0.1);
        border-bottom: 1px solid rgba(96, 165, 250, 0.3);
      }

      .panel-tab {
        flex: 1;
        padding: 12px 8px;
        text-align: center;
        background: transparent;
        border: none;
        color: #60A5FA;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 12px;
      }

      .panel-tab:hover {
        background: rgba(96, 165, 250, 0.2);
      }

      .panel-tab.active {
        background: rgba(96, 165, 250, 0.3);
        color: white;
      }

      .panel-content {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }

      /* GrapesJS component styling */
      .gjs-selected {
        outline: 2px solid #60A5FA !important;
        outline-offset: 2px !important;
      }

      .gjs-hovered {
        outline: 1px dashed #60A5FA !important;
        outline-offset: 1px !important;
      }

      .gjs-toolbar {
        background: rgba(0, 0, 0, 0.9) !important;
        border: 1px solid rgba(96, 165, 250, 0.5) !important;
        border-radius: 6px !important;
        backdrop-filter: blur(10px) !important;
      }

      .gjs-toolbar-item {
        color: #60A5FA !important;
        background: transparent !important;
        border: none !important;
        padding: 8px !important;
        margin: 2px !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        transition: all 0.2s !important;
      }

      .gjs-toolbar-item:hover {
        background: rgba(96, 165, 250, 0.2) !important;
        color: white !important;
      }

      /* Block manager styling */
      .gjs-block {
        background: rgba(0, 0, 0, 0.8) !important;
        border: 1px solid rgba(96, 165, 250, 0.3) !important;
        color: white !important;
        border-radius: 4px !important;
        margin: 4px 0 !important;
        padding: 8px !important;
        cursor: pointer !important;
        transition: all 0.2s !important;
      }

      .gjs-block:hover {
        border-color: #60A5FA !important;
        background: rgba(96, 165, 250, 0.1) !important;
      }

      .gjs-block-label {
        color: #60A5FA !important;
        font-size: 11px !important;
        margin-top: 4px !important;
      }

      /* Style manager styling */
      .gjs-sm-sector {
        background: rgba(0, 0, 0, 0.5) !important;
        border: 1px solid rgba(96, 165, 250, 0.2) !important;
        margin-bottom: 8px !important;
        border-radius: 4px !important;
      }

      .gjs-sm-title {
        background: rgba(96, 165, 250, 0.1) !important;
        color: #60A5FA !important;
        padding: 8px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
      }

      .gjs-sm-property {
        background: transparent !important;
        color: white !important;
        border-bottom: 1px solid rgba(96, 165, 250, 0.1) !important;
        padding: 6px 8px !important;
      }

      .gjs-field {
        background: rgba(0, 0, 0, 0.7) !important;
        border: 1px solid rgba(96, 165, 250, 0.3) !important;
        color: white !important;
        border-radius: 3px !important;
        padding: 4px 6px !important;
        font-size: 11px !important;
      }

      .gjs-field:focus {
        border-color: #60A5FA !important;
        outline: none !important;
      }

      /* Layer manager styling */
      .gjs-layer-item {
        background: transparent !important;
        color: white !important;
        border-bottom: 1px solid rgba(96, 165, 250, 0.1) !important;
        padding: 6px 8px !important;
        font-size: 11px !important;
      }

      .gjs-layer-item:hover {
        background: rgba(96, 165, 250, 0.1) !important;
      }

      .gjs-layer-item.gjs-layer-selected {
        background: rgba(96, 165, 250, 0.2) !important;
      }
    `;
    document.head.appendChild(overlayStyles);
  };

  const loadContentIntoEditor = (editorInstance: any, html: string, css: string) => {
    // Extract body content from the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const bodyContent = doc.body.innerHTML;

    // Set the CSS styles
    editorInstance.setStyle(css);
    
    // Set the HTML components
    editorInstance.setComponents(bodyContent);

    // Clean up any animation/transform styles that might interfere
    setTimeout(() => {
      const frame = editorInstance.Canvas.getFrame();
      const frameDoc = frame?.contentDocument;
      if (frameDoc) {
        const elements = frameDoc.body.querySelectorAll('*');
        elements.forEach((el: HTMLElement) => {
          const style = el.getAttribute('style');
          if (style) {
            const cleanStyle = style
              .split(';')
              .filter(rule => {
                const prop = rule.split(':')[0]?.trim().toLowerCase();
                return !['opacity', 'transform', 'visibility', 'display'].includes(prop);
              })
              .join(';');
            
            if (cleanStyle) {
              el.setAttribute('style', cleanStyle);
            } else {
              el.removeAttribute('style');
            }
          }
        });
      }
    }, 100);
  };

  const saveLocally = () => {
    if (!editor) return;
    
    const html = editor.getHtml();
    const css = editor.getCss();
    
    localStorage.setItem('editor_html', html);
    localStorage.setItem('editor_css', css);
    
    setMessage({ type: 'success', text: 'Changes saved locally!' });
  };

  const pushToGitHub = async () => {
    if (!editor) return;

    try {
      setIsLoading(true);
      setMessage(null);

      const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/static/homepage.css" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
    <title>Homepage</title>
  </head>
  <body style="background: black; color: white; font-family: 'Playfair Display', serif; margin: 0;">
    ${editor.getHtml()}
  </body>
</html>`;

      const css = editor.getCss();
      const [owner, repo] = settings.github_repo.split('/');

      // Get current file SHAs
      const [htmlFileResponse, cssFileResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/public/static/homepage.html`, {
          headers: {
            'Authorization': `token ${settings.github_token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }),
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/public/static/homepage.css`, {
          headers: {
            'Authorization': `token ${settings.github_token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }),
      ]);

      const htmlSha = htmlFileResponse.ok ? (await htmlFileResponse.json()).sha : undefined;
      const cssSha = cssFileResponse.ok ? (await cssFileResponse.json()).sha : undefined;

      // Update both files
      const [htmlUpdateResponse, cssUpdateResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/public/static/homepage.html`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${settings.github_token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Update homepage HTML via overlay editor`,
            content: btoa(html),
            sha: htmlSha,
            committer: {
              name: 'Overlay Editor',
              email: user?.email || 'editor@manifestillusions.com',
            },
          }),
        }),
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/public/static/homepage.css`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${settings.github_token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Update homepage CSS via overlay editor`,
            content: btoa(css),
            sha: cssSha,
            committer: {
              name: 'Overlay Editor',
              email: user?.email || 'editor@manifestillusions.com',
            },
          }),
        })
      ]);

      if (!htmlUpdateResponse.ok || !cssUpdateResponse.ok) {
        throw new Error('Failed to update files on GitHub');
      }

      setMessage({ type: 'success', text: 'Changes pushed to GitHub successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to push to GitHub' });
    } finally {
      setIsLoading(false);
    }
  };

  const [activePanel, setActivePanel] = useState('blocks');

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="overlay-editor-container">
          {/* Floating Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[10001] bg-black/90 border border-blue-400/30 rounded-lg p-4 backdrop-blur-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-blue-400">Overlay Editor</h2>
                {message && (
                  <div className={`px-3 py-1 rounded text-sm ${
                    message.type === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {message.text}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPanels(!showPanels)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                  title={showPanels ? 'Hide Panels' : 'Show Panels'}
                >
                  {showPanels ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={saveLocally}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded hover:bg-green-500/30 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                
                <button
                  onClick={pushToGitHub}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded hover:bg-purple-500/30 transition-colors disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Push</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Editor Panels */}
          <AnimatePresence>
            {showPanels && (
              <motion.div
                ref={panelsRef}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="editor-panels"
              >
                <div className="panel-tabs">
                  <button
                    className={`panel-tab ${activePanel === 'blocks' ? 'active' : ''}`}
                    onClick={() => setActivePanel('blocks')}
                  >
                    <Square className="w-4 h-4 mx-auto mb-1" />
                    Blocks
                  </button>
                  <button
                    className={`panel-tab ${activePanel === 'layers' ? 'active' : ''}`}
                    onClick={() => setActivePanel('layers')}
                  >
                    <Layers className="w-4 h-4 mx-auto mb-1" />
                    Layers
                  </button>
                  <button
                    className={`panel-tab ${activePanel === 'styles' ? 'active' : ''}`}
                    onClick={() => setActivePanel('styles')}
                  >
                    <Palette className="w-4 h-4 mx-auto mb-1" />
                    Styles
                  </button>
                </div>
                
                <div className="panel-content">
                  {activePanel === 'blocks' && <div id="blocks-panel"></div>}
                  {activePanel === 'layers' && <div id="layers-panel"></div>}
                  {activePanel === 'styles' && <div id="styles-panel"></div>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GrapesJS Editor Container */}
          <div ref={editorRef} className="gjs-editor-container" />
        </div>
      )}
    </AnimatePresence>
  );
};

export default OverlayEditor;