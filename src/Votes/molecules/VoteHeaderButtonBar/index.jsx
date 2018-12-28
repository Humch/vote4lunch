import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { HomeButton } from '../..';
import { LoginButton, LogoutButton } from '../../../Accounts';

const VoteHeaderButtonBar = ({ authenticated }) => (
  <div>
    <HomeButton />
    { authenticated ? <LogoutButton /> : <LoginButton /> }
  </div>
);

VoteHeaderButtonBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mstp = ({ userData }) => ({
  authenticated: userData.authenticated,
});

export default connect(mstp)(VoteHeaderButtonBar);
