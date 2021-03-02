import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ROUTER } from "src/constants";
import Attractions from '../pages/attractions';
class ProtectRouter extends React.Component {
    check = (props) => {
        const { auth } = this.props;
        if (auth.uid) {
            return (
                <Component {...props} />
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
        const { children, ...rest } = this.props;
        console.log('props', this.props);
        console.log(children);
        return (
            <Route path='/Attractions' render={this.check} />
        );
    }
}

// function ProtectRouter({ children, ...rest }) {
//     let auth = { a: '5' };
//     return (
//         <Route
//             path='/Attractions'
//             render={({ location }) => {
//                 console.log('location', location);
//                 return auth.user ? (
//                     children
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/signin",
//                                 state: { from: location }
//                             }}
//                         />
//                     )}
//                 }
//         />
//     );
// }

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(ProtectRouter);