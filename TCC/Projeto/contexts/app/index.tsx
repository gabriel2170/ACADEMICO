import { reducer } from './reducer';
import { createContext, useReducer } from 'react';
import { ContextType, DataType, ProviderType } from './types'

export { useAppContext } from './hook'

const initialState: DataType = {
    tenant: null
}

export const AppContext = createContext<ContextType>({
    state: initialState,
    dispatch: () => { }
});

export const Provider = ({ children }: ProviderType) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = { state, dispatch };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


// https://medium.com/geekculture/how-to-use-context-usereducer-and-localstorage-in-next-js-cc7bc925d3f2
// https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/