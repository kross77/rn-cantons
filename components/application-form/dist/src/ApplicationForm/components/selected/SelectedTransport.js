import * as React from "react";
import { useEffect } from "react";
import Text from "../../../Text";
import { useLiveModel } from "../../../../logic/model";
import Layout from "../../../Layout";
import { Transport } from "../../../inputs/SelectImage";
import { FlatList } from "react-native";
import { useArrayLink } from "../../../../utils/linkUtils";
import Appear from "../../../Appear";
import Button from "../../../Button";
const SelectedTransport = item => {
    var _a;
    const { transport } = useLiveModel();
    const selectedIds = useArrayLink([]);
    useEffect(() => {
        item.update && item.update(selectedIds.value);
    }, [selectedIds.value]);
    return (React.createElement(Layout, { gap: 30 },
        React.createElement(Text, { h3: true }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0430\u0448\u0438\u043D\u044B: "),
        React.createElement(FlatList, { data: transport.list, keyExtractor: item => item.id, renderItem: ({ item }) => {
                const dataItem = {
                    id: item.id,
                    image: item.photos && item.photos[0],
                    name: item.carModel,
                    year: item.yearIssue
                };
                const selected = selectedIds.value.includes(item.id);
                return (React.createElement(Transport, { onMultiSelect: () => {
                        if (selected) {
                            selectedIds.remove(item.id);
                        }
                        else {
                            selectedIds.add(item.id);
                        }
                    }, size: 80, selected: selected, item: dataItem }));
            } }),
        React.createElement(Appear, { visible: ((_a = selectedIds.value) === null || _a === void 0 ? void 0 : _a.length) > 0 },
            React.createElement(Button, { onPress: () => item.next() }, "\u0414\u0430\u043B\u0435\u0435"))));
};
export default SelectedTransport;
//# sourceMappingURL=SelectedTransport.js.map