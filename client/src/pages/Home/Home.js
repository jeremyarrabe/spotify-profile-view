import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { actions } from '../../redux/store';

import './Home.scss';

import Nav from '../../components/Nav/Nav';
import Profile from '../../components/Profile/Profile';
import Top from '../../components/Top/Top';

class Home extends Component {
  componentDidMount() {
    this.getHomeData();
  }

  getHomeData = async () => {
    const {
      onGetHomeData,
      onGetPlaylistCountData,
      onGetFollowingCountData,
      onGetTracks,
      onGetArtist,
    } = this.props;
    await onGetHomeData();
    await onGetPlaylistCountData();
    await onGetFollowingCountData();
    await onGetTracks();
    await onGetArtist();
  };

  render() {
    const {
      userData,
      playlistCountData,
      followingCountData,
      tracks,
      artist,
      onLogOut,
    } = this.props;

    return (
      <div className="home">
        <Nav active={1} />
        <div className="home__container">
          <Profile
            userData={userData}
            playlistData={playlistCountData}
            followedArtistData={followingCountData}
            onLogOut={onLogOut}
          />
          <Top title="Top Tracks" data={tracks} type="tracks" />
          <Top title="Top Artists" data={artist} type="artist" />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onGetHomeData: PropTypes.any.isRequired,
  userData: PropTypes.any.isRequired,

  onGetPlaylistCountData: PropTypes.any.isRequired,
  playlistCountData: PropTypes.any.isRequired,

  onGetFollowingCountData: PropTypes.any.isRequired,
  followingCountData: PropTypes.any.isRequired,

  tracks: PropTypes.any.isRequired,
  onGetTracks: PropTypes.any.isRequired,

  artist: PropTypes.any.isRequired,
  onGetArtist: PropTypes.any.isRequired,

  onLogOut: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    userData: state.userData,
    playlistCountData: state.playlistCountData,
    followingCountData: state.followingCountData,
    tracks: state.tracks,
    artist: state.artist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut() {
      dispatch(actions.logOut());
    },
    onGetHomeData() {
      dispatch(actions.getHomeData());
    },
    onGetPlaylistCountData() {
      dispatch(actions.getPlaylistCountData());
    },
    onGetFollowingCountData() {
      dispatch(actions.getFollowedArtistCountData());
    },
    onGetTracks(limit) {
      dispatch(actions.getTracks(limit));
    },
    onGetArtist(limit) {
      dispatch(actions.getArtist(limit));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
