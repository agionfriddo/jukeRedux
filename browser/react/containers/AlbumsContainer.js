import {connect} from 'react-redux';
import Albums from '../components/Albums'
import {RECEIVE_ALBUMS} from '../../react/ourRedux.js'
import {fetchAlbumsFromServer} from '../ActionCreators'

const mapStateToProps = function (state, ownProps) {
  return {albumList: state.albumList};
};

const mapDispatchToProps = function (dispatch, ownProps) {
  //This returns an object. loadAlbums is a method of the object.
  return {
    loadAlbums(albums) {
      // fetchAlbums invoked, returns a function THUNK recognizes that dispatch has
      // been passed a function instead of a Action Obj, so it says, ' i better handle
      // this async shit' THUNK should handle passing the dispatch func to
      // fetchAlbums so that dispatch can be called when its time comes
      dispatch(fetchAlbumsFromServer());
    }
  }
}

const AlbumsContainer = connect(mapStateToProps, mapDispatchToProps)(Albums);

export default AlbumsContainer;

// when you invoke connect on a componenent, that component is turned into a
// stateful componenent which we then return to the App Container The
// AlbumsContainer has the load albums method, which is a dispatch method
//
