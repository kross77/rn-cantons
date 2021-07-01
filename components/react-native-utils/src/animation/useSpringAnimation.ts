import { Animated } from "react-native";
import { useEffect, useState } from "react";

let timerId;
const useSpringAnimation = (
  value = 0,
  updateValue,
  options?: Animated.SpringAnimationConfig
) => {
  const [animatedValue] = useState(new Animated.Value(value));
  useEffect(() => {
    clearTimeout(timerId);
    const callback = () => {
      Animated.spring(animatedValue, {
        toValue: updateValue,
        useNativeDriver: true,
        ...options
      }).start();
    };

    if (updateValue > 0) {
      callback();
    } else {
      timerId = setTimeout(callback, 100);
    }
  }, [updateValue]);
  return animatedValue;
};

export default useSpringAnimation;
