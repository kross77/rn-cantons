import React from 'react';
import isFunction from './isFunction';

const upgrade = <I, O extends Object>(
  Component: React.ComponentType<I>,
  props: any
): React.ComponentType<I & O> => (p: I) => {
  const mergedProps = isFunction(props)
    ? //@ts-ignore
      { ...props(p), ...p }
    : { ...props, ...p };
  return <Component {...mergedProps} />;
};

export default upgrade;
