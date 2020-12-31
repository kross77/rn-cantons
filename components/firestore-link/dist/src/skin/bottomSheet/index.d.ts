import Content from './Content';
import Fade from './Fade';
import Wrapper from './Wrapper';
import React from "react";
interface BottomSheetSkin {
    Content: React.ComponentType<Content>;
    Fade: React.ComponentType<Fade>;
    Wrapper: React.ComponentType<Wrapper>;
}
export declare const BottomSheetSkin: BottomSheetSkin;
export default BottomSheetSkin;
