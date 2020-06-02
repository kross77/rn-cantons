import {Dimensions} from "react-native";

const useDeviceSize = () => {
    return Dimensions.get("window");
};

export default useDeviceSize;
