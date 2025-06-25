import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Download, Upload, Settings, Eye, EyeOff, Layers, Palette, Type, Image, Grid, Code } from 'lucide-react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import * as presetWebpage from 'grapesjs-preset-webpage';
import * as blocksBasic from 'grapesjs-blocks-basic';
import * as pluginForms from 'grapesjs-plugin-forms';
import * as componentCountdown from 'grapesjs-component-countdown';
import * as pluginExport from 'grapesjs-plugin-export';
import * as tabsPlugin from 'grapesjs-tabs';
import * as tooltipPlugin from 'grapesjs-tooltip';
import * as typedPlugin from 'grapesjs-typed';
import * as styleBg from 'grapesjs-style-bg';
import * as styleFilter from 'grapesjs-style-filter';
import * as styleGradient from 'grapesjs-style-gradient';
import * as touchPlugin from 'grapesjs-touch';
import * as parserPostcss from 'grapesjs-parser-postcss';
import { initialiseEditorStyles } from './editorStyles';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

// Make grapesjs globally available for plugins
(window as any).grapesjs = grapesjs;

interface AdminEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminEditor: React.FC<AdminEditorProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [editor, setEditor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [settings, setSettings] = useState({ 
    github_token: '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', 
    github_repo: 'Starwars432/Rossi' 
  });
  const [showSettings, setShowSettings] = useState(false);
  const [activePanel, setActivePanel] = useState<string>('blocks');

  useEffect(() => {
    if (isOpen && !editor) {
      initializeEditor();
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

  const saveSettings = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('editor_settings')
        .upsert({
          user_id: user.id,
          github_token: settings.github_token,
          github_repo: settings.github_repo,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setShowSettings(false);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setIsLoading(false);
    }
  };

  const initializeEditor = () => {
    const editorInstance = grapesjs.init({
      container: '#admin-gjs',
      height: 'calc(100vh - 120px)',
      width: '100%',
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 3,
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '',
          },
          {
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            name: 'Mobile',
            width: '320px',
            widthMedia: '768px',
          },
        ],
      },
      canvas: {
        styles: [
          '/static/homepage.css',
          'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        ],
        scripts: [
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
        ],
      },
      styleManager: {
        sectors: [
          {
            name: 'General',
            open: false,
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
          },
          {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
          },
          {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
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
      blockManager: {
        appendTo: '#blocks-panel',
      },
      layerManager: {
        appendTo: '#layers-panel',
      },
      traitManager: {
        appendTo: '#traits-panel',
      },
      selectorManager: {
        appendTo: '#styles-panel',
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
              {
                id: 'export',
                className: 'btn-open-export',
                label: '<i class="fa fa-code"></i>',
                command: 'export-template',
                context: 'export-template',
              },
              {
                id: 'show-json',
                className: 'btn-show-json',
                label: '<i class="fa fa-file-code"></i>',
                context: 'show-json',
                command(editor: any) {
                  editor.Modal.setTitle('Components JSON')
                    .setContent(`<textarea style="width:100%; height: 250px;">${JSON.stringify(editor.getComponents())}</textarea>`)
                    .open();
                },
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
      plugins: [
        (editor: any) => presetWebpage.default(editor, {
          blocks: ['link-block', 'quote', 'text-basic'],
          modalImportTitle: 'Import Template',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function(editor: any) {
            return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
          },
        }),
        (editor: any) => blocksBasic.default(editor, {
          blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video', 'map'],
          flexGrid: 1,
        }),
        (editor: any) => pluginForms.default(editor, {
          blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'],
        }),
        (editor: any) => componentCountdown.default(editor, {}),
        (editor: any) => pluginExport.default(editor, {}),
        (editor: any) => tabsPlugin.default(editor, {}),
        (editor: any) => tooltipPlugin.default(editor, {}),
        (editor: any) => typedPlugin.default(editor, {}),
        (editor: any) => styleBg.default(editor, {}),
        (editor: any) => styleFilter.default(editor, {}),
        (editor: any) => styleGradient.default(editor, {}),
        (editor: any) => touchPlugin.default(editor, {}),
        (editor: any) => parserPostcss.default(editor, {}),
      ],
    });

    // Add custom commands
    editorInstance.Commands.add('set-device-desktop', {
      run: (editor: any) => editor.setDevice('Desktop')
    });
    editorInstance.Commands.add('set-device-tablet', {
      run: (editor: any) => editor.setDevice('Tablet')
    });
    editorInstance.Commands.add('set-device-mobile', {
      run: (editor: any) => editor.setDevice('Mobile')
    });

    // Add custom blocks
    editorInstance.BlockManager.add('manifest-hero', {
      label: 'Hero Section',
      category: 'Manifest Illusions',
      content: `
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
          <div class="relative z-10 text-center">
            <h1 class="text-8xl italic text-white mb-4">Your Brand</h1>
            <h2 class="text-8xl italic text-blue-400">Your Vision</h2>
            <p class="text-xl text-gray-300 mt-8 mb-12 max-w-3xl mx-auto">Transform your ideas into stunning digital experiences</p>
            <div class="flex justify-center gap-6">
              <button class="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all">Get Started</button>
              <button class="bg-blue-500/10 border border-blue-400/30 text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-500/20 transition-all">Learn More</button>
            </div>
          </div>
        </section>
      `,
    });

    editorInstance.BlockManager.add('manifest-services', {
      label: 'Services Grid',
      category: 'Manifest Illusions',
      content: `
        <section class="py-20 px-6">
          <div class="max-w-7xl mx-auto">
            <div class="mb-12 text-center">
              <h2 class="text-4xl font-light text-blue-400 mb-2">Our Services</h2>
              <p class="text-gray-400">Comprehensive solutions for your brand</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
                <div class="mb-4 text-blue-400">
                  <i class="fas fa-palette text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-blue-400">Design</h3>
                <p class="text-gray-300">Beautiful, modern designs that capture your brand essence.</p>
              </div>
              <div class="bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
                <div class="mb-4 text-blue-400">
                  <i class="fas fa-code text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-blue-400">Development</h3>
                <p class="text-gray-300">Cutting-edge web development with modern technologies.</p>
              </div>
              <div class="bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all">
                <div class="mb-4 text-blue-400">
                  <i class="fas fa-rocket text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-blue-400">Marketing</h3>
                <p class="text-gray-300">Strategic digital marketing to grow your business.</p>
              </div>
            </div>
          </div>
        </section>
      `,
    });

    editorInstance.BlockManager.add('manifest-contact', {
      label: 'Contact Form',
      category: 'Manifest Illusions',
      content: `
        <section class="py-20 px-6 bg-black">
          <div class="max-w-7xl mx-auto">
            <div class="mb-12 text-center">
              <h2 class="text-4xl font-light text-blue-400 mb-2">Get in Touch</h2>
              <p class="text-gray-400">Ready to start your project? Let's talk!</p>
            </div>
            <div class="max-w-2xl mx-auto">
              <form class="space-y-6">
                <input type="text" placeholder="Your Name" class="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none text-white">
                <input type="email" placeholder="Your Email" class="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none text-white">
                <textarea placeholder="Your Message" rows="6" class="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/30 focus:border-blue-400 focus:outline-none text-white"></textarea>
                <button type="submit" class="w-full bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      `,
    });

    setEditor(editorInstance);
    initialiseEditorStyles(editorInstance);

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

  const loadContentIntoEditor = (editorInstance: any, html: string, css: string) => {
    const innerHtml = html.includes('<body')
      ? html.replace(/^[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*$/i, '')
      : html;

    editorInstance.setStyle(css);
    editorInstance.setComponents(innerHtml);

    setTimeout(() => {
      const doc = editorInstance.Canvas.getFrame()?.contentDocument;
      const elements = doc?.body?.querySelectorAll('*');
      elements?.forEach((el: HTMLElement) => {
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
    }, 100);
  };

  const pullFromGitHub = async () => {
    try {
      setIsLoading(true);
      setMessage(null);

      const [owner, repo] = settings.github_repo.split('/');
      const [htmlResponse, cssResponse] = await Promise.all([
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
        })
      ]);

      if (!htmlResponse.ok || !cssResponse.ok) {
        throw new Error('Failed to fetch files from GitHub');
      }

      const [htmlData, cssData] = await Promise.all([
        htmlResponse.json(),
        cssResponse.json()
      ]);

      const htmlContent = atob(htmlData.content);
      const cssContent = atob(cssData.content);

      if (editor) {
        loadContentIntoEditor(editor, htmlContent, cssContent);
      }

      setMessage({ type: 'success', text: 'Content pulled from GitHub successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to pull from GitHub' });
    } finally {
      setIsLoading(false);
    }
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
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
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
            message: `Update homepage HTML via visual editor`,
            content: btoa(html),
            sha: htmlSha,
            committer: {
              name: 'Visual Editor',
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
            message: `Update homepage CSS via visual editor`,
            content: btoa(css),
            sha: cssSha,
            committer: {
              name: 'Visual Editor',
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

  const saveLocally = () => {
    if (!editor) return;
    
    const html = editor.getHtml();
    const css = editor.getCss();
    
    // Save to localStorage for now
    localStorage.setItem('editor_html', html);
    localStorage.setItem('editor_css', css);
    
    setMessage({ type: 'success', text: 'Changes saved locally!' });
  };

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="bg-black/90 border-b border-blue-400/30 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-blue-400">Visual Editor</h2>
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
                onClick={saveLocally}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded hover:bg-green-500/30 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              
              <button
                onClick={pullFromGitHub}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded hover:bg-blue-500/30 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Pull</span>
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
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-black/80 border-b border-blue-400/20 p-4"
              >
                <div className="max-w-2xl mx-auto space-y-4">
                  <h3 className="text-lg text-blue-400 mb-4">GitHub Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">GitHub Token</label>
                      <input
                        type="password"
                        value={settings.github_token}
                        onChange={(e) => setSettings({ ...settings, github_token: e.target.value })}
                        className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-white focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Repository</label>
                      <input
                        type="text"
                        value={settings.github_repo}
                        onChange={(e) => setSettings({ ...settings, github_repo: e.target.value })}
                        className="w-full px-3 py-2 bg-black/50 border border-blue-400/30 rounded text-white focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={saveSettings}
                      disabled={isLoading}
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Settings'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editor Layout */}
          <div className="flex h-full">
            {/* Left Sidebar */}
            <div className="w-80 bg-black/80 border-r border-blue-400/30 flex flex-col">
              {/* Panel Tabs */}
              <div className="flex border-b border-blue-400/30">
                <button
                  onClick={() => setActivePanel('blocks')}
                  className={`flex-1 p-3 text-sm flex items-center justify-center space-x-2 transition-colors ${
                    activePanel === 'blocks' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-blue-400'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span>Blocks</span>
                </button>
                <button
                  onClick={() => setActivePanel('layers')}
                  className={`flex-1 p-3 text-sm flex items-center justify-center space-x-2 transition-colors ${
                    activePanel === 'layers' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-blue-400'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Layers</span>
                </button>
                <button
                  onClick={() => setActivePanel('styles')}
                  className={`flex-1 p-3 text-sm flex items-center justify-center space-x-2 transition-colors ${
                    activePanel === 'styles' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-blue-400'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>Styles</span>
                </button>
                <button
                  onClick={() => setActivePanel('traits')}
                  className={`flex-1 p-3 text-sm flex items-center justify-center space-x-2 transition-colors ${
                    activePanel === 'traits' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-blue-400'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  <span>Traits</span>
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto">
                <div id="blocks-panel" className={activePanel === 'blocks' ? 'block' : 'hidden'} />
                <div id="layers-panel" className={activePanel === 'layers' ? 'block' : 'hidden'} />
                <div id="styles-panel" className={activePanel === 'styles' ? 'block' : 'hidden'} />
                <div id="traits-panel" className={activePanel === 'traits' ? 'block' : 'hidden'} />
              </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col">
              {/* Toolbar */}
              <div className="bg-black/80 border-b border-blue-400/30 p-2 flex items-center justify-between">
                <div className="panel__devices flex space-x-2"></div>
                <div className="panel__basic-actions flex space-x-2"></div>
              </div>

              {/* Canvas */}
              <div className="flex-1">
                <div id="admin-gjs" className="h-full" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminEditor;