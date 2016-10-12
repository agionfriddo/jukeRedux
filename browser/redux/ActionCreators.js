import { RECEIVE_ALBUMS } from '../react/ourRedux'

// We're moving the asynchronicity from componentDidMount into this ActionCreator'

export const receiveAlbums = function (albums) {
  return { type: RECEIVE_ALBUMS, albums}
}