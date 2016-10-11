import { connect } from 'react-redux';

const mapStateToProps = function (state, ownProps) {
    return {
        albums: state.albums
    };
};

const mapDispatchToProps = function(dispatch, ownProps){
    //This returns an object. loadAlbums is a method of the object.
    return { 
        loadAlbums (albums){
            dispatch({ type: RECEIVE_ALBUMS, albums: albums});
        }
    }
}

const AlbumsContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
);

export default AlbumsContainer;