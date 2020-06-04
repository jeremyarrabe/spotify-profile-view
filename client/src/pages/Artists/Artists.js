import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { actions } from '../../redux/store';

import Loader from '../../common/images/loader.gif';

import Nav from '../../components/Nav/Nav';
import Card from '../../components/Card/Card';
import './Artists.scss';

class Artists extends Component {
  componentDidMount() {
    this.loadTracks();
  }

  loadTracks = async () => {
    const { onGetAllArtists } = this.props;
    await onGetAllArtists();
  };

  loadMore = () => {
    const { artist, onGetAllArtists } = this.props;
    const loadMore = artist.limit + 12;
    onGetAllArtists(loadMore);
  };

  render() {
    const { artist, isArtistsLoadingMore } = this.props;
    return (
      <div className="artists">
        <Nav active={3} />
        <div className="artists__container">
          <h1>Top Artists</h1>
          <div className="artists__main">
            {artist.items && artist.items.length > 0
              ? artist.items.map((artists) => {
                  return (
                    <Card
                      key={artists.id}
                      title={artists.name}
                      cover={artists.images[1].url}
                      description={artists.type}
                      type={artists.type}
                    />
                  );
                })
              : null}
          </div>
          <div className="artists__pagination">
            {artist.total !== artist.limit ? (
              <button className="artists__loadmore" onClick={this.loadMore} type="button">
                {isArtistsLoadingMore ? (
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

Artists.propTypes = {
  artist: PropTypes.any.isRequired,
  onGetAllArtists: PropTypes.any.isRequired,
  isArtistsLoadingMore: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    artist: state.artist,
    isArtistsLoadingMore: state.isArtistsLoadingMore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllArtists(limit) {
      dispatch(actions.getArtist(limit));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
