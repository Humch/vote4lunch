import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
  Tooltip,
} from 'reactstrap';

import MaterialIcon from 'material-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import Link from 'react-router-dom/Link';

import { TopAlert } from '../..';
import { updateUserData } from '../../../Accounts/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      tooltipOpen: false,
    };

    this.toggleHamburger = this.toggleHamburger.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  componentDidMount() {
    const { updateUserData: updateUD } = this.props;

    const getPseudo = localStorage.getItem('pseudo');
    const getEmail = localStorage.getItem('email');
    const getAuthenticated = localStorage.getItem('authenticated');
    if (getPseudo && getEmail && getAuthenticated) {
      const authenticated = JSON.parse(getAuthenticated);
      updateUD(getPseudo, getEmail, authenticated);
    }
  }

  toggleHamburger() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  toggleTooltip() {
    const { tooltipOpen } = this.state;
    this.setState({
      tooltipOpen: !tooltipOpen
    });
  }

  render() {
    const {
      isOpen,
      tooltipOpen,
    } = this.state;
    const {
      pseudo,
      authenticated,
    } = this.props;

    let renderBonjour;
    if (authenticated) {
      renderBonjour = (
        <NavItem className="mr-3 pt-1">
          <NavLink>
            {'Bonjour, '}
            {pseudo}
          </NavLink>
        </NavItem>
      );
    } else {
      renderBonjour = (
        <NavItem className="mr-3">
          <Button
            id="loginButton"
            color="success"
            className="mr-2"
            outline
            tag={Link}
            to="/signin"
          >
            {"S'identifier"}
          </Button>
          <Button
            id="signupButton"
            tag={Link}
            color="success"
            to="/signup"
          >
            {'S\'inscrire'}
          </Button>
        </NavItem>
      );
    }

    let renderButtonVote;
    let renderButtonLogout;
    if (authenticated) {
      if (window.innerWidth <= 768) {
        renderButtonVote = (
          <NavItem className="mr-3">
            <ButtonGroup>
              <Button
                tag={Link}
                color="info"
                to="/my-votes"
                href="#"
                id="TooltipMyVotes"
              >
                <MaterialIcon
                  icon="how_to_vote"
                  color="white"
                  size="tiny"
                />
              </Button>
              <Button
                id="logoutButton"
                tag={Link}
                color="danger"
                to="/logout"
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </Button>
            </ButtonGroup>
          </NavItem>
        );
        renderButtonLogout = '';
      } else {
        renderButtonVote = (
          <NavItem className="mr-3">
            <Button
              tag={Link}
              color="info"
              to="/my-votes"
              href="#"
              id="TooltipMyVotes"
            >
              <MaterialIcon
                icon="how_to_vote"
                color="white"
                size="tiny"
              />
            </Button>
          </NavItem>
        );
        renderButtonLogout = (
          <NavItem className="mr-3">
            <Button
              id="logoutButton"
              tag={Link}
              color="danger"
              to="/logout"
            >
              <FontAwesomeIcon icon={faPowerOff} />
            </Button>
          </NavItem>
        );
      }
    } else {
      renderButtonVote = '';
      renderButtonLogout = '';
    }

    return (
      <div className="Header">
        <TopAlert />
        <Navbar dark expand="md" className="bg-blue">
          <NavbarBrand href="/">Vote 4 Lunch</NavbarBrand>
          <NavbarToggler onClick={this.toggleHamburger} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {renderBonjour}
              {renderButtonVote}
              {renderButtonLogout}
            </Nav>
          </Collapse>
        </Navbar>
        {authenticated
          ? (
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpen}
              target="TooltipMyVotes"
              toggle={this.toggleTooltip}
            >
              {'Accéder à mes votes'}
            </Tooltip>
          )
          : ''}
      </div>
    );
  }
}

Header.propTypes = {
  updateUserData: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mstp = ({ userData }) => ({
  pseudo: userData.pseudo,
  authenticated: userData.authenticated,
});

const mdtp = dispatch => bindActionCreators({ updateUserData }, dispatch);

export default connect(mstp, mdtp)(Header);
