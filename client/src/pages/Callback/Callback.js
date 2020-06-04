import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { actions } from '../../redux/store';

class Callback extends Component {
  componentDidMount() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    if (urlParams.has('code')) {
      const code = urlParams.get('code');
      this.getInfo(code);
    } else {
      const { history } = this.props;
      history.push('/');
    }
  }

  getInfo = async (code) => {
    const { onSetCode, onGetCode, history } = this.props;
    await onSetCode(code);
    await onGetCode();
    history.push('/');
  };

  render() {
    return <p>Loading Please wait</p>;
  }
}

Callback.propTypes = {
  onSetCode: PropTypes.func.isRequired,
  onGetCode: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
  return {
    code: state.code,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCode(code) {
      dispatch(actions.setCode(code));
    },
    onGetCode() {
      dispatch(actions.getCode());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
