import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import {Keyboard} from "react-native";
import {Picker} from "react-native-wheel-pick";
import TitleWrapper from "./components/TitleWrapper";
import {useEffect, useRef, useState} from "react";
import Appear from "../../../Appear";
import Button from "../../../Button";
import {useSingleLink} from "../../../../utils/linkUtils";


const getKey = (keyName, Component) => props => (
    <Component key={props[keyName]} {...props} />
);


const SelectedStringNumber = item => {
    const options = [{ label: "", value: undefined }, ...item.options];
    const textRef = useRef();
    const textLink = useSingleLink(item.defaultValue?.inputValue);
    const [selected, setSelected] = useState(item.defaultValue?.optionValue);
    useEffect(() => {
        item.update({inputValue: textLink.value, optionValue: selected})
    }, [textLink.value])

    useEffect(() => {
        if(selected){
            textRef.current.focus();
        }else{
            Keyboard.dismiss();
        }
    }, [!!selected])

  return (
    <Layout ph={15}>
      <Tag size={80} icon={item.icon} />
      <Text h4>{item.label}</Text>
      <Appear visible={selected}>
          <Input
              {...item}
              ref={textRef}
              defaultValue={textLink.value}
              keyboardType={"numeric"}
              onChangeText={textLink.set}
              icon={null}
              label={null}
              multiline={false}
          />
      </Appear>
      <Layout height={140}>
          <Picker
              selectedValue={selected}
              style={{ backgroundColor: 'white', height: 140, width: 250 }}
              pickerData={options.map(v => v.label)}
              onValueChange={(itemValue: any) => {
                  const value = options.find(v => v.label === itemValue)?.value;
                  item.update({optionValue: value, inputValue: textLink.value});
                  setSelected(itemValue);
              }}
          />
      </Layout>
        <Button disabled={!Number(textLink.value) > 0} onPress={item.next}>Далее</Button>
        {item.validationError && <Text h7>⚠️{item.validationError}</Text>}

    </Layout>
  );
};

export default SelectedStringNumber;
