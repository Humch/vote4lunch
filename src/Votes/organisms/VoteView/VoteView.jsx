import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { VoteMap } from '../../../Map';
import { LoginModal } from '../../../Accounts';

import './VoteView.scss';

import { getAVote, getPlacesList, getUserVoices } from '../../actions';

class VoteView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openLoginModal: false,
    };
    this.openLoginModal = this.openLoginModal.bind(this);
  }

  componentDidMount() {
    const { getPlacesList: getPL } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const { url } = this.props.match.params;
    getPL(url);
    this.openLoginModal();
  }

  componentDidUpdate() {
    // eslint-disable-next-line react/destructuring-assignment
    const { url } = this.props.match.params;
    const {
      getAVoteUrl,
      getAVote: getAV,
      pseudo,
      email,
    } = this.props;
    const { openLoginModal } = this.state;
    if (getAVoteUrl !== url) {
      getAV(url);
    }
    if (pseudo === '' && email === '' && !openLoginModal) {
      this.openLoginModal();
    }
  }

  openLoginModal() {
    // eslint-disable-next-line react/destructuring-assignment
    const { url } = this.props.match.params;
    const { getUserVoices: gUV } = this.props;
    const pseudo = localStorage.getItem('pseudo');
    const email = localStorage.getItem('email');
    const authenticatedStorage = localStorage.getItem('authenticated');
    const authenticated = JSON.parse(authenticatedStorage);

    if (!authenticated) {
      this.setState({
        openLoginModal: true,
      });
    } else {
      gUV(pseudo, email, [url]);
    }
  }

  render() {
    const { openLoginModal } = this.state;
    const { places } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const { url } = this.props.match.params;
    // filter the list of restaurants with url parameter to display only one
    let listOfPlaces;
    if (places[url]) {
      listOfPlaces = places[url];
    } else {
      listOfPlaces = [];
    }
    return (
      <div className="VoteView">
        <VoteMap restaurants={listOfPlaces} />
        {openLoginModal ? <LoginModal open voteUrl={url} /> : ''}
      </div>
    );
  }
}

VoteView.propTypes = {
  getPlacesList: PropTypes.func.isRequired,
  getAVote: PropTypes.func.isRequired,
  getUserVoices: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired
    })
  }).isRequired,
  places: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired,
  getAVoteUrl: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mstp = ({ getPlacesList: gPL, getAVote: gAV, userData }) => ({
  places: gPL.result,
  getAVoteUrl: gAV.url,
  pseudo: userData.pseudo,
  email: userData.email,
});

const mdtp = dispatch => bindActionCreators({ getPlacesList, getAVote, getUserVoices }, dispatch);

export default connect(mstp, mdtp)(VoteView);
