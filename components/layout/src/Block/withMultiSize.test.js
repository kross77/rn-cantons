import { Dimensions } from 'react-native'
import withMultiSize from './withMultiSize.android'
import {getSize} from './withMultiSize.android'

const SizesArr = {
  XS: 300,
  SM: 370,
  MD: 375,
  LG: 768
}

test('withMultiSize: {xs: 100} -> on xs', () => {
  expect(withMultiSize({ xs: 100 }, SizesArr.XS, 480)).toBe(100)
})

test('withMultiSize: {xs: 100} -> on sm', () => {
  expect(withMultiSize({ xs: 100 }, SizesArr.SM, 557)).toBe(100)
})

test('withMultiSize: {xs: 100} -> on md', () => {
  expect(withMultiSize({ xs: 100 }, SizesArr.MD, 667)).toBe(100)
})

test('withMultiSize: {xs: 100} -> on lg', () => {
  expect(withMultiSize({ xs: 100 }, SizesArr.LG, 667)).toBe(100)
})

test('withMultiSize: {sm: 100} -> on xs', () => {
  expect(withMultiSize({ sm: 100 }, SizesArr.XS, 480)).toBe(undefined)
})

test('withMultiSize: {sm: 100} -> on sm', () => {
  expect(withMultiSize({ sm: 100 }, SizesArr.SM)).toBe(100)
})

test('withMultiSize: {sm: 100} -> on lg', () => {
  expect(withMultiSize({ sm: 100 }, SizesArr.LG)).toBe(100)
})

test('withMultiSize: {md: 100} -> on xs', () => {
  expect(withMultiSize({ md: 100 }, SizesArr.XS)).toBe(undefined)
})

test('withMultiSize: {md: 100} -> on md', () => {
  expect(withMultiSize({ md: 100 }, SizesArr.MD)).toBe(100)
})

test('withMultiSize: {md: 100} -> on lg', () => {
  expect(withMultiSize({ md: 100 }, SizesArr.LG)).toBe(100)
})

test('withMultiSize: {xs: 0.5, sm: 1, md: 1.25} -> on xs', () => {
  // console.log('GET_SIZE', getSize(SizesArr.XS, 420));
  expect(withMultiSize({ xs: 0.5, sm: 1, md: 1.25 }, SizesArr.XS, 420)).toBe(0.5)
})

test('withMultiSize: {xs: 0.5, sm: 1, md: 1.25} -> on sm', () => {
  //console.log('GET_SIZE', getSize(SizesArr.SM, 600))
  expect(withMultiSize({ xs: 0.5, sm: 1, md: 1.25 }, SizesArr.SM, 600)).toBe(1)
})

test('withMultiSize: {xs: 0.5, sm: 1, md: 1.25} -> on md', () => {
  expect(withMultiSize({ xs: 0.5, sm: 1, md: 1.25 }, SizesArr.LG)).toBe(1.25)
})

test('withMultiSize: {xs: 0.5, sm: 1, md: 1.25} -> on lg', () => {
  // console.log("GET SIZE", getSize(SizesArr.LG))
  expect(withMultiSize({ xs: 0.5, sm: 1, lg: 1.25 }, SizesArr.LG)).toBe(1.25)
})
