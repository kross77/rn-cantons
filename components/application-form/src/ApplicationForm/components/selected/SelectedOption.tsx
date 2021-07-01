import * as React from "react";
import { useEffect, useState } from "react";
import useSpringAnimation from "../../../../native/animation/useSpringAnimation";

import { Picker } from 'react-native-wheel-pick';
import TitleWrapper from "./components/TitleWrapper";
import Button from "../../../Button";
import Block from "@kross77/rn-block/dist";
import Appear from "../../../Appear";
import Layout from "../../../Layout";
import Text from "../../../Text";

const getKey = (keyName, Component) => props => (
  <Component key={props[keyName]} {...props} />
);


interface SelectedOption <Value>{
    selected?: any
    options: {label: string, value: Value}
    defaultValue?: Value
    selectedTitle?: string
    placeholder?: string
    label: string
    update: (v: Value) => void
    next: () => void
    nextLabel?: string
}

const SelectedOption = <T extends any>(item: SelectedOption<T>) => {
  const value = useSpringAnimation(0, item.selected ? 1 : 0, {
    speed: 0.5,
    bounciness: 3,
    delay: 300
  });
  const options = [{ label: "", value: undefined }, ...item.options];
  const [selected, setSelected] = useState(item.defaultValue);

  return (
    <Layout style={{ height: 350 }}>
      <Layout pv={10} ph={20}>
        <Text h4>{item.selectedTitle || item.placeholder || item.label}: </Text>
      </Layout>
      <Picker
        selectedValue={selected}
        style={{ backgroundColor: 'transparent', height: 250, width: 250 }}
        pickerData={options.map(v => v.label)}
        onValueChange={(itemValue: any) => {
          const value = options.find(v => v.label === itemValue)?.value;
            console.log('onValueChange', {itemValue, value})
          item.update(value);
          setSelected(value);
        }}
      />
      <Appear visible={selected}>
        <Button onPress={() => item.next()}>{item.nextLabel}</Button>
      </Appear>
    </Layout>
  );
};

SelectedOption.defaultProps ={
    nextLabel: 'Далее'
}

export default SelectedOption;
