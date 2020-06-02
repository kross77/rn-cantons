import * as React from 'react';

/**
 * pack one component type into other without writing jsx
 * @param Parent       parent component
 * @param Component    child component
 */
const wrap = <T extends any>(
  Parent: React.ComponentType<any>,
  Component: React.ComponentType<any>
): React.ComponentType<T> => (props: any) => (
  <Parent {...props}>
    <Component {...props} />
  </Parent>
);

export default wrap;
