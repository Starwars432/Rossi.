import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Download, Upload, Settings, Eye, EyeOff } from 'lucide-react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import * as presetWebpage from 'grapesjs-preset-webpage';
import { initialiseEditorStyles } from './editorStyles';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

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
        ],
      },
      plugins: [
        (e) => presetWebpage.default(e, {
          blocks: ['text', 'link', 'image', 'video', 'map'],
        }),
      ],
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

          {/* Editor Container */}
          <div className="flex-1 h-full">
            <div id="admin-gjs" className="h-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminEditor;