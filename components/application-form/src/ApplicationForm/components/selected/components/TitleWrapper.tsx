import Layout from "../../../../Layout";
import Block from "@kross77/rn-block/dist";
import Text from "../../../../Text";
import { Animated } from "react-native";
import * as React from "react";

const TitleWrapper = ({ value, size = 1, title, children }) => (
  <Animated.View
    style={{
      opacity: value,
      flex: 1,
      transform: [
        {
          translateY: value.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0]
          })
        }
      ]
    }}
  >
    <Layout gap={40} relative height={"100%"}>
      <Block flex={0.5} justify={"center"}>
        <Text h4>{title}: </Text>
      </Block>
      <Block flex={size}>{children}</Block>
    </Layout>
  </Animated.View>
);

export default TitleWrapper;
