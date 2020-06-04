import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { actions } from '../../redux/store';

import Login from '../Login/Login';
import Callback from '../Callback/Callback';
import Home from '../Home/Home';
import Tracks from '../Tracks/Tracks';
import Artists from '../Artists/Artists';
import TrackDetails from '../Tracks/TrackDetails';

import { accessToken, refreshToken, expiresIn } from '../../API';

class App extends Component {
  componentDidMount() {
    this.initialCheck();
  }

  initialCheck = async () => {
    const { onCheckAuth, onGetNewToken, history, match } = this.props;
    console.log(match);
    if (accessToken() && refreshToken() && expiresIn()) {
      console.warn('Token exist, checking if valid...');

      if (Date.now() > parseInt(expiresIn(), 10)) {
        console.warn('TOKEN IS EXPIRING REQUESTING NEW TOKEN TO SERVER...');
        await onGetNewToken();
        history.push('/');
      } else if (
        accessToken() === 'undefined' ||
        refreshToken() === 'NaN' ||
        expiresIn() === 'undefined'
      ) {
        console.log('🔐');
      } else {
        const obj = {
          accessToken: accessToken(),
          refreshToken: refreshToken(),
          expiresIn: expiresIn(),
        };
        onCheckAuth(obj);
      }
    }
  };

  render() {
    const { auth, history } = this.props;
    return (
      <Switch>
        <Route
          path="/callback"
          exact
          component={() => {
            return <Callback history={history} />;
          }}
        />
        <ProtectedRoute path="/" auth={auth} component={Home} exact />
        <ProtectedRoute path="/tracks" auth={auth} component={Tracks} exact />
        <ProtectedRoute path="/tracks/:id" auth={auth} component={TrackDetails} exact />
        <ProtectedRoute path="/artists" auth={auth} component={Artists} exact />
        <ProtectedLogin path="/login" component={Login} auth={auth} exact />

        <Route path="/">
          <p>404 not found</p>
        </Route>
      </Switch>
    );
  }
}

const ProtectedRoute = ({ auth, component: Page, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return auth ? <Page /> : <Redirect to="/login" />;
      }}
    />
  );
};

const ProtectedLogin = ({ auth, component: Page, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return !auth ? <Page /> : <Redirect to="/" />;
      }}
    />
  );
};

App.propTypes = {
  auth: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  onCheckAuth: PropTypes.func.isRequired,
  onGetNewToken: PropTypes.func.isRequired,
};

ProtectedRoute.propTypes = {
  auth: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
};

ProtectedLogin.propTypes = {
  auth: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuth(obj) {
      dispatch(actions.checkAuth(obj));
    },
    onGetNewToken() {
      dispatch(actions.getNewToken());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
