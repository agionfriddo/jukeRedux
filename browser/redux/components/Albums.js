import React, { Component } from 'react';
import {convertSong, convertAlbum} from '../../react/containers/AppContainer'
// gotta connect stuff, import albums container
class Albums extends Component
{
    componentDidMount () {
       fetch('/api/albums')
        .then(res => res.json())
        .then(albums => {
            albums = albums.map( album => convertAlbum(album))
            this.props.loadAlbums(albums)
        })
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
