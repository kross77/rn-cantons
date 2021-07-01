import {Keyboard} from "react-native";
import {createSelector} from "reselect";
import createStructuredSelector from "radar/js/createStructuredSelector";


const setHeight = p => p.createUpdater('keyboardHeight');

export const keyboardHeight = p => p.keyboardHeight;

const initKeyboardHeightChangeHandler = createSelector(
    setHeight,
    (setHeight) => () => {
        {
            const keyboardDidShowListener = Keyboard.addListener(
                "keyboardWillShow",
                e => setHeight(e.endCoordinates.height)
            );
            const keyboardWillChangeFrame = Keyboard.addListener(
                "keyboardWillChangeFrame",
                e => setHeight(e.endCoordinates.height)
            );
            const keyboardDidHideListener = Keyboard.addListener(
                "keyboardWillHide",
                () => setHeight(0)
            );

            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
                keyboardWillChangeFrame.remove();
            }
        }
    }
)

const keyboard = createStructuredSelector({
    initKeyboardHeightChangeHandler,
    height: (p) => p.keyboardHeight,
})

export default keyboard;
