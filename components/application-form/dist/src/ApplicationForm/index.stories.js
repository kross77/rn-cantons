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
import { Button, ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import Input from "../Input";
import { useSingleLink } from "../../utils/linkUtils";
import Route from "./components/selected/Route";
import { useFormSyncronization } from "./hooks/useFormSyncronization";
const item = {
    component: "phone",
    label: "Телефон",
    placeholder: "Введите ваше номер",
    description: "Ваш номер телефона мы будем использовать для отправки важных аутефикационных сообщений",
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
    description: "Ваш номер телефона мы будем использовать для отправки важных аутефикационных сообщений"
};
const LiveModelDisplay = () => {
    const dataLink = useFormSyncronization("developer", "register");
    const model = useApplicationFormModel(configs["register"], dataLink);
    const formKey = useSingleLink(null);
    return (React.createElement(KeyboardAvoidingView, { behavior: "padding" },
        React.createElement(ScrollView, null,
            React.createElement(Text, { align: "left" }, JSON.stringify(model, null, 2))),
        React.createElement(Layout, { gap: 10, pv: 20 },
            React.createElement(Input, { autoCapitalize: "none", label: "formKey", onChangeText: formKey.set }),
            React.createElement(Button, { title: "select form key item", onPress: () => {
                    model.select(formKey.value);
                    Keyboard.dismiss();
                } }))));
};
storiesOf("ApplicationForm", module)
    .addDecorator(getStory => (React.createElement(CenterView, { color: Colors.B200 }, getStory())))
    .add("register user", () => React.createElement(ApplicationFrom, { name: "register" }))
    .add("search", () => React.createElement(ApplicationFrom, { isTags: false, name: "search" }))
    .add("transport", () => React.createElement(ApplicationFrom, { name: "transport" }))
    .add("tender", () => (React.createElement(ApplicationFrom, { requiredFieldsFilledConfirmation: false, isTags: false, name: "tender" })))
    .add("orders", () => React.createElement(ApplicationFrom, { name: "orders" }))
    .add("transports", () => React.createElement(ApplicationFrom, { name: "transports" }))
    .add("cargo", () => React.createElement(ApplicationFrom, { name: "cargo" }))
    .add("feedback", () => React.createElement(ApplicationFrom, { name: "feedback" }))
    .add("radius", () => React.createElement(ApplicationFrom, { name: "radius" }))
    .add("profile", () => React.createElement(ApplicationFrom, { name: "profile" }))
    .add("register user (live model)", () => React.createElement(LiveModelDisplay, null))
    .add("zoom field (string)", () => (React.createElement(Animation, { type: "twoLayers", openned: true },
    null,
    React.createElement(Layout, null,
        React.createElement(SelectedString, Object.assign({}, item))))))
    .add("route", () => (React.createElement(Animation, { type: "twoLayers", openned: true },
    null,
    React.createElement(Layout, null,
        React.createElement(Route, Object.assign({}, routeItem))))));
//# sourceMappingURL=index.stories.js.map