const pick = (obj: any, keys: string[]): any => {
  const result: any = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export default pick;
