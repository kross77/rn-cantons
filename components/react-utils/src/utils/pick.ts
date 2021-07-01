const pick = (obj: any, keys: string[]): any => {
  return keys.reduce((result, key) => result[key], obj);
}

export default pick
