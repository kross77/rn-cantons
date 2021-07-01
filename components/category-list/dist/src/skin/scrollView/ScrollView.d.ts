/// <reference types="react" />
interface ScrollViewSkin {
    hideHeader: () => void;
    showHeader: () => void;
}
declare const ScrollViewSkin: ({ hideHeader, showHeader, ...props }: ScrollViewSkin) => JSX.Element;
export default ScrollViewSkin;
