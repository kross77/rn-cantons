import Layout from "../../Layout";
import upgrade from "../../../utils/upgrade";
import Input from "../../Input";
import * as React from "react";
import { useEffect, useState } from "react";
import Tag from "../../Tag";
import Text from "../../Text";
import Block from "@kross77/rn-block";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Avatar from "../../Avatar";
import Colors from "../../Colors";
import SelectedString from "./selected/SelectedString";
import SelectedPhoto from "./selected/SelectedPhoto";
import SelectedOption from "./selected/SelectedOption";
import PhoneConfirmInput from "./selected/PhoneConfirmInput";
import SelectedPhoneConfirmationString from "./selected/SelectedPhoneConfirmationString";
import SelectedAvatar from "./selected/Avatar";
import PhoneConfirmation from "./selected/PhoneConfirmation";
import Button from "../../Button";
import useSpringAnimation from "../../../native/animation/useSpringAnimation";
import TitleWrapper from "./selected/components/TitleWrapper";
import Appear from "../../Appear";
import debounce from "../../../utils/debounce";
import { useSingleLink } from "../../../utils/linkUtils";
import SelectPhotos from "./selected/SelectPhotos";
import Route from "./selected/Route";
import MultilineSelectedString from "./selected/Multiline";
import SelectedTransport from "./selected/SelectedTransport";
import Rating from "./selected/Rating";
import SelectedStringNumber from "./selected/SelectedStringNumber";
import RouteSearch from "./selected/RouteSearch";

import DatePicker from "react-native-date-picker";

const useReference = (props: { onRef: (ref: any) => void }) => {
  const [ref, setRef] = useState({});
  useEffect(() => {
    if (props.onRef) {
      props.onRef && props.onRef(ref);
    }
  }, [ref]);
  return [ref, setRef];
};

const OnlyTouch = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>
    <View pointerEvents={"none"}>{children}</View>
  </TouchableOpacity>
);

const wrap = (Parent: any, Component: any) => (props: any) => (
  <Parent {...props}>
    <Component {...props} />
  </Parent>
);

const phone = upgrade(SelectedString, {
  autoFocus: true,
  type: "string",
  returnKeyType: "next",
  dataDetectorType: "phoneNumber",
  keyboardType: "phone-pad"
});


const StringComponent = upgrade(SelectedString, ({ next }) => ({
  autoFocus: true,
  onBlur: () => {
    next();
  },
  type: "string",
  returnKeyType: "next"
}))

const formComponents = ({}) => ({
  layout: Layout,
  string: (props: any) => {
    const link = useSingleLink("");
    return <Layout>
      <StringComponent onFieldChange={link.set} {...props}/>
      <Button
          onPress={async () => {
            await props.update(link.value);
            await props.next()
          }}
      >
        Далее
      </Button>
    </Layout>
  },
  phone: SelectedPhoneConfirmationString,
  reference: wrap(OnlyTouch, (props: any) => (
    <Layout gap={5}>
      <Text meta>{props.label}</Text>
      <Avatar
        iconColor={Colors.B800}
        size={60}
        border={"grey"}
        color={Colors.PLACEHOLDER}
        uri={props.value}
        {...props}
      />
    </Layout>
  )),
  photo: SelectedPhoto,
  select: SelectedOption,

  tag: wrap(OnlyTouch, (props: any) => {
    return (
      <Block relative width={90} height={90}>
        <Tag onPress={() => props.onFocus(400)} size={55} {...props} />
      </Block>
    );
  })
});


const string= upgrade(SelectedString, ({ next }) => ({
  autoFocus: true,
  onBlur: () => {
    next();
  },
  type: "string",
  returnKeyType: "next"
}));

const delayedUpdate = debounce((update, value) => {
  update(value);
}, 1000);

const NumberComponent = upgrade(string, { keyboardType: "numeric" });

