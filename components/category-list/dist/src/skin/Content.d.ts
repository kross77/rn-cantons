/// <reference types="react" />
interface Content {
    isOpen: boolean;
    openPopup: () => void;
    height: number;
    children: JSX.Element | JSX.Element[];
}
declare const Content: ({ isOpen, openPopup, height, children }: Content) => JSX.Element;
export default Content;
