import * as React from "react";
import { ModalContent, BaseModal, SlideAnimation } from "react-native-modals";
import { Dimensions } from "react-native";
// import useSpringAnimation from "@rn-cantons/react-native-utils";
import {ArrayLink, useArrayLink, useSingleLink} from "@rn-cantons/react-link";
import {Animated, StyleSheet} from "react-native";
import {useContext, useEffect, useState} from "react";
import {upgrade} from "@rn-cantons/react-utils";


const useSpringAnimation = () => {
  const [value] = useState(new Animated.Value(0))
  return value;
}

const window = Dimensions.get('window')

const isFunction = (fn: any) =>  typeof fn === 'function';

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: 'rgba(3,34,55,0.8)'
  },
  modal: {
    width: window.width - 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  }
});

export const ModalItem = ({
                            value = new Animated.Value(0),
                            visibleLink,
                            close: Close,
                            keyboardHeight,
                            children,
}: any) => {
  return (
    <BaseModal
      modalAnimation={
        new SlideAnimation({
          slideFrom: "bottom"
        })
      }
      style={StyleSheet.flatten([
        styles.container,
        {
          transform: [
            {
              translateY: value.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -1]
              })
            }
          ]
        }
      ])}
      modalStyle={StyleSheet.flatten([
        styles.modal,
        {
          paddingBottom: 20,
          maxHeight:
              window.height -
            (isNaN(Number(keyboardHeight)) ? 0 : Number(keyboardHeight)) -
            30,
          top: 20
        }
      ])}
      width={1}
      visible={visibleLink.value}
      onTouchOutside={() => visibleLink.set(false)}
    >
      <ModalContent>
        {children}
        {Close && <Close />
        }
      </ModalContent>
    </BaseModal>
  );
};

export type Modals = ArrayLink<JSX.Element>;
//@ts-ignore
export const ModalsContext = React.createContext<Modals>([]);

export const useModals = () => {
  return useContext(ModalsContext);
}

const Modals = ({ children, close, keyboardHeight, ...props }) => {
  const arrayLink = useArrayLink<any>([]);
  const modelLink = {
    ...arrayLink,
    add: (item, onClose) => {
      if (onClose) {
        //@ts-ignore
        arrayLink.add(() => ({ item, onClose }));
      } else {
        //@ts-ignore
        arrayLink.add(item);
      }
    }
  };
  const childrenLink = useSingleLink([]);
  //@ts-ignore
  const value = useSpringAnimation(0, keyboardHeight, {
    useNativeDriver: true
  });

  useEffect(() => {
    if (modelLink.value?.length > childrenLink.value?.length) {
      //@ts-ignore
      childrenLink.set(modelLink.value);
    } else {
      setTimeout(() => {
        //@ts-ignore
        childrenLink.set(modelLink.value);
      }, 500);
    }
  }, [modelLink.value]);

  const modals = childrenLink.value.map((child, index) => {
    //@ts-ignore
    const { item, onClose } = isFunction(child) ? child() : { item: child };


    close = upgrade(close, {onClose})
    return (
      <ModalItem
          close={close}
        visibleLink={{
          value: modelLink.value[index],
          set: v => {
            if (v) {
              modelLink.pop();
            } else {
              onClose();
            }
          }
        }}
        key={`modal${index}`}
        value={value}
        keyboardHeight={keyboardHeight}
      >
        {item}
      </ModalItem>
    );
  });
  return (
    <ModalsContext.Provider
        //@ts-ignore
      value={{
        ...modelLink
      }}
      {...props}
    >
      {children}
      {modals}
    </ModalsContext.Provider>
  );
};

export default Modals;
