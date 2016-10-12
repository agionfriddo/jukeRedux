import {RECEIVE_ALBUMS} from '../react/ourRedux'
import {convertSong, convertAlbum} from './containers/AppContainer'
import AUDIO from './audio'

// We're moving the asynchronicity from componentDidMount into this
// ActionCreator' THIS IS OUR ACTION CREATOR,
export const receiveAlbums = albumsArr => ({type: RECEIVE_ALBUMS, albumsArr});

export const fetchAlbumsFromServer = () => {
  return dispatch => {
    fetch('/api/albums')
      .then(res => res.json())
      .then(albumsArr => {
        albumsArr = albumsArr.map(anAlbum => convertAlbum(anAlbum))
        dispatch(receiveAlbums(albumsArr))
      })
  }
}

export const startPlaying = () => ({ type: START_PLAYING });
export const stopPlaying = () => ({ type: STOP_PLAYING });
export const setCurrentSong = (currentSong, currentSongList) => ({
  type: SET_CURRENT_SONG,
  currentSong,
  currentSongList
});

export const play = ()  => {
  return dispatch => {
    AUDIO.play();
    dispatch(startPlaying())
  }
};

export const pause = ()  => {
  return dispatch => {
    AUDIO.pause()
    dispatch(stopPlaying())
  }
};

export const load = (currentSong, currentSongList) => {
  return dispatch => {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    dispatch(setCurrentSong(currentSong, currentSongList));
  }
};

export const startSong = (song, list) => {
  return dispatch => {
    dispatch(pause());
    dispatch(load(song,list));
    dispatch(play());
  }
}

export const toggle = () => {
  return dispatch => {
    const { isPlaying } = getState();
    if(isPlaying) dispatch(pause());
    else dispatch(play());
  }
}

export const toggleOne = (selectedSong, selectedSongList) =>
  (dispatch, getState) => {
    const { currentSong } = getState();
    if (selectedSong.id !== currentSong.id)
      dispatch(startSong(selectedSong, selectedSongList));
    else dispatch(toggle());
};
