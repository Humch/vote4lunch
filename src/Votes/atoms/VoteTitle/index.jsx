import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/fr';

import './VoteTitle.scss';

moment.locale('fr');

const VoteTitle = ({ voteTitle, creatorPseudo, date }) => {
  const rendezvous = moment(date).format('Do/MM/YYYY à h:mm');

  return (
    <h4 className="VoteTitle">
      {`${voteTitle} le ${rendezvous} par ${creatorPseudo}`}
    </h4>
  );
};

VoteTitle.propTypes = {
  voteTitle: PropTypes.string.isRequired,
  creatorPseudo: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

const mstp = ({ getAVote: gAV }) => ({
  voteTitle: gAV.title,
  creatorPseudo: gAV.pseudo,
  date: gAV.date,
});

export default connect(mstp)(VoteTitle);
