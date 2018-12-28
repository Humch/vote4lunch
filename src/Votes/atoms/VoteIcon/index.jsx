import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as RegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';

import './VoteIcon.scss';

import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/fr';

import { addVoice, deleteVoice } from '../../actions';

moment.locale('fr');

class VoteIcon extends Component {
  constructor() {
    super();
    this.state = {
      vote: false,
    };
    this.voteOnClick = this.voteOnClick.bind(this);
    this.checkVote = this.checkVote.bind(this);
  }

  componentDidMount() {
    this.checkVote();
  }

  checkVote() {
    const { userVoices, placeId } = this.props;

    if (userVoices.length > 0) {
      const filteredUserVoices = userVoices
        .filter(element => parseInt(element.placeId, 10) === placeId);
      if (filteredUserVoices.length !== 0) {
        this.setState({
          vote: true,
        });
      }
    }
  }

  voteOnClick() {
    const {
      email,
      placeId,
      pseudo,
      voteUrl,
      addVoice: addV,
      deleteVoice: delV,
    } = this.props;
    const { vote } = this.state;

    if (!vote) {
      addV(voteUrl, placeId, pseudo, email);
    } else {
      delV(voteUrl, placeId, pseudo, email);
    }
    this.setState({
      vote: !vote,
    });
  }

  render() {
    const { remainingTime } = this.props;
    const { vote } = this.state;

    let disabledButton = false;

    // disable button if vote end date is exceeded
    const tooLate = moment(remainingTime).isBefore();
    if (tooLate) {
      disabledButton = true;
    }

    const className = `VoteIcon ${disabledButton ? 'disabled-icon' : ''}`;

    return (
      <FontAwesomeIcon
        color="#E82CA6"
        icon={vote ? SolidHeart : RegularHeart}
        size="lg"
        onClick={() => this.voteOnClick()}
        className={className}
      />
    );
  }
}

VoteIcon.propTypes = {
  addVoice: PropTypes.func.isRequired,
  deleteVoice: PropTypes.func.isRequired,
  email: PropTypes.string,
  pseudo: PropTypes.string,
  voteUrl: PropTypes.string.isRequired,
  placeId: PropTypes.number.isRequired,
  userVoices: PropTypes.arrayOf(PropTypes.object).isRequired,
  remainingTime: PropTypes.string.isRequired,
};

const mstp = ({
  getAVote,
  userData,
  userVoices,
}) => ({
  voteUrl: getAVote.url,
  voteId: getAVote.id,
  remainingTime: getAVote.end_date,
  pseudo: userData.pseudo,
  email: userData.email,
  userVoices: userVoices.result,
});

const mdtp = dispatch => bindActionCreators({
  addVoice,
  deleteVoice,
}, dispatch);

export default connect(mstp, mdtp)(VoteIcon);
