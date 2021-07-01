/// <reference types="react" />
import { Text } from 'react-native';
declare const Skin: {
    Text: typeof Text;
    Button: ({ onPress, children }: {
        onPress: any;
        children: any;
    }) => JSX.Element;
};
export default Skin;
