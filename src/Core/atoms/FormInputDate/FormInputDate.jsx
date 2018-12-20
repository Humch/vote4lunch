import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import { Label } from '../..';

import { formInputDate } from '../../actions';

const Date = ({ date, time, formInputDate: formInputDateFunc }) => (
  <div className="form-group">
    <Label color="white" forProp="date" text="Choisis la date de l'événement" />
    <InputGroup>
      <InputGroup>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={e => formInputDateFunc(e.target.value, time)}
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
          name="time"
          id="time"
          value={time}
          onChange={e => formInputDateFunc(date, e.target.value)}
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

  </div>
);

Date.propTypes = {
  formInputDate: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

const mstp = ({ voteDataForm }) => ({
  date: voteDataForm.date,
  time: voteDataForm.time,
});

const mdtp = dispatch => bindActionCreators({ formInputDate }, dispatch);

export default connect(mstp, mdtp)(Date);
