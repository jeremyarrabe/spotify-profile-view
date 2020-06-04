import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import './Top.scss';

const Top = ({ title, type, data }) => {
  if (type === 'tracks' && data.items) {
    return (
      <div className="top">
        <div className="top__nav">
          <h1>{title}</h1>

          <span>
            <Link to="/tracks" style={{ textDecoration: 'none' }}>
              SEE ALL
            </Link>
          </span>
        </div>

        <div className="top__container">
          {data.items.length > 0
            ? data.items.slice(0, 9).map((track) => {
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
            : ''}
        </div>
      </div>
    );
  }
  if (type === 'artist' && data.items) {
    return (
      <div className="top">
        <div className="top__nav">
          <h1>{title}</h1>

          <span>
            <Link to="/artist" style={{ textDecoration: 'none' }}>
              SEE ALL
            </Link>
          </span>
        </div>

        <div className="top__container">
          {data.items.length > 0
            ? data.items.slice(0, 9).map((artist) => {
                return (
                  <Card
                    key={artist.id}
                    title={artist.name}
                    cover={artist.images[1].url}
                    description={artist.type}
                    type={artist.type}
                  />
                );
              })
            : ''}
        </div>
      </div>
    );
  }
  return null;
};

Top.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
};

export default Top;
