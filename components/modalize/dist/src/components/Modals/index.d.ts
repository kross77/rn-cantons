import * as React from "react";
import { ArrayLink } from "@rn-cantons/react-link";
export declare const ModalItem: ({ openLink, children, uid, ...props }: {
    [x: string]: any;
    openLink?: import("@rn-cantons/react-link").SingleLink<boolean> | undefined;
    children: any;
    uid: any;
}) => JSX.Element;
export declare type Index = ArrayLink<React.ComponentType<any & {
    onLayout: Function;
}>>;
export declare const ModalsContext: React.Context<Index>;
export declare const useModals: () => Index;
export declare const UseModals: React.Consumer<Index>;
declare const Modals: ({ children, ...props }: any) => JSX.Element;
export default Modals;
