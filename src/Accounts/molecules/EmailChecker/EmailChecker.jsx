import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { ValueChecker } from '../../../Core';

const EmailChecker = ({ payload, loading }) => {
  let rendering = '';
  if (loading) {
    rendering = (
      <FontAwesomeIcon
        icon={faSpinner}
        spin
      />
    );
  } else if (!payload.exist) {
    rendering = <ValueChecker check />;
  } else {
    rendering = <ValueChecker check={false} />;
  }
  return (
    <span>
      { rendering }
    </span>
  );
};

EmailChecker.propTypes = {
  payload: PropTypes.shape({
    exist: PropTypes.bool.isRequired
  }),
  loading: PropTypes.bool.isRequired,
};

const mstp = ({ emailChecker }) => ({
  payload: emailChecker.payload,
  loading: emailChecker.loading,
});

export default connect(mstp)(EmailChecker);
