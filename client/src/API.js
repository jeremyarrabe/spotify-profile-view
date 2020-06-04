export const API_URI =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api/spotify'
    : 'https://jemsalad.xyz/api/spotify';
// 'http://192.168.0.10:3001';
const SPOTIFY_URI = 'https://api.spotify.com/v1/me';

export const accessToken = () => {
  return window.localStorage.getItem('access_token');
};
export const refreshToken = () => {
  return window.localStorage.getItem('refresh_token');
};
export const expiresIn = () => {
  return window.localStorage.getItem('expires_in');
};
export const accessCode = () => {
  return window.localStorage.getItem('code');
};

const headers = {
  'content-type': 'application/json',
};

const getAccessToken = async () => {
  try {
    const data = { code: accessCode() };
    const response = await fetch(`${API_URI}/getToken`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.error) {
      return false;
    }
    window.localStorage.setItem('access_token', result.access_token);
    window.localStorage.setItem('refresh_token', result.refresh_token);
    window.localStorage.setItem('expires_in', Date.now() + result.expires_in * 1000); // convert it to milliseconds
    window.localStorage.removeItem('code');
    return result;
  } catch (err) {
    return err;
  }
};

const getRefreshToken = async () => {
  try {
    const data = { refresh_token: refreshToken() };

    const response = await fetch(`${API_URI}/refreshToken`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.error) {
      return false;
    }
    window.localStorage.clear();
    window.localStorage.setItem('access_token', result.access_token);
    window.localStorage.setItem('refresh_token', result.refresh_token);
    window.localStorage.setItem('expires_in', Date.now() + result.expires_in * 1000); // convert it to milliseconds
    return result;
  } catch (err) {
    return err;
  }
};

const getHomeData = async () => {
  try {
    const response = await fetch(`${SPOTIFY_URI}`, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

const getPlaylistData = async () => {
  try {
    const response = await fetch(`${SPOTIFY_URI}/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

const getFollowingArtistData = async () => {
  try {
    const response = await fetch(`${SPOTIFY_URI}/following?type=artist`, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

// https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=8&offset=0
const getTracks = async (limit) => {
  const value = limit || 18;

  try {
    const response = await fetch(
      `${SPOTIFY_URI}/top/tracks?time_range=long_term&limit=${value}&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

// https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=8&offset=0
const getArtist = async (limit) => {
  const value = limit || 18;
  try {
    const response = await fetch(
      `${SPOTIFY_URI}/top/artists?time_range=long_term&limit=${value}&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

// https://api.spotify.com/v1/audio-analysis/{id}
// https://api.spotify.com/v1/audio-features/id
// https://api.spotify.com/v1/tracks/{id}
const getAudioFeatures = async (id) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

const getAudioAnalysis = async (id) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const index = result.track.key;
    return { key: keys[index] };
    // return result.track;
  } catch (err) {
    return err;
  }
};

const getTrackDetails = async (id) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

export default {
  getAccessToken,
  getRefreshToken,
  getHomeData,
  getPlaylistData,
  getFollowingArtistData,
  getTracks,
  getArtist,
  getAudioFeatures,
  getAudioAnalysis,
  getTrackDetails,
};
