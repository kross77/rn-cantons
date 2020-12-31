const replaceVars = (string: string, props: any = {}) => {
  return string.replace(
    /%([a-z,A-Z,0-9]*)%/g,
    (_: string, propName: string) => {
      return props[propName];
    }
  );
};

export default replaceVars;
