import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap'
import { connect } from "react-redux";
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
        return (
            <>
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
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch((signIn(creds)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);