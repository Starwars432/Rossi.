declare module 'grapesjs' {
  export interface Editor {
    BlockManager: BlockManager;
    DomComponents: DomComponents;
    Commands: Commands;
    Pages: {
      getSelected(): Page;
      getAll(): Page[];
      add(options: PageOptions): Page;
      remove(page: Page | string): void;
    };
    Canvas: {
      getDocument(): Document;
      getWindow(): Window;
      getFrame(): HTMLIFrameElement & {
        contentDocument: Document;
        contentWindow: Window;
        getBody(): HTMLElement;
      };
    };
    Panels: {
      getPanel(id: string): Panel;
    };
    Modal: {
      setTitle(title: string): Modal;
      setContent(content: string): Modal;
      open(): Modal;
      close(): Modal;
    };
    getHtml(): string;
    getCss(): string;
    setComponents(components: string | Component[]): void;
    setStyle(style: string | object): void;
    setDevice(device: string): void;
    getComponents(): Component[];
    on(event: string, callback: Function): void;
    destroy(): void;
  }

  interface Modal {
    setTitle(title: string): Modal;
    setContent(content: string): Modal;
    open(): Modal;
    close(): Modal;
  }

  interface Commands {
    add(id: string, command: CommandOptions): void;
    get(id: string): Command;
    run(id: string, options?: any): any;
  }

  interface CommandOptions {
    run: (editor: Editor, sender?: any, options?: any) => any;
    stop?: (editor: Editor, sender?: any, options?: any) => any;
  }

  interface Command {
    run: (editor: Editor, sender?: any, options?: any) => any;
    stop?: (editor: Editor, sender?: any, options?: any) => any;
  }

  interface Page {
    id: string;
    name: string;
    component: string;
    get(property: string): any;
    set(property: string, value: any): void;
  }

  interface PageOptions {
    id: string;
    name: string;
    component: string;
    styles?: string;
  }

  interface Panel {
    get(property: string): {
      each(callback: (btn: any) => void): void;
    };
  }

  interface BlockManager {
    add(id: string, options: BlockOptions): void;
    get(id: string): Block;
    getAll(): Block[];
  }

  interface DomComponents {
    addType(type: string, options: ComponentOptions): void;
    getComponents(): Component[];
    getWrapper(): Component;
  }

  interface Block {
    id: string;
    label: string;
    content: string | object;
    category?: string;
    attributes?: Record<string, any>;
  }

  interface BlockOptions {
    label?: string;
    category?: string;
    content: string | {
      type: string;
      content?: string;
      style?: Record<string, any>;
      classes?: string[];
    };
    select?: boolean;
    activate?: boolean;
  }

  interface Component {
    getClasses(): string[];
    getEl(): HTMLElement;
    get(property: string): any;
    set(property: string, value: any): void;
    getId(): string;
    getType(): string;
    getAttributes(): Record<string, any>;
    getStyle(): Record<string, any>;
    remove(): void;
    toHTML(): string;
  }

  interface ComponentOptions {
    isComponent?: (el: HTMLElement) => boolean;
    model?: {
      defaults?: Record<string, any>;
    };
    view?: {
      onRender?: () => void;
    };
  }

  const grapesjs: {
    init(options: {
      container: string | HTMLElement;
      height?: string | number;
      width?: string | number;
      components?: string | Component[];
      style?: string | object[];
      plugins?: any[];
      pageManager?: {
        pages?: PageOptions[];
      };
      deviceManager?: {
        devices?: Array<{
          name: string;
          width: string;
          widthMedia?: string;
        }>;
      };
      styleManager?: {
        sectors?: Array<{
          name: string;
          open?: boolean;
          buildProps?: string[];
        }>;
      };
      canvas?: {
        styles?: string[];
        scripts?: string[];
      };
      storageManager?: boolean | object;
      blockManager?: {
        appendTo?: string;
      };
      layerManager?: {
        appendTo?: string;
      };
      traitManager?: {
        appendTo?: string;
      };
      selectorManager?: {
        appendTo?: string;
      };
      panels?: {
        defaults?: Array<{
          id: string;
          el?: string;
          buttons?: Array<{
            id: string;
            label?: string;
            className?: string;
            command?: string | Function;
            context?: string;
            active?: boolean;
            togglable?: boolean;
          }>;
        }>;
      };
    }): Editor;
  };

  export default grapesjs;
}

// Plugin type declarations
declare module 'grapesjs-preset-webpage' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-blocks-basic' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-plugin-forms' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-component-countdown' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-plugin-export' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-tabs' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-tooltip' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-typed' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-style-bg' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-style-filter' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-style-gradient' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-touch' {
  const plugin: any;
  export default plugin;
}

declare module 'grapesjs-parser-postcss' {
  const plugin: any;
  export default plugin;
}