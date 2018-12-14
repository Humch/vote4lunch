import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap';

import { VoteCollapser } from './';

import { getUsersVotes, getUserVoices } from '../actions';

class GetUsersVotes extends Component {
  componentDidMount() {
    const { getUsersVotes: getUV } = this.props;
    const pseudo = localStorage.getItem('pseudo');
    getUV(pseudo);
  }

  componentDidUpdate() {
    const pseudo = localStorage.getItem('pseudo');
    const email = localStorage.getItem('email');
    const { usersVotes, getUserVoices: getUV } = this.props;
    const votesUrl = usersVotes
      .filter((vote) => {
        if (vote.active) {
          return true;
        }
        return false;
      })
      .map(vote => vote.url);
    getUV(pseudo, email, votesUrl);
  }

  render() {
    const { usersVotes } = this.props;

    let maxDate;
    if (usersVotes.length > 0) {
      maxDate = usersVotes[usersVotes.length - 1].date;
    }

    return (
      <Container fluid className="GetUserVotes">
        {
          usersVotes.map((vote) => {
            let maxDateValue = false;
            if (vote.date === maxDate) {
              maxDateValue = true;
            }
            if (vote.active) {
              return (<VoteCollapser
                key={vote.id}
                vote={vote}
                maxDate={maxDateValue}

              />);
            }
            return '';
          })
        }
      </Container>
    );
  }
}

GetUsersVotes.propTypes = {
  getUserVoices: PropTypes.func.isRequired,
  getUsersVotes: PropTypes.func.isRequired,
  usersVotes: PropTypes.arrayOf(PropTypes.object),
};

const mstp = ({ usersVotes }) => ({
  usersVotes,
});

const mdtp = dispatch => bindActionCreators({ getUserVoices, getUsersVotes }, dispatch);

export default connect(mstp, mdtp)(GetUsersVotes);
