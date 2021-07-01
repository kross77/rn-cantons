const dw = (value: any, addPx: boolean) => `${value} vw`
const dh = (value: any, addPx: boolean) => `${value} vh`

const withDevice = (v: any, addPx = true) => {
  // console.log('withDevice', {v});
  if (v) {
    v = v + ''
    const value = v.substr(0, v.length - 2)
    const dw2 = v.search('dw') !== -1 && dw(value, addPx)
    const dh2 = v.search('dh') !== -1 && dh(value, addPx)
    return dh2 || dw2 || v
  }

  return v
}

export default withDevice
