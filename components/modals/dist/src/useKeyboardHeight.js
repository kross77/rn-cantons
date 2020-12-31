import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
const useKeyboardHeight = () => {
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardWillShow", e => setHeight(e.endCoordinates.height));
        const keyboardWillChangeFrame = Keyboard.addListener("keyboardWillChangeFrame", e => setHeight(e.endCoordinates.height));
        const keyboardDidHideListener = Keyboard.addListener("keyboardWillHide", () => setHeight(0));
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
            keyboardWillChangeFrame.remove();
        };
    }, []);
    return [height, setHeight];
};
export default useKeyboardHeight;
//# sourceMappingURL=useKeyboardHeight.js.map