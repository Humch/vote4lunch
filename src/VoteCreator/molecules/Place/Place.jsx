import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { ListGroupItem, Button } from 'reactstrap';

import { deleteAPlace } from '../../actions';

const Place = ({
  placeName,
  type,
  voteId,
  placeId,
  deleteAPlace: dAP,
}) => (
  <ListGroupItem>
    <p className="my-1">
      {type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />}
      { '' }
      {placeName}
      <span className="align-top">
        <Button
          color="danger"
          size="sm"
          className="float-right"
          onClick={() => dAP(voteId, placeId)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </span>

    </p>
  </ListGroupItem>
);

Place.propTypes = {
  placeName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  voteId: PropTypes.number.isRequired,
  placeId: PropTypes.number.isRequired,
  deleteAPlace: PropTypes.func.isRequired,
};

const mdtp = dispatch => bindActionCreators({ deleteAPlace }, dispatch);

export default connect(null, mdtp)(Place);
