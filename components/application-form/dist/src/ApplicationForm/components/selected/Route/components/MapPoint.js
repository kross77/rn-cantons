import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";
import customMapStyle from "../../../../../../config/customMapStyle";
class MapPointC extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.onRegionChange !== nextProps.onRegionChange;
    }
    render() {
        return (React.createElement(MapView, Object.assign({ style: StyleSheet.absoluteFillObject, provider: PROVIDER_GOOGLE, customMapStyle: customMapStyle }, this.props)));
    }
}
const MapPoint = (props) => {
    return (React.createElement(MapView, Object.assign({ style: StyleSheet.absoluteFillObject, provider: PROVIDER_GOOGLE, customMapStyle: customMapStyle }, props)));
};
export default MapPointC;
//# sourceMappingURL=MapPoint.js.map