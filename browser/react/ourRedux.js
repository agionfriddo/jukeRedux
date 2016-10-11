import initialState from './initialState.js'

const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';

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