import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { resetVoteData } from '../../VoteCreator/actions';

class LogoutView extends Component {
  componentDidMount() {
    const { resetVoteData: resetVD } = this.props;
    localStorage.removeItem('pseudo');
    localStorage.removeItem('email');
    resetVD();
  }

  render() {
    return (<Redirect to="/" />);
  }
}

LogoutView.propTypes = {
  resetVoteData: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({ resetVoteData }, dispatch);

export default connect(null, mdtp)(LogoutView);
