import React, { Component } from 'react';

import { connect } from 'react-redux';
import { actions } from '../../redux/store';

import { API_URI } from '../../API';

import './Login.scss';

import Button from '../../components/Button/Button';

class Login extends Component {
  componentDidMount() {
    // Test
  }

  render() {
    return (
      <div className="login">
        <main className="login__main">
          <h1>Spotify Profile Info</h1>
          <div style={{ marginTop: '2rem' }} />
          <Button title="Log in to Spotify" modifier="fill" link={`${API_URI}/login`} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin(auth) {
      dispatch(actions.authChanged(auth));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
