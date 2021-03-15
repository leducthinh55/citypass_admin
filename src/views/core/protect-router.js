import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ROUTER } from "src/constants";
import Attractions from '../pages/attractions';
class ProtectRouter extends React.Component {
    check = (props, children) => {
        const { auth } = this.props;
        if (auth.uid) {
            return (
                children
            );
        }
        else {
            return <Redirect to={{
                pathname: ROUTER.SIGN_IN,
                state: {
                    from: props.location
                }
            }} />
        }
    }
    render() {
        const { children , ...rest } = this.props;
        return (
            <Route {...rest} render={(props) => this.check(props, children)} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(ProtectRouter);