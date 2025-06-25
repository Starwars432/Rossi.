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
    `;
    head.appendChild(forceStyles);
  });

  const outerStyles = document.createElement('style');
  outerStyles.innerHTML = `
    .gjs-cv-canvas {
      background-color: black !important;
    }
    .gjs-frame-wrapper {
      padding: 1rem !important;
      overflow: visible !important;
    }
    .gjs-frame {
      background: transparent !important;
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
