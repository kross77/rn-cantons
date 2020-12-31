import React, {useReducer} from "react";


const reducer = (state, action) => {
    if (action.type === 'set') {
        return action.value;
    }
    if (action && action.type) {
        return {...state, [action.type]: action.value}
    }
    console.warn('Invalid action', {action})
    return state;
}


const createReducerLinkInterface = ([state, dispatch]) => {
    return {
        set: value => dispatch({type: 'set', value}),
        // update: v => dispatch({type: 'set', value: {...state, ...v}}),
        update: (type: string, value) => dispatch({
            type, value
        }),
        createUpdater: (type: string) => {
            return async (value) => await dispatch({
                type, value
            })
        },
        value: state,
    }
}

const createLiveModel = <T extends any>(selector: any) => {
    const Context = React.createContext<T | null>(null);
    const Provider = ({children}) => {
        const storeLink = createReducerLinkInterface(useReducer(reducer, {}));
        const computedValue: T = selector(storeLink)
        return <Context.Provider value={computedValue}>
            {children}
        </Context.Provider>
    }
    return {
        Context,
        Provider,
        Consumer: Context.Consumer
    }
}

export default createLiveModel
