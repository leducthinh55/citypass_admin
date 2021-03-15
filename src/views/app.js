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
import AttractionCreateUpdate from "./pages/attractions/create-update";
import Login from "./pages/auth/login";
import City from "./pages/city";
import TicketTypes from "./pages/ticket-type";
import { ROUTER } from 'src/constants';
import { connect } from "react-redux";
import ProtectRouter from './core/protect-router';
import { Container, Row, Col } from 'react-bootstrap'
const createBrowserHistory = require("history").createBrowserHistory;
const history = createBrowserHistory();
class App extends React.Component {
  render() {
    const { auth } = this.props;
    return (
      <div className="wrapper" >
        <Router history={history}>
          <Switch>
            <Route path={ROUTER.SIGN_IN}>
              <Login />
            </Route>
            <Route>
              <SideBar />
              <div className="main-panel">
                <Header />
                <div className="content">
                  <Container fluid>
                    <Row>
                      <Col md="12">
                        <Switch>
                          <ProtectRouter exact path={ROUTER.DASHBOARD}>
                            <Dashboard />
                          </ProtectRouter>
                          <ProtectRouter exact path={ROUTER.ATTRACTIONS}>
                            <Attractions />
                          </ProtectRouter>
                          <ProtectRouter exact path={ROUTER.ATTRACTIONS_CREATE}>
                            <AttractionCreateUpdate />
                          </ProtectRouter>
                          <ProtectRouter exact path={ROUTER.ATTRACTIONS_UPDATE}>
                            <AttractionCreateUpdate />
                          </ProtectRouter>
                          <ProtectRouter exact path={ROUTER.TICKET_TYPE}>
                            <TicketTypes />
                          </ProtectRouter>
                          <ProtectRouter exact path={ROUTER.CITY}>
                            <City />
                          </ProtectRouter>
                          <Redirect from='*' to={ROUTER.DASHBOARD} />
                        </Switch>
                      </Col>
                    </Row>
                  </Container>
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
