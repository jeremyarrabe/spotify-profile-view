import React from 'react';
import PropTypes from 'prop-types';

import './Profile.scss';
import noUser from '../../common/images/nouser.png';
import Button from '../Button/Button';

const Profile = ({ userData, playlistData, followedArtistData, onLogOut }) => {
  return (
    <div className="profile">
      <img
        className="profile__image"
        src={
          // eslint-disable-next-line no-nested-ternary
          userData.images ? (userData.images.length > 0 ? userData.images[0].url : noUser) : noUser
        }
        alt="profile"
      />
      <div className="profile__info">
        <a
          href={!userData.external_urls ? 'www.spotify.com' : userData.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="profile__name"
        >
          {!userData.display_name ? 'Loading' : userData.display_name}
        </a>
        <div className="profile__logout">
          <Button modifier="outline" title="Logout" link="" onClick={onLogOut} />
        </div>
        <div className="profile__counter">
          <div className="profile__count">
            <span className="profile__number">
              {!followedArtistData.artists ? 0 : followedArtistData.artists.total}
            </span>
            <span className="profile__titles">Following</span>
          </div>
          <div className="profile__count">
            <span className="profile__number">
              {!userData.followers ? 0 : userData.followers.total}
            </span>
            <span className="profile__titles">Followers</span>
          </div>
          <div className="profile__count">
            <span className="profile__number">{!playlistData.total ? 0 : playlistData.total}</span>
            <span className="profile__titles">Playlist</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  userData: PropTypes.any.isRequired,
  playlistData: PropTypes.any.isRequired,
  followedArtistData: PropTypes.any.isRequired,
  onLogOut: PropTypes.any.isRequired,
};

export default Profile;
