import React, { Component } from 'react';
import {convertSong, convertAlbum} from '../../react/containers/AppContainer'
// gotta connect stuff, import albums container
class Albums extends Component
{
    componentDidMount () {
        //we're invoking loadAlbums without an arg this time
        //because albumArr yet. albumArr exists because of an async call
        // inside the fetchAlbums function which is invoked inside of loadAlbums
        this.props.loadAlbums()
    }

    render(){
        return (
             <div>
                <h3>Albums</h3>
                <div className="row">
                    {
                        this.props.albumList.map( anAlbum => (
                            <div key={anAlbum.id} className="col-xs-4">
                            <a className="thumbnail" href="#">
                                <img src= { anAlbum.imageUrl } />
                                <div className="caption">
                                <h5>
                                    <span> {anAlbum.name} </span>
                                </h5>
                                <small> {anAlbum.songs.length} </small>
                                </div>
                            </a>
                            </div>
                        ))
                    }
                </div>
            </div>
             )
        }

}

export default Albums;