export const selectedComponents = {
  layout: Layout,
  string: (props: any) => {
    const link = useSingleLink("");
    return <Layout>
      <StringComponent onFieldChange={link.set} {...props}/>
      <Appear visible={link.value?.length > 3} >
        <Button
            onPress={async () => {
              await props.update(link.value);
              await props.next()
            }}
        >
          Далее
        </Button>
      </Appear>

    </Layout>
  },
  multiline: MultilineSelectedString,
  route: Route,
  "route-search": RouteSearch,
  number: (props: any) => {
    const numberLink = useSingleLink(props.defaultValue)
    return (
      <Layout>
        <NumberComponent  {...props} onFieldChange={numberLink.set} update={numberLink.set} />
        <Appear visible={numberLink.value?.length > 0}>
          <Button
            onPress={async () => {
              await props.update(numberLink.value);
              await props.next()
            }}
          >
            Далее
          </Button>
        </Appear>
      </Layout>
    );
  },
  year: (props: any) => {
    const numberLink = useSingleLink(props.defaultValue)
    const validLink = useSingleLink(false);
    useEffect(() => {
      const year = Number(numberLink.value);
      const valid = !isNaN(year) && year >= 1960 && year <= new Date().getFullYear();
      validLink.set(valid);

    }, [numberLink.value])
    return (
      <Layout>
        <NumberComponent {...props} update={numberLink.set} />
        <Appear visible={validLink.value}>
          <Button
            onPress={async () => {
              await props.update(numberLink.value);
              await props.next()
            }}
          >
            Далее
          </Button>
        </Appear>
      </Layout>
    );
  },
  "number-options": SelectedStringNumber,
  range: ({ icon, state, ...props }) => {
    const selectedValue = useSingleLink(null);
    useEffect(() => {
      if (selectedValue.value !== null) {
        delayedUpdate(props.update, selectedValue.value);
      }
    }, [selectedValue.value]);
    const value =
      (!isNaN(props.defaultValue) && props.defaultValue) || props.min;
    return (
      <Block center>
        <Block flex={1} justify={"flex-end"}>
          <Tag size={80} icon={icon} />
        </Block>

        <Layout gap={20} flex={1} justify={"flex-start"}>
          <Input
            values={[value]}
            range
            sliderType={"single"}
            {...props}
            update={selectedValue.set}
          />
          {props.valueLabel && <Text h5>{props.valueLabel}</Text>}
          <Appear visible={props.defaultValue}>
            <Button onPress={props.next} disabled={!selectedValue.value}>
              Далее
            </Button>
          </Appear>
        </Layout>
      </Block>
    );
  },
  date: props => {
    const dateLink = useSingleLink(new Date());
    return (
      <Layout gap={20}>
        <Layout pv={10}>
          <Text h4>{props.label}</Text>
        </Layout>

        <DatePicker
          mode={"date"}
          locale={"ru_RU"}
          date={dateLink.value}
          onDateChange={dateLink.set}
        />
        <Appear visible={dateLink.value}>
          <Button
            onPress={async () => {
              await props.update(dateLink.value);
              await props.next();
            }}
            disabled={!dateLink.value}
          >
            Далее
          </Button>
        </Appear>
      </Layout>
    );
  },
  multirange: ({ icon, state, ...props }) => {
    const selectedValue = useSingleLink(props.defaultValue || []);
    const minValue = Number(selectedValue.value[0]);
    const maxValue = Number(selectedValue.value[1]);
    useEffect(() => {
      if (selectedValue.value !== null) {
        delayedUpdate(props.update, selectedValue.value);
      }
    }, [selectedValue.value]);
    const value = (!isNaN(props.defaultValue) && props.defaultValue) || [];
    return (
      <Block>
        <Block justify={"flex-end"}>
          <Tag size={80} icon={icon} />
        </Block>
          <Text h4>{props.label}</Text>
        <Layout gap={20} justify={"flex-start"}>
          <Input
            autoFocus
            keyboardType={"numeric"}
            {...props}
            label={"от"}
            defaultValue={(props.defaultValue && props.defaultValue[0] )||(selectedValue.value && selectedValue.value[0]) || props.min || 0}
            onChangeText={value =>
              selectedValue.set([value, maxValue])
            }
          />
          <Input
            keyboardType={"numeric"}
            {...props}
            label={"до"}
            defaultValue={(props.defaultValue && props.defaultValue[1]) || (selectedValue.value && maxValue) || props.max}
            onChangeText={value =>
              selectedValue.set([selectedValue.value[0], value])
            }
          />
          {props.valueLabel && <Text h5>{props.valueLabel}</Text>}
          <Appear visible={selectedValue.value?.length === 2}>
            <Button
              onPress={() => {
                props.update(selectedValue.value)
                props.next()
              }}
              disabled={
                !(
                  minValue >= 0 &&
                  maxValue > 0
                ) || minValue > maxValue
              }
            >
              Далее
            </Button>
          </Appear>
        </Layout>
      </Block>
    );
  },
  phone: PhoneConfirmation,
  rating: Rating,
  reference: wrap(OnlyTouch, (props: any) => (
    <Layout gap={5}>
      <Text meta>{props.label}</Text>
      <Avatar
        iconColor={Colors.B800}
        size={60}
        border={"grey"}
        color={Colors.PLACEHOLDER}
        uri={props.value}
        {...props}
      />
    </Layout>
  )),
  photo: SelectedAvatar,
  photos: SelectPhotos,
  select: SelectedOption,
  selectTransport: SelectedTransport,
  tag: wrap(OnlyTouch, (props: any) => {
    return (
      <Block relative width={90} height={90}>
        <Tag onPress={() => props.onFocus(400)} size={55} {...props} />
      </Block>
    );
  })
};

export default formComponents;
