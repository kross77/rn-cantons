const update = (obj: any, key: string, value: any) => ({
  ...obj,
  [key]: value,
})

const setObj = (rootObj: any, obj: any, keys: string[]): any => {
  if(keys.length === 0) {
    return obj;
  }
  const packedObject = keys.reverse().reduce((updated: any, key: string) => {
    // console.log('setObj', {key, updated})
    return update({}, key, updated)
  }, obj)
  return {
    ...rootObj,
    ...packedObject,
  }
}

// keys.reduce((val: any, key) => val && val[key], obj)

export default setObj
