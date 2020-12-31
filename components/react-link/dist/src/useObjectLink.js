import { useReducer } from "react";
const reducer = (state, action) => {
    if (action.type === 'set') {
        return action.value;
    }
    if (action && action.type) {
        return Object.assign(Object.assign({}, state), { [action.type]: action.value });
    }
    console.warn('Invalid action', { action });
    return state;
};
const createReducerLinkInterface = ([state, dispatch]) => {
    return {
        set: value => dispatch({ type: 'set', value }),
        update: (obj) => {
            Object.entries(obj).map(([type, value]) => dispatch({
                type, value
            }));
        },
        cb: (type) => (value) => dispatch({
            type, value
        }),
        value: state,
    };
};
const useObjectLink = (defaultValue) => {
    return createReducerLinkInterface(useReducer(reducer, defaultValue || {}));
};
export default useObjectLink;
//# sourceMappingURL=useObjectLink.js.map