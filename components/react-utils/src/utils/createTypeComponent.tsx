import React from 'react';

const defineType = (components: IComponents, props: any) => {
  const keys: any[] = Object.keys(components);
  return (
    keys.find((key: string) => props[key] === true || props[key] === 'true') ||
    keys[0]
  );
};

interface IComponents {
  [key: string]: React.ComponentType<any>;
}

const getType = (components: IComponents, props: any, type: string) => {
  try {
    return type || defineType(components, props);
  } catch (e) {
    console.warn(e.message);
    return type;
  }
};

const _createTypeComponent = (
  components: IComponents,
  typeProp: string = 'type'
) => ({ [typeProp]: type, ...props }: any, ref: any) => {
  type = getType(components, props, type);
  const Component = (components && components[type]) || React.Fragment;
  return <Component ref={ref} {...props} />;
};

export const createTypeComponent = (
  components: IComponents,
  typeProp: string = 'type',
  forward = true
) =>
  forward
    ? React.forwardRef(_createTypeComponent(components, typeProp))
    : _createTypeComponent(components, typeProp);

export default createTypeComponent;
