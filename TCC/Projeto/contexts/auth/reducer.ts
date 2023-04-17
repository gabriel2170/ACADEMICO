import { DataType, ActionType, Actions } from './types'

export const reducer = (state: DataType, action: ActionType) => {
    switch (action.type) // pegando as actions do type 
    {
        case Actions.SET_TOKEN:
            if (!action.payload.token) return { ...state, token: '', user: null }
            return { ...state, token: action.payload.token };
            break;
        case Actions.SET_USER:
            if (!action.payload.user) return { ...state, token: '', user: null }
            return { ...state, user: action.payload.user };
            break;
        default: return state;
    }
}

// https://stackoverflow.com/questions/35482241/how-to-type-redux-actions-and-redux-reducers-in-typescript
// https://medium.com/@devjpnobrega/primeiros-passos-com-react-hooks-usereducer-c435d83643d8
// https://blog.tecsinapse.com.br/utilizando-react-redux-firebase-2bf93ea9f422
// https://medium.com/danny-q-san/next-js-redux-firebase-2abb538e4623
// https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example