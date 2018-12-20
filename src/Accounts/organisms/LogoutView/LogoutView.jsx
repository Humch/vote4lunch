import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { resetVoteData } from '../../../VoteCreator/actions';
import { resetUserData } from '../../actions';

class LogoutView extends Component {
  componentDidMount() {
    const { resetVoteData: resetVD, resetUserData: resetUD } = this.props;
    localStorage.removeItem('pseudo');
    localStorage.removeItem('email');
    localStorage.removeItem('authenticated');
    resetVD();
    resetUD();
  }

  render() {
    return (<Redirect to="/" />);
  }
}

LogoutView.propTypes = {
  resetVoteData: PropTypes.func.isRequired,
  resetUserData: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({ resetVoteData, resetUserData }, dispatch);

export default connect(null, mdtp)(LogoutView);
