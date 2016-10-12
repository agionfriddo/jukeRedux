import initialState from './initialState.js'
import {createStore} from 'redux'
import {applyMiddleware, combineReducers} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
// console.log("CREATELOGGER", createLogger)

var myMiddle = applyMiddleware(createLogger(), thunkMiddleware)

export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const START_PLAYING = 'START_PLAYING';
export const STOP_PLAYING = 'STOP_PLAYING';
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';


// receives action argument from store.dispatch it also receives state from
// dispatch as well




// each individual reducer works with a property on the store. It returns the expected
// data type, which it then passes to the rootReducer below.
function albumListReducer(state = [], action) {
  switch (action.type) {
    case "RECEIVE_ALBUMS":
      return action.albumsArr
    default:
      return state;
  }
}

function currentSongReducer(state = {}, action){
  switch(action.type){
    case "SET_CURRENT_SONG":
      return action.currentSong;
    default: state;
  }
}

function songListReducer(state = [], action){
  switch(action.type){
    case "SET_CURRENT_SONG":
      return action.currentSongList;
    default: state;
  }
}


function isPlayingReducer(state = false, action) {
  switch (action.type) {
    case "START_PLAYING":
      return true;
    case "STOP_PLAYING":
      return false;
    default:
      return state;
  }
}

// The root reducer takes in data from the other reducers and then assigns the
// properties that will be on the store. It is then passed to createStore to make
// the new state.
let rootReducer = combineReducers({
  albumList: albumListReducer,
  isPlaying: isPlayingReducer,
  currentSongList: songListReducer,
  currentSong: currentSongReducer
});

let store = createStore(rootReducer, myMiddle);

// store.dispatch hands its argument to the reducer function store is aware of
// state because it receieves reducer as an argument when it is created

export default store;
