import Layout from "../../../Layout";
import Tag from "../../../Tag";
import Text from "../../../Text";
import Input from "../../../Input";
import * as React from "react";
import {useContext, useEffect} from "react";
import Button from "../../../Button";
import Block from "@kross77/rn-block/dist";
import createTypeComponent from "../../../../utils/createTypeComponent";
import Icon from "../../../Icon";
import Colors from "../../../Colors";
import useRepeatAnimation from "../../../../native/animation/useRepeatAnimation";
import { Animated } from "react-native";
import { useSingleLink } from "../../../../utils/linkUtils";
import useFirebasePhoneLogin, {FirebaseAuthPhoneState} from "../../../../firebase/auth/useFirebasePhoneLogin";
import auth from "@react-native-firebase/auth";
import {ModalsContext} from "../../../Animation/components/Modals";

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
          disabled={false}
          onBlur={() => item.next()}
        />
          <Layout>
              {item.error &&  <Layout pv={10}><Text error>❌{item.error}</Text></Layout>}
              {item.warning && <Layout pv={10}>
                  <Text meta align={'left'}>⚠️{item.warning}</Text>
              </Layout>}
              <Button disabled={item.disabled} onPress={() => item.next()}>Отправить</Button>
          </Layout>

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
          onChangeText={item.update}
          onBlur={item.next}
          icon={null}
          label={null}
          multiline={false}
        />
      </Layout>
        {item.error &&  <Layout pv={10}><Text error>❌{item.error}</Text></Layout>}
        {item.warning && <Layout pv={10}>
            <Text meta align={'left'}>⚠️{item.warning}</Text>
        </Layout>}
        <Button disabled={item.disabled} onPress={() => item.next()}>Отправить</Button>
    </Layout>
  );
};

const Loading = props => {
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

const Success = props => {
  return (
    <Layout center gap={10} ph={15}>
      <Block relative height={100}>
        <Tag size={100} icon={'check'} iconBackgroundColor={Colors.POSITIVE} />
      </Block>
      <Text oversized>Вы авторизированы под номером:</Text>
      <Text h5>{props.phoneNumber}</Text>
        <Button onPress={() => auth().signOut()}>Выйти</Button>
    </Layout>
  );
};
const StateComponent = createTypeComponent(
  {
    phone: SelectedPhoneConfirmationString,
    code: SelectedCodeString,
    success: Success,
    loading: Loading
  },
  "active"
);
// active={sendCodeLink[0] ? "code" : "phone"}


const getActiveState = (state: FirebaseAuthPhoneState) => ({
    [FirebaseAuthPhoneState.AUTHORIZING]: 'phone',
    [FirebaseAuthPhoneState.INPUT_PHONE]: 'phone',
    [FirebaseAuthPhoneState.INPUT_CODE]: 'code',
    [FirebaseAuthPhoneState.SENDING_PHONE]: 'loading',
    [FirebaseAuthPhoneState.SENDING_CODE]: 'loading',
    [FirebaseAuthPhoneState.ERROR_CODE]: 'code',
    [FirebaseAuthPhoneState.ERROR_PHONE]: 'phone',
    [FirebaseAuthPhoneState.SUCCESS]: 'success',
})[state]

const statues = [
    "AUTHORIZING",
    "INPUT_PHONE",
    "SENDING_PHONE",
    "INPUT_CODE",
    "SENDING_CODE",
    "ERROR_PHONE",
    "ERROR_CODE",
    "SUCCESS",
]

const PhoneConfirmation = props => {
  const phone = useSingleLink(props.defaultValue);
  const code = useSingleLink("");
  const modals = useContext(ModalsContext);
  const phoneConfirmed = useSingleLink(false);
  const codeConfirmed = useSingleLink(false);
  const validationError = useSingleLink(null);
  const [phoneAuthState, error, phoneNumber] = useFirebasePhoneLogin({phone: phoneConfirmed.value ? phone.value : undefined, code: codeConfirmed.value ? code.value : undefined});

  useEffect(() => {
      if(phoneAuthState === FirebaseAuthPhoneState.INPUT_CODE || phoneAuthState === FirebaseAuthPhoneState.ERROR_PHONE){
          phoneConfirmed.set(false)
      }
      if(phoneAuthState === FirebaseAuthPhoneState.INPUT_PHONE || phoneAuthState === FirebaseAuthPhoneState.ERROR_CODE){
          codeConfirmed.set(false)
      }
      if(phoneAuthState === FirebaseAuthPhoneState.SUCCESS){
          modals.pop()
      }
  },[phoneAuthState])



    useEffect(() => {
        if(phoneNumber){
            props.update(phoneNumber);
        }
    }, [phoneNumber])

  useEffect(() => {
    const validate = async () => {
      const r = await props.validate(phone.value);
      validationError.set(r);
    };
    validate();
  }, [phone.value]);

  useEffect(() => {

  }, [validationError.value?.error]);
  return (
    <>
      <StateComponent
        error={error}
        cancel={() => phoneConfirmed.set(false)}
        warning={validationError.value?.error}
        phoneNumber={phoneNumber}
        active={getActiveState(phoneAuthState)}
        {...props}
        update={phoneAuthState < 3 ? phone.set : code.set}
        next={phoneAuthState < 3 ? () =>  phoneConfirmed.set(true) : () => codeConfirmed.set(true)}
        disabled={phoneAuthState < 3 ? phone.value?.length === 0 || validationError.value?.error !== null : code.value?.length < 6}
      />
    </>
  );
};

export default PhoneConfirmation;
