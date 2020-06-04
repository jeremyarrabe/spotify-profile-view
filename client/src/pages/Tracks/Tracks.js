/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { actions } from '../../redux/store';

import Loader from '../../common/images/loader.gif';
import Nav from '../../components/Nav/Nav';
import Card from '../../components/Card/Card';
import './Tracks.scss';

class Tracks extends Component {
  componentDidMount() {
    this.loadTracks();
  }

  loadTracks = () => {
    const { onGetAllTracks } = this.props;
    onGetAllTracks();
  };

  loadMore = () => {
    const { tracks, onGetAllTracks } = this.props;
    const loadMore = tracks.limit + 12;
    onGetAllTracks(loadMore);
  };

  render() {
    const { tracks, isTracksLoadingMore } = this.props;
    return (
      <div className="tracks">
        <Nav active={2} />
        <div className="tracks__container">
          <h1>Top Tracks</h1>
          <div className="tracks__main">
            {tracks.items && tracks.items.length > 0
              ? tracks.items.map((track) => {
                  return (
                    <Card
                      key={track.id}
                      id={track.id}
                      title={track.name}
                      cover={track.album.images[1].url}
                      description={track.artists[0].name}
                      type={track.type}
                    />
                  );
                })
              : null}
          </div>
          <div className="tracks__pagination">
            {tracks.total !== tracks.limit ? (
              <button className="tracks__loadmore" onClick={this.loadMore} type="button">
                {isTracksLoadingMore ? (
                  <img id="loader" src={Loader} style={{ height: '16px' }} alt="loader" />
                ) : (
                  'Load More'
                )}
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

Tracks.propTypes = {
  tracks: PropTypes.any.isRequired,
  onGetAllTracks: PropTypes.any.isRequired,
  isTracksLoadingMore: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    isTracksLoadingMore: state.isTracksLoadingMore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllTracks(limit) {
      dispatch(actions.getTracks(limit));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
