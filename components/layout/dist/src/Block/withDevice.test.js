import { Dimensions } from 'react-native';
import withDevice from './withDevice';
const { width, height } = Dimensions.get('window');
test('withDevice 100 dw', () => {
    expect(withDevice('100dw')).toBe(`${width}px`);
});
test('withDevice 100 dh', () => {
    expect(withDevice('100dh')).toBe(`${height}px`);
});
test('withDevice 50 dw', () => {
    expect(withDevice('50dw')).toBe(`${width / 2}px`);
});
test('withDevice 50 dh', () => {
    expect(withDevice('50dh')).toBe(`${height / 2}px`);
});
test('withDevice 100', () => {
    expect(withDevice('100')).toBe('100');
});
test('withDevice 100%', () => {
    expect(withDevice('100%')).toBe('100%');
});
test('withDevice undefined', () => {
    expect(withDevice(undefined)).toBe(undefined);
});
//# sourceMappingURL=withDevice.test.js.map