const inRange = (x: number, y: number, range: number) => {
  return x >= y - range && x <= y + range
}

export default inRange
