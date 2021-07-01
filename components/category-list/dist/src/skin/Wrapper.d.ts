/// <reference types="react" />
interface Wrapper {
    isOpen: boolean;
    fade: JSX.Element;
    bottomSheet: JSX.Element;
}
declare const Wrapper: ({ fade, bottomSheet, }: Wrapper) => JSX.Element;
export default Wrapper;
