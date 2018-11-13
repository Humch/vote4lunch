import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
} from 'reactstrap';

import { FormInputPseudo, FormInputEmail } from '..';

import { updateUserData } from '../actions';
import { getUserVoices } from '../../Votes/actions';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { open } = this.props;
    if (open) {
      this.toggle();
    }
  }

  componentDidUpdate() {
    const {
      pseudo,
      email,
      voteUrl,
      getUserVoices: getUV,
    } = this.props;
    const { modal } = this.state;
    if (!modal) {
      getUV(
        pseudo,
        email,
        [voteUrl]
      );
    }
  }

  toggle() {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  submitForm(e) {
    const { pseudo, email, updateUserData: updateUD } = this.props;
    e.preventDefault();
    localStorage.setItem('pseudo', pseudo);
    localStorage.setItem('email', email);
    this.setState({
      modal: false,
    });
    updateUD(pseudo, email);
  }

  render() {
    const { modal } = this.state;
    const { className } = this.props;
    return (
      <Modal isOpen={modal} className={className}>
        <ModalHeader>Présente toi avant de voter</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => this.submitForm(e)}>
            <FormInputPseudo />
            <FormInputEmail />
            <div className="text-center mt-5">
              <Button color="success">Bonjour</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  updateUserData: PropTypes.func,
  getUserVoices: PropTypes.func,
  open: PropTypes.bool,
  voteUrl: PropTypes.string,
  className: PropTypes.string,
  pseudo: PropTypes.string,
  email: PropTypes.string,
};

const mstp = ({ userData }) => ({
  pseudo: userData.pseudo,
  email: userData.email,
});

const mdtp = dispatch => bindActionCreators({ getUserVoices, updateUserData }, dispatch);

export default connect(mstp, mdtp)(LoginModal);
