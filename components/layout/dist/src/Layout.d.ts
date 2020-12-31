import * as React from "react";
import { ViewProps } from "react-native";
import Block from "./Block";
interface Layout extends ViewProps, Partial<Block> {
    children?: JSX.Element | JSX.Element[];
    wrapper?: React.ComponentType;
    wrappers?: Block[];
    gap?: number;
}
declare const Layout: ({ children, wrapper: Wrapper, wrappers, gap, ...props }: Layout) => JSX.Element;
export default Layout;
