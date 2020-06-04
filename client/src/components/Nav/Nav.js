/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import NavBtn from '../../common/images/nav.png';
import './Nav.scss';

const showMobileNav = () => {
  const mobileNav = document.querySelector('.mobileNav');
  if (mobileNav.classList.contains('animate__fadeOutRight')) {
    mobileNav.classList.remove('animate__fadeOutRight');
    mobileNav.classList.add('animate__fadeInRight');
    mobileNav.style.display = 'block';
  } else {
    mobileNav.classList.add('animate__fadeInRight');
    mobileNav.style.display = 'block';
  }
};

const closeMobileNav = () => {
  const mobileNav = document.querySelector('.mobileNav');

  if (mobileNav.classList.contains('animate__fadeInRight')) {
    mobileNav.classList.remove('animate__fadeInRight');
    mobileNav.classList.add('animate__fadeOutRight');
    mobileNav.style.display = 'none';
  } else {
    mobileNav.classList.add('animate__fadeOutRight');
    mobileNav.style.display = 'none';
  }
};

const Sidenav = ({ active }) => {
  return (
    <nav>
      <div className="mobileNav animate__animated   animate__faster	">
        <div className="mobileNav__container ">
          <div className="mobileNav__links">
            <ul>
              <button
                className="mobileNav__close animate__animated  animate__rotateIn "
                type="button"
                onClick={closeMobileNav}
              >
                <p>X</p>
              </button>
              <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMobileNav}>
                <li className={`list ${active === 1 ? 'list--active' : ''}`}>Profile</li>
              </Link>
              <Link to="/tracks" style={{ textDecoration: 'none' }} onClick={closeMobileNav}>
                <li className={`list ${active === 2 ? 'list--active' : ''}`}>Top Tracks</li>
              </Link>
              <Link to="/artists" style={{ textDecoration: 'none' }} onClick={closeMobileNav}>
                <li className={`list ${active === 3 ? 'list--active' : ''}`}>Top Artist</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="sidenav">
        <div className="sidenav__logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify-white"
            width="70%"
          />
        </div>
        <div className="sidenav__links">
          <ul>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <li className={`list ${active === 1 ? 'list--active' : ''}`}>Profile</li>
            </Link>
            <Link to="/tracks" style={{ textDecoration: 'none' }}>
              <li className={`list ${active === 2 ? 'list--active' : ''}`}>Top Tracks</li>
            </Link>
            <Link to="/artists" style={{ textDecoration: 'none' }}>
              <li className={`list ${active === 3 ? 'list--active' : ''}`}>Top Artist</li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="topnav">
        <div className="topnav__empty" />
        <div className="topnav__logo">
          <img
            src="https://seeklogo.net/wp-content/uploads/2017/01/spotify-logo.png"
            alt="spotify-white"
            width="70%"
          />
        </div>
        <div className="topnav__btn ">
          <a href="#" onClick={showMobileNav}>
            <img src={NavBtn} alt="nav" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Sidenav;
