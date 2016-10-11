import initialState from './initialState.js'
import { createStore } from 'redux'

const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';


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

let store = createStore(reducer);

console.log(store.getState())

// store.dispatch hands its argument to the reducer function
store.dispatch({ type: RECEIVE_ALBUMS, albums: [{Album: "Cool album"}] })
console.log(store.getState())

export default store;
