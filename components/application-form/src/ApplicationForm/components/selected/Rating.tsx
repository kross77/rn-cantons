import * as React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Animated, TouchableOpacity } from "react-native";
import Layout from "../../../Layout";
import upgrade from "../../../../utils/upgrade";
import Input from "../../../Input";
import Appear from "../../../Appear";
import Button from "../../../Button";
import Text from "../../../Text";
import createTypeComponent from "../../../../utils/createTypeComponent";
import { default as DisplayRating } from "../../../Rating";
import {useSingleLink} from "../../../../utils/linkUtils";
import {useEffect} from "react";

const Display = ({ defaultValue, select, ...props }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={select} disabled={!select} style={{opacity: !select ? 0.5: 1}}>
    <Layout pointerEvents={'none'}>
      {defaultValue ? (
        <Layout>
          <Text meta>{props.label}</Text>
          <DisplayRating value={defaultValue} size={20} padding={1} />
        </Layout>
      ) : (
        <Input string {...props} />
      )}
    </Layout>
  </TouchableOpacity>
);

const Focused = ({ label, description, update, next, defaultValue }) => {
  const link = useSingleLink(4);
  return (
    <Layout gap={50}>
        <Layout gap={20} ph={30}>
            <Text h2>{label}</Text>
            <Text h5>{description}</Text>
        </Layout>
        <Layout pv={50}>
            <Input
                type={"rating"}
                defaultValue={link.value}
                onFinishRating={value => {
                    const rounded = Math.round(value * 10) / 10;
                    link.set(rounded);
                }}
            />
        </Layout>

      <Appear visible={true}>
        <Button onPress={() => {
            update(link.value)
            next()
        }}>Далее</Button>
      </Appear>
    </Layout>
  );
};

const Rating = createTypeComponent(
  {
    focused: Focused,
    display: Display
  },
  "behaviour",
  true
);
export default Rating;
