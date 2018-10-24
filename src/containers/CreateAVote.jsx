import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Row, Col, Button, Form } from 'reactstrap';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { createAVote } from '../actions/createAVote';
import { saveVoteData } from '../actions';

import Pseudo from './atoms/FormInput/Pseudo';
import Email from './atoms/FormInput/Email';
import Date from './atoms/FormInput/Date';
import EndDate from './atoms/FormInput/EndDate';

class CreateAVote extends Component {
  submitForm(e) {
    const { pseudo, email, date, endDate, endTime } = this.props;
    e.preventDefault();
    this.props.createAVote(
      pseudo,
      email,
      date,
      endDate,
      endTime);
  }

  render() {
    let rendering = "C'est bon, je suis prêt";

    const { result, error, loading } = this.props;
    if (result !== '' && result.createdAt) {
      this.props.saveVoteData(result.id, result.date, result.pseudo, result.email, result.url);
      localStorage.setItem('pseudo', result.pseudo);
      localStorage.setItem('email', result.email);
      return <Redirect to="/add-place" />;
    } else if (loading) {
      rendering = <FontAwesomeIcon icon={faSpinner} spin />;
    } else if (error) {
      console.log(error);
    }

    return (
      <Container fluid className="CreateAVote">
        <Row noGutters className="justify-content-center align-items-center h-100">
          <Col
            xs="12"
            sm="8"
            md="6"
            xl="4"
            className="bg-blue p-5 rounded"
          >
            <Form onSubmit={e => this.submitForm(e)}>
              <Date />
              <EndDate />
              <Pseudo />
              <Email />
              <div className="text-center mt-5">
                <Button color="success">{rendering}</Button>
              </div>

            </Form>
          </Col>

        </Row>
      </Container>);
  }
}

const mstp = ({ vote, voteDataForm }) => ({
  result: vote.result,
  error: vote.error,
  loading: vote.loading,
  pseudo: voteDataForm.pseudo,
  email: voteDataForm.email,
  date: voteDataForm.date,
  endDate: voteDataForm.endDate,
  endTime: voteDataForm.endTime,
});

const mdtp = dispatch => bindActionCreators({ createAVote, saveVoteData }, dispatch);

CreateAVote.propTypes = {
  createAVote: PropTypes.func.isRequired,
  result: PropTypes.any.isRequired,
  error: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  saveVoteData: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
};

export default connect(mstp, mdtp)(CreateAVote);
