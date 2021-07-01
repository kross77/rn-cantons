import { Animated, Easing } from "react-native";
import { useEffect, useState } from "react";

const cycleAnimation = (value: Animated.Value, options = {}) => {
  Animated.timing(value, options).start(params => {
    if (params.finished) {
      value.setValue(0);
      cycleAnimation(value, { ...options, toValue: 1, easing: Easing.linear});
    }
  });
};

const useRepeatAnimation = (
  value = 0,
  options?: Animated.TimingAnimationConfig
) => {
  const [animatedValue] = useState(new Animated.Value(0));
  useEffect(() => {
    cycleAnimation(animatedValue, { toValue: 1, useNativeDriver: true,  ...options});
  }, []);
  return animatedValue;
};

export default useRepeatAnimation;
