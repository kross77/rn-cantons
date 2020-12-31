import { useState } from "react";
import * as useObjectLink_1 from './useObjectLink';
export { useObjectLink_1 as useObjectLink };
export const createArrayLinkInterface = ([value, setValue]) => {
    const remove = (index) => {
        value.splice(index, 1);
        setValue([...value]);
    };
    return {
        value,
        update: (index, updatedValue) => {
            value[index] = updatedValue;
            setValue([...value]);
        },
        add: (item) => {
            value.push(item);
            setValue([...value]);
        },
        remove,
        pop: () => remove(value.length - 1),
        set: (newValue) => setValue(newValue),
        move: (oldIndex, newIndex) => {
            if (newIndex >= value.length) {
                var k = newIndex - value.length + 1;
                while (k--) {
                    value.push(undefined);
                }
            }
            value.splice(newIndex, 0, value.splice(oldIndex, 1)[0]);
            setValue([...value]);
        }
    };
};
export const updateOne = ([value, setValue]) => ({
    value,
    update: setValue
});
export const updateSingle = ([value, setValue]) => ({
    value,
    set: setValue,
    cb: (value) => () => setValue(value)
});
export const useArrayLink = (initState) => {
    const value = useState(initState);
    return Object.assign({}, createArrayLinkInterface(value));
};
export const useSingleLink = (initState) => {
    const value = useState(initState);
    return updateSingle(value);
};
//# sourceMappingURL=index.js.map