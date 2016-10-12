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
                    <div className="col-xs-4">
                    <a className="thumbnail" href="#">
                        <img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMoneIMAGE&w=300&h=300" />
                        <div className="caption">
                        <h5>
                            <span>ALBUM ONE NAME HERE</span>
                        </h5>
                        <small>NUMBER OF SONGS HERE songs</small>
                        </div>
                    </a>
                    </div>
                    <div className="col-xs-4">
                    <a className="thumbnail" href="#">
                        <img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMtwoIMAGE&w=300&h=300" />
                        <div className="caption">
                        <h5>
                            <span>ALBUM TWO NAME HERE</span>
                        </h5>
                        <small>NUMBER OF SONGS HERE songs</small>
                        </div>
                    </a>
                    </div>
                </div>
            </div>
             )
        }

}

export default Albums;
