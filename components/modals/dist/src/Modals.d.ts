import * as React from "react";
import { ArrayLink } from "@rn-cantons/react-link";
export declare const ModalItem: ({ value, visibleLink, close: Close, keyboardHeight, children, }: any) => JSX.Element;
export declare type Modals = ArrayLink<JSX.Element>;
export declare const ModalsContext: React.Context<Modals>;
export declare const useModals: () => Modals;
declare const Modals: ({ children, close, keyboardHeight, ...props }: {
    [x: string]: any;
    children: any;
    close: any;
    keyboardHeight: any;
}) => JSX.Element;
export default Modals;
