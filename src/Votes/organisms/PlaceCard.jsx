import MaterialIcon from 'material-icons-react';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/fr';

import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap';

import axios from 'axios';

import { VoteIcon } from '..';

import { getVoiceCount } from '../actions';
import { updateMapCoordinates } from '../../Map/actions';

moment.locale('fr');

class PlaceCard extends Component {
  constructor(props) {
    super(props);

    this.getVoteId = this.getVoteId.bind(this);

    this.state = {
      voteId: '',
    };
  }

  async componentDidMount() {
    const { voteUrl, restaurant, getVoiceCount: getVC } = this.props;

    await getVC(voteUrl, restaurant.id);
    await this.getVoteId();
  }

  async getVoteId() {
    const { voteUrl } = this.props;

    const voteId = await axios
      .get(`/api/vote/get?vote_url=${voteUrl}`)
      .then(result => result.data.id);
    await this.setState({
      voteId,
    });
  }

  render() {
    const {
      restaurant,
      voiceCount,
      userData,
      userVoices,
      remainingTime,
      updateMapCoordinates: updateMC,
    } = this.props;
    const { voteId } = this.state;
    // Control if the user has voted for the restaurant, if not, enable the button
    let disabledButton = false;
    let voted = false;

    // disable button if vote end date is exceeded
    const tooLate = moment(remainingTime).isBefore();
    if (tooLate) {
      disabledButton = true;
    }

    if (userVoices.result.length > 0) {
      const filteredUserVoices = userVoices.result
        .filter(
          element => parseInt(element.voteId, 10) === voteId
            && element.pseudo === userData.pseudo
            && element.email === userData.email
            && parseInt(element.placeId, 10) === restaurant.id
        );
      if (filteredUserVoices.length !== 0) {
        voted = true;
      }
    }

    // Get the number of voices for the place
    let filteredVoiceCountValue = { count: 0, place: restaurant.id };

    if (voiceCount.length > 0) {
      const filteredVoiceCount = voiceCount
        .filter(
          element => element.place === restaurant.id
          && element.voteId === voteId
        );

      if (filteredVoiceCount.length !== 0) {
        [filteredVoiceCountValue] = filteredVoiceCount;
      }
    }

    return (
      <Col
        xs="6"
        sm="4"
        lg="3"
        xl="2"
        className="PlaceCard"
      >
        <Card
          className="h-100"
        >
          <Button
            size="sm"
            className="float-right"
            color="info"
            onClick={() => updateMC(restaurant.lat, restaurant.lng, 18)}
          >
            {restaurant.type === 'restaurant' ? <MaterialIcon icon="restaurant" /> : <MaterialIcon icon="fastfood" />}
          </Button>
          <CardBody className="text-center d-flex flex-column">
            <CardTitle>
              {restaurant.name}
            </CardTitle>
            <CardText>
              {'Votes : '}
              {filteredVoiceCountValue.count}
            </CardText>
            <VoteIcon
              vote={voted}
              disable={disabledButton}
              placeId={restaurant.id}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

PlaceCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  voteUrl: PropTypes.string,
  voiceCount: PropTypes.arrayOf(PropTypes.object),
  userData: PropTypes.shape({
    pseudo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    authenticated: PropTypes.bool,
  }).isRequired,
  userVoices: PropTypes.shape({
    result: PropTypes.array.isRequired,
  }).isRequired,
  remainingTime: PropTypes.string.isRequired,
  updateMapCoordinates: PropTypes.func.isRequired,
  getVoiceCount: PropTypes.func.isRequired,
};

const mstp = ({
  getVoicesCount,
  userData,
  userVoices,
  getAVote,
}) => ({
  voiceCount: getVoicesCount,
  userData,
  userVoices,
  remainingTime: getAVote.end_date,
});

const mdtp = dispatch => bindActionCreators({
  updateMapCoordinates,
  getVoiceCount,
}, dispatch);

export default connect(mstp, mdtp)(PlaceCard);
