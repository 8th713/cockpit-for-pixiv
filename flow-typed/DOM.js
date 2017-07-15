declare class HTMLDialogElement extends HTMLElement {
  open: boolean;
  returnValue: string;
  show(arg?: Element | MouseEvent): void;
  showModal(arg?: Element | MouseEvent): void;
  close(value?: string): void;
}

declare class HTMLImageElement extends HTMLElement {
  alt: string;
  src: string;
  srcset: string;
  sizes: string;
  crossOrigin: ?string;
  useMap: string;
  isMap: boolean;
  width: number;
  height: number;
  +naturalHeight: number;
  +naturalWidth: number;
  +complete: boolean;
  +currentSrc: string;
  +x: number;
  +y: number;
}

declare class RadioNodeList extends NodeList {
  value: string;
}
