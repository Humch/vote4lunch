import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import './LogoutButton.scss';

import { Button } from 'reactstrap';

import { resetUserData } from '../../actions';

const LogoutButton = ({ resetUserData: resetUD }) => (
  <Button
    className="LogoutButton"
    onClick={() => resetUD()}
  >
    <FontAwesomeIcon
      color="#C5FF19"
      icon={faPowerOff}
    />
  </Button>
);

LogoutButton.propTypes = {
  resetUserData: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({ resetUserData }, dispatch);

export default connect(null, mdtp)(LogoutButton);
