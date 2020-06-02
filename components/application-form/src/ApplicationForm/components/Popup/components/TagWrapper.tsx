import upgrade from "../../../../../utils/upgrade";
import Block from "@kross77/rn-block/dist";
import createTypeComponent from "../../../../../utils/createTypeComponent";
import wrap from "../../../../../utils/wrap";
import { TouchableOpacity } from "react-native";
import Colors from "../../../../Colors";
import { Label } from "@storybook/react-native/dist/preview/components/Shared/text";
import Layout from "../../../../Layout";

const defaultWrapper = upgrade(Block, ({ active }) => ({
  align: "center",
  justify: "center",
  borderRadius: 20,
  width: 40,
  height: 40,
  opacity: active ? 1 : 0.5,
  borderWidth: 1,
  borderColor: active ? Colors.B800 : "transparent"
}));

const filled = wrap(
  TouchableOpacity,
  upgrade(defaultWrapper, ({ fill = Colors.B800 }) => ({
    color: fill,
    borderRadius: 20,
    borderColor: fill,
    borderWidth: 1,
      width: 40,
      height: 40,
  }))
);
const TagWrapper = wrap(
  upgrade(Layout, { pv: 0, width: "auto" }),
  createTypeComponent({
    defaultWrapper: wrap(TouchableOpacity, defaultWrapper),
    filled
  })
);

export default TagWrapper;
