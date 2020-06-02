import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import Button from "../../../Button";
import { useSingleLink } from "../../../../utils/linkUtils";

const MultilineSelectedString = item => {
  const valueLink = useSingleLink(item.defaultValue);
  const onNext = () => {
    item.update(valueLink.value);
    item.next();
  };
  return (
    <Layout ph={15}>
      <Tag size={80} icon={item.icon} />
      <Text h4>{item.label}</Text>

      <Input
        {...item}
        onChangeText={valueLink.set}
        onBlur={() => {
          item.update(valueLink.value);
          item.onBlur && item.onBlur();
        }}
        icon={null}
        autoFocus
        label={null}
        multiline={true}
      />
      {item.validationError && <Text h7>⚠️{item.validationError}</Text>}
      <Button onPress={onNext}>Далее</Button>
    </Layout>
  );
};

export default MultilineSelectedString;
