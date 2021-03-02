import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { SideBar, Header, Footer } from "./core";
import Dashboard from "./pages/dashboard";
import Attractions from "./pages/attractions";
import Login from "./pages/auth/login";
import { ROUTER } from 'src/constants';
import { connect } from "react-redux";
import ProtectRouter from './core/protect-router';
class App extends React.Component {
  render() {
    const { auth } = this.props;
    return (
        <div className="wrapper" >
          <Router>
            <Switch>
              <Route path={ROUTER.SIGN_IN}>
                <Login />
              </Route>
              <Route>
                <SideBar />
                <div className="main-panel">
                  <Header />
                  <div className="content">
                    <Route path={ROUTER.DASHBOARD}>
                      <Dashboard />
                    </Route>
                    <Route path={ROUTER.ATTRACTIONS}>
                      <Dashboard />
                    </Route>
                    <ProtectRouter path={ROUTER.ATTRACTIONS} component={Attractions} />
                  </div>
                  <Footer />
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
          auth: state.firebase.auth
  }
}
export default connect(mapStateToProps)(App);
