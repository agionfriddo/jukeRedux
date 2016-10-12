import { RECEIVE_ALBUMS } from '../react/ourRedux'

export const receiveAlbums = function (albums) {
  return { type: RECEIVE_ALBUMS, albums}
}