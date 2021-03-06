'use strict';

import React, { Component } from 'react';

import initialState from '../initialState';
import AUDIO from '../audio';

import Sidebar from '../components/Sidebar';
import Album from '../components/Album';
import Player from '../components/Player';
import AlbumsContainer from './AlbumsContainer'


export const convertSong = song => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};

export const convertAlbum = album => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  album.songs = album.songs.map(convertSong);
  return album;
};

const mod = (num, m) =>((num % m) + m) % m;

const skip = (interval, { currentSongList, currentSong }) => {
  let idx = currentSongList.map(song => song.id).indexOf(currentSong.id);
  idx = mod(idx + interval, currentSongList.length);
  const next = currentSongList[idx];
  return [next, currentSongList];
};

const mapStateToProps = function (state, ownProps){
  return state;
}

const mapDispatchToProps = function (dispatch, ownProps){
  //dispatchToProps should describe methods which we want to 
  //provide to our component, such as functions that are invoked onclick
  //action dispatches can be called inside action creators
  //a dispatch method should simply fire an action
  //the action can getState and make routing decisions about what 
  //actions to actually fire.
  
  return {
    invokePlay(){

    },
    invokePause(){
      dispatch();
    },
    invokeStartSong(){

      dispatch(startSong(song,list))
    },
  }
}



const connectedAppContainer = connect(mapStateToProps, mapDispatchToProps)
export default connectedAppContainer;



class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount () {
    fetch('/api/albums/1')
      .then(res => res.json())
      .then(album => this.onLoad(convertAlbum(album)));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }
  // an action that renders the current album that we just clicked on, probably
  onLoad (album) {
    this.setState({ album });
  }
  //sets state to play
  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }
 //sets state to pause
  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }
  // sets the state to what song we're playing and what list
  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({ currentSong, currentSongList });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  seek (decimal) {
    AUDIO.currentTime = AUDIO.duration * decimal;
    this.setProgress(AUDIO.currentTime / AUDIO.duration);
  }
  // updates the state every quarter second while played
  //is fired by audio.
  setProgress (progress) {
    this.setState({ progress });
  }

  render () {

    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar />
        </div>
        <div className="col-xs-10">
          <Album
            album={this.state.album}
            currentSong={this.state.currentSong}
            isPlaying={this.state.isPlaying}
            toggle={this.toggleOne}
          />
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
          scrub={evt => this.seek(evt.nativeEvent.offsetX / evt.target.clientWidth)}
        />
        <AlbumsContainer />
      </div>
    );
  }
}
