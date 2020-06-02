import * as React from "react";
import "./components/selected/index.stories";
import { storiesOf } from "@storybook/react-native";

import CenterView from "../CenterView";
import ApplicationFrom from "./index";
import Colors from "../Colors";
import Layout from "../Layout";
import Animation from "../Animation";
import Text from "../Text";
import SelectedString from "./components/selected/SelectedString";
import useApplicationFormModel from "./model";
import * as configs from "./configs";

import {
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Image
} from "react-native";
import Input from "../Input";
import { useSingleLink } from "../../utils/linkUtils";
import Route from "./components/selected/Route";
import Block from "@kross77/rn-block/dist";
import {useFormSyncronization} from "./hooks/useFormSyncronization";

const item = {
  component: "phone",
  label: "Телефон",
  placeholder: "Введите ваше номер",
  description:
    "Ваш номер телефона мы будем использовать для отправки важных аутефикационных сообщений",
  required: true,
  icon: "phone"
};

const listItem = {
  component: "list",
  newReference: "transport",
  collection: "cars/?userId==@userId",
  icon: "transport",
  label: "Транспорт"
};

const routeItem = {
  component: "range",
  icon: "map",
  label: "Маршрут",
  placeholder: "Введите ваше номер",
  description:
    "Ваш номер телефона мы будем использовать для отправки важных аутефикационных сообщений"
};

const LiveModelDisplay = () => {
  const dataLink = useFormSyncronization("developer", "register");
  const model = useApplicationFormModel(configs["register"], dataLink);
  const formKey = useSingleLink(null);
  return (
    <KeyboardAvoidingView behavior={"padding"}>
      <ScrollView>
        <Text align={"left"}>{JSON.stringify(model, null, 2)}</Text>
      </ScrollView>
      <Layout gap={10} pv={20}>
        <Input
          autoCapitalize={"none"}
          label={"formKey"}
          onChangeText={formKey.set}
        />
        <Button
          title={"select form key item"}
          onPress={() => {
            model.select(formKey.value);
            Keyboard.dismiss();
          }}
        />
      </Layout>
    </KeyboardAvoidingView>
  );
};

storiesOf("ApplicationForm", module)
  .addDecorator(getStory => (
    <CenterView color={Colors.B200}>{getStory()}</CenterView>
  ))
  .add("register user", () => <ApplicationFrom name={"register"} />)
  .add("search", () => <ApplicationFrom isTags={false} name={"search"} />)
  .add("transport", () => <ApplicationFrom name={"transport"} />)
  .add("tender", () => (
    <ApplicationFrom
      requiredFieldsFilledConfirmation={false}
      isTags={false}
      name={"tender"}
    />
  ))
  .add("orders", () => <ApplicationFrom name={"orders"} />)
  .add("transports", () => <ApplicationFrom name={"transports"} />)
  .add("cargo", () => <ApplicationFrom name={"cargo"} />)
  .add("feedback", () => <ApplicationFrom name={"feedback"} />)
  .add("radius", () => <ApplicationFrom name={"radius"} />)
  .add("profile", () => <ApplicationFrom name={"profile"} />)
  .add("register user (live model)", () => <LiveModelDisplay />)
  .add("zoom field (string)", () => (
    <Animation type={"twoLayers"} openned={true}>
      {null}
      <Layout>
        <SelectedString {...item} />
      </Layout>
    </Animation>
  ))
  .add("route", () => (
    <Animation type={"twoLayers"} openned={true}>
      {null}
      <Layout>
        <Route {...routeItem} />
      </Layout>
    </Animation>
  ));
