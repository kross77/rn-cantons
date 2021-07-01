import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { origin } from "../index";
import { StyleSheet } from "react-native";
import customMapStyle from "../../../../../../config/customMapStyle";

interface MapPoint extends MapView {}

class MapPointC extends React.Component<any, any> {
  shouldComponentUpdate(
    nextProps: Readonly<any>,
    nextState: Readonly<any>,
    nextContext: any
  ): boolean {
    return this.props.onRegionChange !== nextProps.onRegionChange;
  }

  render() {
    return (
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        {...this.props}
      />
    );
  }
}

const MapPoint = (props: MapPoint) => {
  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      provider={PROVIDER_GOOGLE}
      customMapStyle={customMapStyle}
      {...props}
    />
  );
};

export default MapPointC;
