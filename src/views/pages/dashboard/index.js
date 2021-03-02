import React, { Component } from 'react';
import { connect } from 'react-redux';
class Dashboard extends Component {
    render() {
        return (
            <div>
                <h3>dashbofsafdasfdasard</h3>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(Dashboard);