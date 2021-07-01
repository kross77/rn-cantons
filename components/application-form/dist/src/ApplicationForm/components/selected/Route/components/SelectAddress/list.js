import createTypeComponent from "../../../../../../../utils/createTypeComponent";
import Layout from "../../../../../../Layout";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import * as React from "react";
import Icon from "../../../../../../Icon";
import Text from "../../../../../../Text";
import Colors from "../../../../../../Colors";
import Block from "@kross77/rn-block/dist";
import upgrade from "../../../../../../../utils/upgrade";
const SelectAddressList = createTypeComponent({
    loading: () => (React.createElement(Layout, { width: "100%", minHeight: 250, center: true },
        React.createElement(ActivityIndicator, null))),
    display: ({ data, onSelect = null }) => (React.createElement(FlatList, { data: data, keyboardShouldPersistTaps: "always", style: { width: "100%", height: "100%" }, ItemSeparatorComponent: upgrade(Block, {
            height: 0,
            padding: 0,
            margin: 0
        }), keyExtractor: item => item.name, renderItem: ({ item }) => {
            return (React.createElement(TouchableOpacity, { style: { height: 60 }, onPress: () => onSelect(item) },
                React.createElement(Layout, { width: "100%", gap: 10, row: true, key: item.GeoObject.name },
                    React.createElement(Icon, { name: "location" }),
                    React.createElement(Layout, { align: "flex-start", justify: "center", flex: 1, height: "100%" },
                        React.createElement(Text, { align: 'left', h7: true }, item.GeoObject.name),
                        React.createElement(Text, { align: 'left', meta: true }, item.GeoObject.description)),
                    React.createElement(Icon, { size: 50, color: "transparent", iconColor: Colors.B800, name: "chevron-right" }))));
        } })),
    error: ({ error }) => (React.createElement(Layout, { width: "100%", minHeight: 250, center: true },
        React.createElement(Text, { error: true }, error)))
});
export default SelectAddressList;
//# sourceMappingURL=list.js.map