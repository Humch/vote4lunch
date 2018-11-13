import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';

import { DisplayWinnerTrophy } from '..';

import { Title5 } from '../../Core';

const DisplayWinner = ({
  getAVoteId,
  getAVoteUrl,
  getVoicesCount,
  restaurants,
}) => {
  const getThisVoteCount = getVoicesCount.filter(e => e.voteId === getAVoteId);
  const maxVoices = Math.max(...getVoicesCount.map(o => o.count));
  const winner = getThisVoteCount.filter(e => e.count === maxVoices);

  let displayWinner;
  let emoji;
  if (winner.length === 1) {
    const getWinner = restaurants[getAVoteUrl].filter(e => e.id === winner[0].place);
    displayWinner = `Et le gagnant est : ${getWinner[0].name}`;
    emoji = 'trophy';
  } else if (winner.length === 2) {
    const getWinner0 = restaurants[getAVoteUrl].filter(e => e.id === winner[0].place);
    const getWinner1 = restaurants[getAVoteUrl].filter(e => e.id === winner[1].place);
    displayWinner = `Egalité entre : ${getWinner0[0].name} et ${getWinner1[0].name}`;
    emoji = 'surprise';
  } else if (winner.length > 2) {
    displayWinner = 'Aie aie aie, trop d\'égalité, personne ne sait où manger !!';
    emoji = 'sadtear';
  }

  return (
    <Row className="justify-content-center">
      <Col
        className="bg-blue round-corners mt-3 p-3"
        xs="12"
        lg="8"
      >
        <Row>
          <Col xs="3">
            <DisplayWinnerTrophy
              emoji={emoji}
            />
          </Col>
          <Col xs="6">
            <Title5
              content={displayWinner || ''}
              color="white"
              alignment="center"
            />
          </Col>
          <Col xs="3">
            <DisplayWinnerTrophy
              emoji={emoji}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

DisplayWinner.propTypes = {
  getAVoteId: PropTypes.number.isRequired,
  getAVoteUrl: PropTypes.string.isRequired,
  getVoicesCount: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  restaurants: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired,
};

const mstp = ({ getAVote, getVoicesCount, getPlacesList }) => ({
  getAVoteId: getAVote.id,
  getAVoteUrl: getAVote.url,
  getVoicesCount,
  restaurants: getPlacesList.result,
});

export default connect(mstp)(DisplayWinner);
