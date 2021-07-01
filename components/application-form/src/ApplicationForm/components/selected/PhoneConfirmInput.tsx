import upgrade from "../../../../utils/upgrade";
import SelectedString from "./SelectedString";
import SelectedPhoneInput from "./PhoneInput";
import React from "react";
import Layout from "../../../Layout";
import Input from "../../../Input";
import Block from "@kross77/rn-block";

const Scale = upgrade(Block, ({ scale, style }) => ({
  style: { ...style, transform: [...(style?.transform || []), { scale }] }
}));

const PhoneConfirmInput = props => {
  return (
    <Layout row>
      <SelectedPhoneInput {...props}/>
      <Scale scale={0.8} opacity={0.3}>

        <Input code disabled={false} value={"+375292051020"} {...props} />
        <Input disabled={false} value={"+375292051020"} {...props} />
      </Scale>
    </Layout>
  );
};

export default PhoneConfirmInput;
