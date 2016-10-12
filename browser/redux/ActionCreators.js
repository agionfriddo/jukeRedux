import { RECEIVE_ALBUMS } from '../react/ourRedux'

// We're moving the asynchronicity from componentDidMount into this ActionCreator'

// THIS IS OUR ACTION CREATOR, 
export const receiveAlbums = albumsArr => ({
  type: RECEIVE_ALBUMS,
  albumsArr
});

const fetchAlbumsFromServer = () => {
  return dispatch => {
      fetch('/api/albums')
        .then(res => res.json())
        .then(albumsArr => {
            dispatch(receiveAlbums(albumsArr))
        })
  }

}