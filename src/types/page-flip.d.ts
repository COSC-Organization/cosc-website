declare module "page-flip" {
  export interface PageFlipOptions {
    width?: number;
    height?: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    usePortrait?: boolean;
    startPage?: number;
    autoSize?: boolean;
    maxAngle?: number;
    flippingTime?: number;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions);
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    destroy(): void;
    flip(pageIndex: number, corner?: "top" | "bottom"): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    update(): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    on(eventName: string, callback: (...args: unknown[]) => void): void;
    off(eventName: string): void;
  }
}
