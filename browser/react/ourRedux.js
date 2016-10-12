import initialState from './initialState.js'
import { createStore } from 'redux'
import { applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

var myMiddle = applyMiddleware(createLogger())

export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';


// receives action argument from store.dispatch
// it also receives state from dispatch as well
function reducer (state = initialState, action){
    switch (action.type){
        case "RECEIVE_ALBUMS": return Object.assign(
            {},
            state,
            {albumList: action.albums}
        )
        default: return state;
    }
}

let store = createStore(reducer, myMiddle);


// store.dispatch hands its argument to the reducer function
// store is aware of state because it receieves reducer as an argument
// when it is created

export default store;
