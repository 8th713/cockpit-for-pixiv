declare class IntersectionObserverEntry {
  +time: number;
  +rootBounds: ClientRect;
  +boundingClientRect: ClientRect;
  +intersectionRect: ClientRect;
  +isIntersecting: boolean;
  +intersectionRatio: number;
  +target: Element;
}

declare type IntersectionObserverInit = {
  root?: Element,
  rootMargin?: string,
  threshold?: number | number[],
}

declare type IntersectionObserverCallback = (
  changes: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void

declare class IntersectionObserver {
  +root: Element;
  +rootMargin: string;
  +thresholds: number[];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ): IntersectionObserver;

  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
  takeRecords(): IntersectionObserverEntry[];
}
