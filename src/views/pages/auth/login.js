import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap'
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { ROUTER } from 'src/constants';
import { DASHBOARD } from 'src/constants/route';
import { auth } from 'src/firebase/firebase';
import { signIn } from "src/stores/actions/authActions";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    onSubmit = (e) => {
        const { email, password } = this.state;
        e.preventDefault();
        this.props.signIn({ email, password });
    }
    render() {
        const { authError } = this.props;
        const { email, password } = this.state;
        console.log(this.props.auth?.uid);
        return (
            <>
                {
                    this.props.auth?.uid ?
                        <Redirect to={ROUTER.DASHBOARD} />
                        :
                        <Card>
                            <Card.Body>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                                    </Form.Group>
                                    <Button className='w-100' type="submit">Sign In</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch((signIn(creds)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);