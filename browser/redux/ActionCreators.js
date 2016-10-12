import {RECEIVE_ALBUMS} from '../react/ourRedux'
import {convertSong, convertAlbum} from '../react/containers/AppContainer'

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
