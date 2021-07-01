import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import { useSingleLink } from "../../../../utils/linkUtils";
import { useEffect } from "react";

const SelectedString = ({onFieldChange, ...item}: any) => {
  const valueLink = useSingleLink(item.defaultValue);
  const update = () => {
    item.update(valueLink.value);
  };
  useEffect(() => {
    onFieldChange && onFieldChange(valueLink.value);
  }, [valueLink.value]);
  return (
    <Layout ph={15}>
      <Tag size={80} icon={item.icon} />
      <Text h4>{item.label}</Text>
      <Input
        {...item}
        onChangeText={valueLink.set}
        onBlur={() => {
          update();
          item.onBlur && item.onBlur();
        }}
        icon={null}
        label={null}
        multiline={false}
      />
      {item.validationError && <Text h7>⚠️{item.validationError}</Text>}
    </Layout>
  );
};

export default SelectedString;
