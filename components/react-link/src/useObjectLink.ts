import React, { useReducer } from "react";

export interface ObjectLink<T> {
    update: (updatedValue: Partial<T>) => void;
    set: (value: T) => void;
    value: T;
    cb: (updatedPropName: string) => (updatedValue: any) => void;
}

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

const createReducerLinkInterface = <T extends {}>([state, dispatch]): ObjectLink<T> => {
    return {
        set: value => dispatch({ type: 'set', value }),
        update: (obj) => {
            Object.entries(obj).map(
                ([type, value]) =>  dispatch({
                    type, value
                })
            )
        },
        cb: (type) => (value) => dispatch({
            type, value
        }),
        value: state,
    };
};

const useObjectLink = <T extends Object>(defaultValue: T): ObjectLink<T> => {
    return createReducerLinkInterface(useReducer(reducer, defaultValue || {}));
}

export default useObjectLink;
