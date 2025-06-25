// src/components/editorStyles.ts
import { Editor } from 'grapesjs';

export const initialiseEditorStyles = (editor: Editor) => {
  editor.on('canvas:frame:load', () => {
    const frame = editor.Canvas.getFrame();
    const doc = frame?.contentDocument;
    const head = doc?.head;
    const body = doc?.body;
    if (!doc || !head || !body) return;

    appendStylesheet(head, '/static/homepage.css');
    appendStylesheet(head, 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
    appendStylesheet(head, 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

    const forceStyles = doc.createElement('style');
    forceStyles.innerHTML = `
      html, body {
        min-height: 100vh !important;
        background: black !important;
        color: white !important;
        font-family: 'Playfair Display', serif !important;
        margin: 0 !important;
        overflow: visible !important;
        isolation: isolate !important;
      }

      #wrapper, .gjs-cv-canvas, .gjs-frame-wrapper, .gjs-frame {
        all: unset !important;
        background: black !important;
        color: white !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        overflow: visible !important;
        visibility: visible !important;
      }

      *, *::before, *::after {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        animation: none !important;
        transition: none !important;
      }

      [style*="opacity"] {
        opacity: 1 !important;
      }
      [style*="transform"] {
        transform: none !important;
      }
      [style*="visibility"] {
        visibility: visible !important;
      }

      /* GrapesJS Editor Styles */
      .gjs-selected {
        outline: 2px solid #60A5FA !important;
      }

      .gjs-hovered {
        outline: 1px dashed #60A5FA !important;
      }

      .gjs-toolbar {
        background: rgba(0, 0, 0, 0.9) !important;
        border: 1px solid rgba(96, 165, 250, 0.3) !important;
        border-radius: 4px !important;
      }

      .gjs-toolbar-item {
        color: #60A5FA !important;
        background: transparent !important;
        border: none !important;
        padding: 8px !important;
        margin: 2px !important;
        border-radius: 4px !important;
        cursor: pointer !important;
      }

      .gjs-toolbar-item:hover {
        background: rgba(96, 165, 250, 0.2) !important;
      }

      /* Custom component styles */
      .manifest-hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: linear-gradient(to bottom, #312e81, #581c87, #000000);
      }

      .manifest-services {
        padding: 5rem 1.5rem;
        background: rgba(0, 0, 0, 0.5);
      }

      .manifest-contact {
        padding: 5rem 1.5rem;
        background: #000000;
      }
    `;
    head.appendChild(forceStyles);
  });

  // Add custom CSS for the editor interface
  const outerStyles = document.createElement('style');
  outerStyles.innerHTML = `
    /* GrapesJS Dark Theme */
    .gjs-one-bg {
      background-color: #1a1a1a !important;
    }

    .gjs-two-color {
      color: #60A5FA !important;
    }

    .gjs-three-bg {
      background-color: #2563EB !important;
    }

    .gjs-four-color,
    .gjs-four-color-h:hover {
      color: #FFFFFF !important;
    }

    .gjs-pn-btn.gjs-pn-active {
      background-color: #2563EB !important;
    }

    .gjs-pn-panel {
      border-color: rgba(96, 165, 250, 0.3) !important;
      background-color: rgba(0, 0, 0, 0.8) !important;
    }

    .gjs-cv-canvas {
      background-color: #000000 !important;
    }

    .gjs-frame-wrapper {
      padding: 1rem !important;
    }

    .gjs-block {
      background-color: rgba(0, 0, 0, 0.8) !important;
      border: 1px solid rgba(96, 165, 250, 0.3) !important;
      color: #FFFFFF !important;
      border-radius: 4px !important;
      margin: 4px !important;
      padding: 8px !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }

    .gjs-block:hover {
      border-color: rgba(96, 165, 250, 0.6) !important;
      background-color: rgba(96, 165, 250, 0.1) !important;
    }

    .gjs-block-label {
      color: #60A5FA !important;
      font-size: 12px !important;
      text-align: center !important;
      margin-top: 4px !important;
    }

    .gjs-block-category {
      background-color: rgba(0, 0, 0, 0.9) !important;
      color: #60A5FA !important;
      border-bottom: 1px solid rgba(96, 165, 250, 0.3) !important;
      padding: 8px !important;
      font-weight: 600 !important;
    }

    .gjs-layer-item {
      background-color: transparent !important;
      color: #FFFFFF !important;
      border-bottom: 1px solid rgba(96, 165, 250, 0.1) !important;
    }

    .gjs-layer-item:hover {
      background-color: rgba(96, 165, 250, 0.1) !important;
    }

    .gjs-layer-item.gjs-layer-selected {
      background-color: rgba(96, 165, 250, 0.2) !important;
    }

    .gjs-sm-sector {
      background-color: rgba(0, 0, 0, 0.8) !important;
      border: 1px solid rgba(96, 165, 250, 0.3) !important;
      margin-bottom: 8px !important;
      border-radius: 4px !important;
    }

    .gjs-sm-title {
      background-color: rgba(96, 165, 250, 0.1) !important;
      color: #60A5FA !important;
      padding: 8px !important;
      font-weight: 600 !important;
    }

    .gjs-sm-property {
      background-color: transparent !important;
      color: #FFFFFF !important;
      border-bottom: 1px solid rgba(96, 165, 250, 0.1) !important;
      padding: 4px 8px !important;
    }

    .gjs-sm-property .gjs-sm-label {
      color: #60A5FA !important;
    }

    .gjs-field {
      background-color: rgba(0, 0, 0, 0.5) !important;
      border: 1px solid rgba(96, 165, 250, 0.3) !important;
      color: #FFFFFF !important;
      border-radius: 4px !important;
      padding: 4px 8px !important;
    }

    .gjs-field:focus {
      border-color: #60A5FA !important;
      outline: none !important;
    }

    /* Panel styling */
    #blocks-panel,
    #layers-panel,
    #styles-panel,
    #traits-panel {
      background-color: transparent !important;
      color: #FFFFFF !important;
      padding: 8px !important;
      height: 100% !important;
      overflow-y: auto !important;
    }

    /* Scrollbar styling */
    #blocks-panel::-webkit-scrollbar,
    #layers-panel::-webkit-scrollbar,
    #styles-panel::-webkit-scrollbar,
    #traits-panel::-webkit-scrollbar {
      width: 8px;
    }

    #blocks-panel::-webkit-scrollbar-track,
    #layers-panel::-webkit-scrollbar-track,
    #styles-panel::-webkit-scrollbar-track,
    #traits-panel::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 4px;
    }

    #blocks-panel::-webkit-scrollbar-thumb,
    #layers-panel::-webkit-scrollbar-thumb,
    #styles-panel::-webkit-scrollbar-thumb,
    #traits-panel::-webkit-scrollbar-thumb {
      background: rgba(96, 165, 250, 0.3);
      border-radius: 4px;
    }

    #blocks-panel::-webkit-scrollbar-thumb:hover,
    #layers-panel::-webkit-scrollbar-thumb:hover,
    #styles-panel::-webkit-scrollbar-thumb:hover,
    #traits-panel::-webkit-scrollbar-thumb:hover {
      background: rgba(96, 165, 250, 0.5);
    }
  `;
  document.head.appendChild(outerStyles);
};

function appendStylesheet(head: HTMLHeadElement, href: string) {
  if (head.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  head.appendChild(link);
}