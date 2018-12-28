import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Tooltip,
} from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/fr';

import { getPlacesList, getAVote, getUserVoices } from '../actions';

import { PlaceCard, UsersVoices } from '.';
import { DisplayWinner, MailToButton, ButtonEndDate } from '..';
import { VoteMap } from '../../Map';
import { LoginModal } from '../../Accounts';

moment.locale('fr');

class AddAVoice extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/destructuring-assignment
    const { url } = this.props.match.params;
    const pseudo = localStorage.getItem('pseudo');
    const email = localStorage.getItem('email');
    const authenticatedStorage = localStorage.getItem('authenticated');
    const authenticated = JSON.parse(authenticatedStorage);
    const { getUserVoices: gUV } = this.props;

    // open a modal if user is not connected. User must give a pseudo and email to vote.
    let openLoginModal = false;
    if (!authenticated) {
      openLoginModal = true;
    } else {
      gUV(pseudo, email, [url]);
    }

    this.state = {
      openLoginModal,
      tooltipOpen: false,
    };

    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  componentDidMount() {
    const { getPlacesList: getPL } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const { url } = this.props.match.params;
    getPL(url);
  }

  componentDidUpdate() {
    // eslint-disable-next-line react/destructuring-assignment
    const { url } = this.props.match.params;
    const { getAVoteUrl, getAVote: getAV } = this.props;
    if (getAVoteUrl !== url) {
      getAV(url);
    }
  }

  toggleTooltip() {
    this.setState(
      prevState => ({
        tooltipOpen: !prevState
      })
    );
  }

  render() {
    const {
      restaurants,
      getVoicesCount,
      remainingTime,
      voteTitle,
      creatorPseudo,
      creatorEmail,
    } = this.props;
    const { openLoginModal, tooltipOpen } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    const { url } = this.props.match.params;
    // filter the list of restaurants with url parameter to display only one
    let listOfRestaurants;
    if (restaurants[url]) {
      listOfRestaurants = restaurants[url];
    } else {
      listOfRestaurants = [];
    }

    // Test if someone has voted
    let renderWhoHasVoted;
    if (getVoicesCount.length > 0) {
      const UsersVoicesCount = getVoicesCount.reduce((a, b) => ({ count: a.count + b.count }));
      if (UsersVoicesCount.count !== 0) {
        renderWhoHasVoted = (
          <Row className="justify-content-center">
            <Col
              className="bg-blue round-corners mt-3 p-1"
              xs="12"
              lg="8"
            >
              <UsersVoices
                voteUrl={url}
              />
            </Col>
          </Row>
        );
      }
    }

    // Display result if vote is finished
    let displayTrophy;
    if (moment(remainingTime) < moment()) {
      displayTrophy = <DisplayWinner />;
    }

    return (
      <Container fluid className="AddVoice">
        <Row className="justify-content-center">
          <Col
            xs="12"
            lg="8"
          >
            <h1 className="text-center text-white">
              {voteTitle}
              {' organisé par '}
              {creatorPseudo}
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            className="bg-blue round-corners p-3"
            xs="12"
            lg="8"
          >
            <ButtonGroup
              className="mr-2"
            >
              <Button
                disabled
              >
                {window.location.href}
              </Button>
              <CopyToClipboard text={window.location.href}>
                <Button
                  color="info"
                  id="TooltipCopyToClipBoard"
                >
                  <FontAwesomeIcon icon={faClipboard} />
                </Button>
              </CopyToClipboard>
            </ButtonGroup>
            <MailToButton className="mr-2" />
            <ButtonEndDate />
            <a href={`mailto:${creatorEmail}`}>
              <Button
                color="info"
                className="ml-2"
              >
                {'Contacte l\'organisateur'}
              </Button>
            </a>
          </Col>
        </Row>
        {displayTrophy}
        <Row className="justify-content-center pt-3">
          {listOfRestaurants.sort((a, b) => a.id - b.id).map(restaurant => (
            <PlaceCard
              key={restaurant.id}
              restaurant={restaurant}
              voteUrl={url}
            />
          ))}
        </Row>
        {renderWhoHasVoted}
        <Row
          className="justify-content-center align-items-center"
          noGutters
        >
          <Col
            xs="12"
            lg="8"
          >
            <VoteMap restaurants={listOfRestaurants} />
          </Col>
        </Row>
        {openLoginModal ? <LoginModal open voteUrl={url} /> : ''}
        <Tooltip
          placement="bottom"
          isOpen={tooltipOpen}
          target="TooltipCopyToClipBoard"
          toggle={this.toggleTooltip}
        >
          {'Copier vers le presse-papiers'}
        </Tooltip>
      </Container>
    );
  }
}

AddAVoice.propTypes = {
  getPlacesList: PropTypes.func.isRequired,
  getAVote: PropTypes.func.isRequired,
  getUserVoices: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired
    })
  }).isRequired,
  restaurants: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.object
    )
  ).isRequired,
  getAVoteUrl: PropTypes.string.isRequired,
  voteTitle: PropTypes.string.isRequired,
  creatorPseudo: PropTypes.string.isRequired,
  creatorEmail: PropTypes.string.isRequired,
  remainingTime: PropTypes.string.isRequired,
  getVoicesCount: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

const mstp = ({ getPlacesList: gPL, getAVote: gAV, getVoicesCount }) => ({
  restaurants: gPL.result,
  getAVoteUrl: gAV.url,
  remainingTime: gAV.end_date,
  voteTitle: gAV.title,
  creatorPseudo: gAV.pseudo,
  creatorEmail: gAV.email,
  getVoicesCount,
});

const mdtp = dispatch => bindActionCreators({ getAVote, getPlacesList, getUserVoices }, dispatch);

export default connect(mstp, mdtp)(AddAVoice);
