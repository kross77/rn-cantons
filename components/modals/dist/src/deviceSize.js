import { Dimensions } from "react-native";
import { createSelector } from "reselect";
import createStructuredSelector from "radar/js/createStructuredSelector";
const setWindowSize = p => p.createUpdater('windowSize');
const setScreenSize = p => p.createUpdater('screenSize');
const initDeviceSizeHandler = createSelector(setWindowSize, setScreenSize, (setWindow, setScreen) => () => {
    {
        const handler = ({ window, screen }) => {
            setWindow(window);
            setScreen(screen);
        };
        Dimensions.addEventListener("change", handler);
        return () => {
            Dimensions.removeEventListener("change", handler);
        };
    }
});
const deviceSize = createStructuredSelector({
    initDeviceSizeHandler,
    window: (p) => p.windowSize,
    screen: (p) => p.screenSize,
});
export default deviceSize;
//# sourceMappingURL=deviceSize.js.map