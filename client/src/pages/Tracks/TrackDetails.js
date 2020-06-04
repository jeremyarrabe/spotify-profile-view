import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { HorizontalBar } from 'react-chartjs-2';

import { connect } from 'react-redux';
import { actions } from '../../redux/store';

import Nav from '../../components/Nav/Nav';
import './TrackDetails.scss';

class TrackDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { match, onGetAudioFeatures, onGetAudioAnalysis, onGetTrackDetails } = this.props;
    const { id } = match.params;
    onGetAudioFeatures(id);
    onGetAudioAnalysis(id);
    onGetTrackDetails(id);
  }

  render() {
    const { trackAudioFeatures, trackAudioAnalysis, trackDetails } = this.props;
    const data = {
      labels: [
        'Acousticness',
        'Danceability',
        'Instrumentalness',
        'Energy',
        'Liveness',
        'Valence',
        'Speechiness',
      ],

      datasets: [
        {
          label: 'Song Breakdown',
          backgroundColor: [
            'rgb(255, 120, 90,0.9)',
            'rgba(28, 93, 153,0.9)',
            'rgba(1, 186, 239, 0.9)',
            '#F9C784',
            '#E56399',
            '#00b894',
            '#6c5ce7',
          ],
          borderColor: 'rgb(18, 18, 18)',
          borderWidth: 1,
          hoverBackgroundColor: 'white',
          barPercentage: 0.5,
          barThickness: 6,

          minBarLength: 2,
          data: [
            trackAudioFeatures ? trackAudioFeatures.acousticness : 0,
            trackAudioFeatures ? trackAudioFeatures.danceability : 0,
            trackAudioFeatures ? trackAudioFeatures.instrumentalness : 0,
            trackAudioFeatures ? trackAudioFeatures.energy : 0,
            trackAudioFeatures ? trackAudioFeatures.liveness : 0,
            trackAudioFeatures ? trackAudioFeatures.valence : 0,
            trackAudioFeatures ? trackAudioFeatures.speechiness : 0,
          ],
        },
      ],
    };
    return (
      <div className="trackDetails">
        <Nav active={2} />
        <div className="trackDetails__container">
          <div className="trackDetails__leftInfo">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1>Back</h1>
            </Link>
            <div className="trackDetails__info">
              <img
                className="trackDetails__image"
                src={
                  trackDetails.album && trackDetails.album.images.length > 0
                    ? trackDetails.album.images[1].url
                    : ''
                }
                alt="album cover"
              />
              <div className="trackDetails__albumInfo">
                <h1 className="trackDetails__title">{trackDetails.name}</h1>
                <p className="trackDetails__artist">
                  {trackDetails.artists && trackDetails.artists.length > 0
                    ? trackDetails.artists[0].name
                    : 'none'}
                </p>
                <div className="trackDetails__infoContainer">
                  <div className="trackDetails__loudness">
                    <p className="trackDetails__count">
                      {trackAudioFeatures
                        ? `${
                            Math.round(trackAudioFeatures.loudness * 100 + Number.EPSILON) / 100
                          } DB`
                        : ''}
                    </p>
                    <p className="trackDetails__countTitle">Loudness</p>
                  </div>
                  <div className="trackDetails__tempo">
                    <p className="trackDetails__count">
                      {trackAudioFeatures
                        ? `${Math.round(trackAudioFeatures.tempo * 100 + Number.EPSILON) / 100} BPM`
                        : ''}
                    </p>
                    <p className="trackDetails__countTitle">Tempo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="trackDetails__rightInfo">
            <div className="trackDetails__graph">
              <h1 className="trackDetails__key">
                {trackAudioAnalysis.key ? `Key ${trackAudioAnalysis.key}` : 'Loading'}
              </h1>
              {trackAudioFeatures && trackAudioFeatures.speechiness ? (
                <HorizontalBar
                  data={data}
                  options={{
                    scales: {
                      xAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrackDetails.propTypes = {
  match: PropTypes.any.isRequired,
  trackAudioFeatures: PropTypes.any.isRequired,
  onGetAudioFeatures: PropTypes.func.isRequired,

  trackAudioAnalysis: PropTypes.any.isRequired,
  onGetAudioAnalysis: PropTypes.func.isRequired,

  trackDetails: PropTypes.any.isRequired,
  onGetTrackDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    trackAudioFeatures: state.trackAudioFeatures,
    trackAudioAnalysis: state.trackAudioAnalysis,
    trackDetails: state.trackDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAudioFeatures(id) {
      dispatch(actions.getAudioFeatures(id));
    },
    onGetAudioAnalysis(id) {
      dispatch(actions.getAudioAnalysis(id));
    },
    onGetTrackDetails(id) {
      dispatch(actions.getTrackDetails(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackDetails));
