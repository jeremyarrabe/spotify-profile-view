import API from '../API';

const SET_CODE = 'SET_CODE';
const ON_GET_CODE = 'ON_GET_CODE';
const ON_GET_NEW_TOKEN = 'ON_GET_NEW_TOKEN';
const CHECK_AUTH = 'CHECK_AUTH';
const ON_LOG_OUT = 'ON_LOG_OUT';

const ON_GET_HOME_DATA = 'ON_GET_HOME_DATA';
const ON_GET_PLAYLIST_DATA = 'ON_GET_PLAYLIST_DATA';
const ON_GET_FOLLOWING_ARTIST_DATA = 'ON_GET_FOLLOWING_ARTIST_DATA ';
const ON_GET_TRACKS = 'ON_GET_TRACKS';
const ON_GET_ARTIST = 'ON_GET_ARTIST';

const ON_GET_AUDIO_FEATURES = 'ON_GET_AUDIO_FEATURES';
const ON_GET_AUDIO_ANALYSIS = 'ON_GET_AUDIO_ANALYSIS';
const ON_GET_TRACK_DETAILS = 'ON_GET_TRACK_DETAILS';

const initialState = {
  auth: false,
  // HOME PAGE STATES
  userData: {},
  playlistCountData: {},
  followingCountData: {},
  tracks: {},
  artist: {},
  // TRACKS PAGE STATES
  isTracksLoadingMore: false,
  // ARTISTS PAGE STATES
  isArtistsLoadingMore: false,
  // AUDIO FEATURES STATE
  trackAudioFeatures: {},
  trackAudioAnalysis: {},
  trackDetails: {},
};

export const actions = {
  // AUTHENTICATION STUFF
  setCode(code) {
    return {
      type: SET_CODE,
      code,
    };
  },
  getCode() {
    return {
      type: ON_GET_CODE,
      payload: API.getAccessToken(),
    };
  },
  getNewToken() {
    return {
      type: ON_GET_NEW_TOKEN,
      payload: API.getRefreshToken(),
    };
  },
  checkAuth(obj) {
    return {
      type: CHECK_AUTH,
      payload: {
        access_token: obj.accessToken,
        refresh_token: obj.refreshToken,
        expires_in: obj.expiresIn,
      },
    };
  },
  logOut() {
    return {
      type: ON_LOG_OUT,
      auth: false,
    };
  },
  // END OF AUTHENTICATION STUFF

  // HOME PAGE
  getHomeData() {
    return {
      type: ON_GET_HOME_DATA,
      payload: API.getHomeData(),
    };
  },
  getPlaylistCountData() {
    return {
      type: ON_GET_PLAYLIST_DATA,
      payload: API.getPlaylistData(),
    };
  },
  getFollowedArtistCountData() {
    return {
      type: ON_GET_FOLLOWING_ARTIST_DATA,
      payload: API.getFollowingArtistData(),
    };
  },
  // END OF HOME PAGE
  getTracks(limit) {
    return {
      type: ON_GET_TRACKS,
      payload: API.getTracks(limit),
    };
  },
  getArtist(limit) {
    return {
      type: ON_GET_ARTIST,
      payload: API.getArtist(limit),
    };
  },
  // TRACK DETAILS
  getTrackDetails(id) {
    return {
      type: ON_GET_TRACK_DETAILS,
      payload: API.getTrackDetails(id),
    };
  },
  getAudioFeatures(id) {
    return {
      type: ON_GET_AUDIO_FEATURES,
      payload: API.getAudioFeatures(id),
    };
  },
  getAudioAnalysis(id) {
    return {
      type: ON_GET_AUDIO_ANALYSIS,
      payload: API.getAudioAnalysis(id),
    };
  },
  // END OF TRACK DETAILS
};

// eslint-disable-next-line import/prefer-default-export
export function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    // AUTHENTICATION STUFF
    case SET_CODE:
      newState = { ...state };
      window.localStorage.setItem('code', action.code);
      return newState;

    case `${ON_GET_CODE}_FULFILLED`:
      newState = { ...state };
      newState.auth = action.payload;
      return newState;

    case `${ON_GET_NEW_TOKEN}_FULFILLED`:
      newState = { ...state };
      newState.auth = action.payload;
      return newState;

    case CHECK_AUTH:
      newState = { ...state };
      newState.auth = { ...action.payload };
      return newState;

    case ON_LOG_OUT:
      newState = { ...state };
      newState.auth = action.auth;
      window.localStorage.clear();
      return newState;
    // END OF AUTHENTICATION STUFF
    // HOME PAGE
    case `${ON_GET_HOME_DATA}_FULFILLED`:
      newState = { ...state };
      newState.userData = action.payload;
      return newState;

    case `${ON_GET_PLAYLIST_DATA}_FULFILLED`:
      newState = { ...state };
      newState.playlistCountData = action.payload;
      return newState;

    case `${ON_GET_FOLLOWING_ARTIST_DATA}_FULFILLED`:
      newState = { ...state };
      newState.followingCountData = action.payload;
      return newState;
    // END OF HOME PAGE
    // TRACKS PAGE
    case `${ON_GET_TRACKS}_PENDING`:
      newState = { ...state };
      newState.isTracksLoadingMore = true;
      return newState;
    case `${ON_GET_TRACKS}_FULFILLED`:
      newState = { ...state };
      newState.tracks = action.payload;
      newState.isTracksLoadingMore = false;
      return newState;

    // END OF TRACKS PAGE
    // ARTISTS PAGE
    case `${ON_GET_ARTIST}_PENDING`:
      newState = { ...state };
      newState.isArtistsLoadingMore = true;
      return newState;
    case `${ON_GET_ARTIST}_FULFILLED`:
      newState = { ...state };
      newState.artist = action.payload;
      newState.isArtistsLoadingMore = false;
      return newState;
    // END OF ARTISTS PAGE
    // AUDIO FEATURES & ANALYSIS

    case `${ON_GET_TRACK_DETAILS}_PENDING`:
      newState = { ...state };
      newState.trackDetails = {};
      return newState;
    case `${ON_GET_TRACK_DETAILS}_FULFILLED`:
      newState = { ...state };
      newState.trackDetails = action.payload;
      return newState;

    case `${ON_GET_AUDIO_FEATURES}_PENDING`:
      newState = { ...state };
      newState.trackAudioFeatures = {};
      return newState;

    case `${ON_GET_AUDIO_FEATURES}_FULFILLED`:
      newState = { ...state };
      newState.trackAudioFeatures = action.payload;
      return newState;

    case `${ON_GET_AUDIO_ANALYSIS}_PENDING`:
      newState = { ...state };
      newState.trackAudioAnalysis = {};
      return newState;

    case `${ON_GET_AUDIO_ANALYSIS}_FULFILLED`:
      newState = { ...state };
      newState.trackAudioAnalysis = action.payload;
      return newState;

    default:
      return state;
  }
}
