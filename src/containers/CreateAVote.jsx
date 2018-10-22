import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker } from 'react-dates'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { createAVote } from '../actions/createAVote'
import { saveVoteData } from '../actions'

class CreateAVote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            focused: null,
            pseudo: '',
            email: ''
        }
    }

    componentDidMount() {
        const get_pseudo = localStorage.getItem('pseudo')
        const get_email = localStorage.getItem('email')
        if (get_pseudo && get_email) {
            this.setState({
                pseudo: get_pseudo,
                email: get_email,
            })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange(date) {
        this.setState({
            date: date,
        })
    }

    submitForm(e) {
        e.preventDefault();
        this.props.createAVote(this.state.pseudo, this.state.email, this.state.date)
    }

    render() {

        let rendering = "C'est bon, je suis prêt"

        const { result, error, loading } = this.props
        if (result !== '' && result.createdAt) {
            this.props.saveVoteData(result.id, result.date, result.pseudo, result.email, result.url)
            localStorage.setItem('pseudo', result.pseudo)
            localStorage.setItem('email', result.email)
            return <Redirect to='/add-place' />
        } else if (loading) {
            rendering = <FontAwesomeIcon icon={faSpinner} spin />
        } else if (error) {
            console.log(error);

        }

        return (
            <Container fluid className="CreateAVote">
                <Row noGutters className="justify-content-center align-items-center h-100">
                    <Col
                        xs="12"
                        sm="8"
                        md="6"
                        xl="4"
                        className="bg-blue p-5 rounded"
                    >
                        <Form onSubmit={(e) => this.submitForm(e)}>
                            <FormGroup>
                                <Label className="text-white" for="pseudo">Choisis ta date</Label>
                                <div className='text-center'>
                                    <SingleDatePicker
                                        numberOfMonths={1}
                                        date={this.state.date}
                                        onDateChange={date => this.handleDateChange(date)}
                                        focused={this.state.focused}
                                        onFocusChange={({ focused }) =>
                                            this.setState({ focused })
                                        }
                                        openDirection="up"
                                        hideKeyboardShortcutsPanel={true}
                                        showDefaultInputIcon
                                        inputIconPosition="after"
                                        displayFormat="DD/MM/YYYY"
                                        required
                                    />
                                </div>

                            </FormGroup>
                            <FormGroup>
                                <Label className="text-white" for="pseudo">Indique ton pseudo</Label>
                                <Input
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    value={this.state.pseudo}
                                    onChange={(e) => this.handleChange(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-white" for="email">Indique ton email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={(e) => this.handleChange(e)}
                                    required
                                />
                            </FormGroup>
                            <div className="text-center mt-5">
                                <Button color="success">{rendering}</Button>
                            </div>

                        </Form>
                    </Col>

                </Row>
            </Container>);
    }
}

const mstp = ({ vote }) => ({
    result: vote.result,
    error: vote.error,
    loading: vote.loading
});

const mdtp = (dispatch) => {
    return bindActionCreators({ createAVote, saveVoteData }, dispatch);
}

export default connect(mstp, mdtp)(CreateAVote);