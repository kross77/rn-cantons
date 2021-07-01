import React from "react";
import {Text, Button} from 'react-native'

const Skin = {
    Text,
    Button: ({onPress, children}) => <Button title={children} onPress={onPress} />
}

export default Skin;
