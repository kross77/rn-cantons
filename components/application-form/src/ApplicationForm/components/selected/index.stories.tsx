import * as React from "react";

import { storiesOf } from "@storybook/react-native";

import PhoneConfirmation from "./PhoneConfirmation";
import CenterView from "../../../CenterView";
import Colors from "../../../Colors";
import validationsConfig from "../../configs/validations";
import yupConfigTransformer from "../../../../utils/validation/yupConfigTransformer";
import SelectedTransport from "./SelectedTransport";
import Rating from "./Rating";
import { useSingleLink } from "../../../../utils/linkUtils";
import Layout from "../../../Layout";

const mock = {
  component: "phone",
  label: "Телефон",
  placeholder: "Введите ваше номер",
  description:
    "Ваш номер телефона мы будем использовать для отправки важных аутефикационных сообщений",
  required: true,
  icon: "phone",
  validation: "belarus_phone"
};

const rating = {
  component: "rating",
  label: "Ваша оценка",
  placeholder: "Оцените работу водителя",
  description: "Оценка водителя очень важна",
  required: true
};

const transport = {
  component: "selectTransport",
  validation: "oneItem"
};

const RatingExample = props => {
  const value = useSingleLink(null);
  return <Rating update={value.set} defaultValue={value.value} {...props} />;
};

storiesOf("ApplicationForm/Fields", module)
  .addDecorator(getStory => (
    <CenterView color={Colors.B200}>{getStory()}</CenterView>
  ))
  .add("FirebasePhoneConfirmInput", () => (
    <PhoneConfirmation v={yupConfigTransformer(validationsConfig)} {...mock} />
  ))
  .add("SelectTransport", () => <SelectedTransport {...transport} />)
  .add("rating", () => <RatingExample />)
  .add("rating display", () => (
    <Layout gap={20}>
      <RatingExample onPress={console.log} behaviour={"display"} {...rating} />
      <RatingExample
        onPress={console.log}
        behaviour={"display"}
        defaultValue={3}
        {...rating}
      />
    </Layout>
  ));
