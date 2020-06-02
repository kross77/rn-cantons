import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text, { oversized } from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import Button from "../../../Button";
import Block from "@kross77/rn-block/dist";
import { useState } from "react";
import createTypeComponent from "../../../../utils/createTypeComponent";
import Icon from "../../../Icon";
import Colors from "../../../Colors";
import useSpringAnimation from "../../../../native/animation/useSpringAnimation";
import useRepeatAnimation from "../../../../native/animation/useRepeatAnimation";
import { Animated, TouchableOpacity } from "react-native";


const SelectedPhoneConfirmationString = item => {
  return (
    <Layout gap={10} ph={15}>
      <Block height={50}>
        <Tag size={50} icon={item.icon} />
      </Block>

      <Text h4>{item.label}</Text>
      <Layout width={"100%"} gap={10}>
        <Input
          {...item}
          autoFocus
          onChangeText={item.update}
          icon={null}
          label={null}
          keyboardType={"phone-pad"}
          multiline={false}
          onBlur={() => item.next()}
        />

        <Button onPress={() => item.next()}>Выслать sms</Button>
      </Layout>
    </Layout>
  );
};
const SelectedCodeString = item => {
  return (
    <Layout gap={10} ph={15}>
      <Block height={50}>
        <Tag size={50} icon={"lock"} />
      </Block>
      <Text h4>SMS код</Text>

      <Layout width={"100%"}>
        <Input
          autoFocus
          placeholder={"Введите SMS код потверждения"}
          keyboardType={"numeric"}
          onChangeText={item.updateModel("code")}
          onBlur={item.next}
          icon={null}
          label={null}
          multiline={false}
        />
      </Layout>
      <Button onPress={() => item.next()}>Авторизоваться</Button>
    </Layout>
  );
};

const Loading = (props) => {
  const value = useRepeatAnimation();
  return (
    <Layout center gap={10} ph={15}>
      <Block relative height={100}>
        <Tag size={100} icon={"cloud"} />
        <Block absolute bottom={5}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"]
                  })
                },
                { translateX: 0.2 },
                { translateY: 0.2 }
              ]
            }}
          >
            <Icon
              iconColor={Colors.W100}
              color={"transparent"}
              name={"cycle"}
            />
          </Animated.View>
        </Block>
      </Block>

      <Text oversized>Отправляем запрос на потверждение телефона....</Text>
      <Button onPress={() => props.cancel()}>Отмена</Button>
    </Layout>
  );
};
const StateComponent = createTypeComponent(
  {
    phone: SelectedPhoneConfirmationString,
    code: SelectedCodeString,
    loading: Loading
  },
  "active"
);
// active={sendCodeLink[0] ? "code" : "phone"}
const Select = props => {
  return <StateComponent active={props.phoneConfirmState || "phone"} {...props} />;
};

export default Select;
