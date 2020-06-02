import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import Block from "@kross77/rn-block";
import { Text } from "react-native";
import useConnected from "./useConnected";

const Example = () => {
  const connected = useConnected();
  return (
    <Block flex={1} align={"center"} justify={"center"}>
      <Text h3>Connected: </Text>
      <Text h3 color={"black"}>
        {JSON.stringify(connected)}
      </Text>
    </Block>
  );
};

storiesOf("Native/UseConnected", module).add("default", () => <Example />);
