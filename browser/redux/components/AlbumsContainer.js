import { connect } from 'react-redux';
import Albums from './Albums'
import {RECEIVE_ALBUMS} from '../../react/ourRedux.js'
import { receiveAlbums } from '../ActionCreators'

const mapStateToProps = function (state, ownProps) {
    return {
        albumList: state.albumList
    };
};

const mapDispatchToProps = function(dispatch, ownProps){
    //This returns an object. loadAlbums is a method of the object.
    return {
        loadAlbums (albums){
            dispatch(receiveAlbums(albums));
        }
    }
}

const AlbumsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Albums);

export default AlbumsContainer;

// when you invoke connect on a componenent, that component is turned into
// a stateful componenent which we then return to the App Container

// The AlbumsContainer has the load albums method, which is a dispatch method
//
