import { Dimensions } from 'react-native';
const labels = ['xs', 'sm', 'md', 'lg'];
const { width, height } = Dimensions.get('window');
const getSize = (width, height) => ((width <= 320 && height < 557) ? 'xs'
    : width <= 320 ? 'sm'
        : width <= 375 ? 'md' : 'lg');
const getDownFrom = (index, values) => (values && values[labels[index]]) || (index <= 0 ? undefined : getDownFrom(index - 1, values));
export const isXS = getSize(width, height) === 'xs';
export const isSM = getSize(width, height) === 'sm';
export const isMD = getSize(width, height) === 'md';
export const isLG = getSize(width, height) === 'lg';
export default (v, deviceWidth, deviceHeight) => {
    if (typeof v === 'object') {
        const w = deviceWidth || width;
        const h = deviceHeight || height;
        const size = getSize(w, h);
        const index = labels.findIndex(v => v === size);
        return getDownFrom(index, v);
    }
    return v;
};
//# sourceMappingURL=withMultiSize.web.js.map