import React, { useReducer } from "react";
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
        update: (type, value) => dispatch({
            type, value
        }),
        createUpdater: (type) => (value) => dispatch({
            type, value
        }),
        value: state,
    };
};

const createLiveModel = (selector) => {
    const Context = React.createContext(null);
    const Provider = ({ children }) => {
        const storeLink = createReducerLinkInterface(useReducer(reducer, {}));
        const computedValue = selector(storeLink);
        return React.createElement(Context.Provider, { value: computedValue }, children);
    };
    return {
        Context,
        Provider,
        Consumer: Context.Consumer
    };
};
export default createLiveModel;
//# sourceMappingURL=index.js.map
