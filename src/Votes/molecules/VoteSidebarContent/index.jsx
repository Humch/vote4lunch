import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { VoteCard } from '../..';

const VoteSidebarContent = ({ places, getAVoteUrl }) => {
  // filter the list of restaurants with url parameter to display only one
  let listOfPlaces;
  if (places[getAVoteUrl]) {
    listOfPlaces = places[getAVoteUrl];
  } else {
    listOfPlaces = [];
  }
  return (
    <div>
      {listOfPlaces.sort((a, b) => a.id - b.id).map(restaurant => (
        <VoteCard
          className="text-white"
          key={restaurant.id}
          restaurant={restaurant}
          voteUrl={getAVoteUrl}
        />
      ))}
    </div>
  );
};

VoteSidebarContent.propTypes = {
  places: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired,
  getAVoteUrl: PropTypes.string.isRequired,
};

const mstp = ({ getPlacesList: gPL, getAVote: gAV, }) => ({
  places: gPL.result,
  getAVoteUrl: gAV.url,
});

export default connect(mstp)(VoteSidebarContent);
