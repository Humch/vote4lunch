import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

import { formInputEndDate } from '../actions';

const EndDate = ({ endDate, endTime, formInputEndDate: formInputEndDateFunc }) => (
  <FormGroup>
    <Label className="text-white" for="datetime">Choisis la fin du vote</Label>
    <InputGroup>
      <InputGroup>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={endDate}
          onChange={e => formInputEndDateFunc(e.target.value, endTime)}
          required
          className="form-control"
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <FontAwesomeIcon icon={faCalendar} />
          </InputGroupText>
        </InputGroupAddon>
        <input
          type="time"
          name="endTime"
          id="endTime"
          value={endTime}
          onChange={e => formInputEndDateFunc(endDate, e.target.value)}
          required
          className="form-control"
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <FontAwesomeIcon icon={faClock} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>

    </InputGroup>
  </FormGroup>
);

EndDate.propTypes = {
  endDate: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  formInputEndDate: PropTypes.func.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  endDate: voteDataForm.endDate,
  endTime: voteDataForm.endTime,
});

const mdtp = dispatch => bindActionCreators({ formInputEndDate }, dispatch);

export default connect(mstp, mdtp)(EndDate);
