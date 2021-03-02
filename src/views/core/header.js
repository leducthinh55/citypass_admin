import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTER } from 'src/constants';
import { connect } from 'react-redux';
import { signOut } from 'src/stores/actions/authActions';
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

class Header extends Component {
    signOut = () => {
        this.props.signOut();
    }
    render() {
        const { auth } = this.props;
        return (
            <Navbar bg="light" expand="lg" >
                <Container fluid>
                    <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                        <Button
                            variant="dark"
                            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        >
                            <i className="fas fa-ellipsis-v"></i>
                        </Button>
                        <Navbar.Brand
                            href="#home"
                            onClick={(e) => e.preventDefault()}
                            className="mr-2"
                        >
                            City Pass
                        </Navbar.Brand>
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="nav mr-auto" navbar>
                            <Nav.Item>
                                <Nav.Link
                                    data-toggle="dropdown"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    className="m-0"
                                >
                                    <i className="nc-icon nc-palette"></i>
                                    <span className="d-lg-none ml-1">Dashboard</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Dropdown as={Nav.Item}>
                                <Dropdown.Toggle
                                    as={Nav.Link}
                                    data-toggle="dropdown"
                                    id="dropdown-67443507"
                                    variant="default"
                                    className="m-0"
                                >
                                    <i className="nc-icon nc-planet"></i>
                                    <span className="notification">5</span>
                                    <span className="d-lg-none ml-1">Notification</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Notification 1
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Notification 2
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Notification 3
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Notification 4
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Another notification
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Nav.Item>
                                <Nav.Link
                                    className="m-0"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <i className="nc-icon nc-zoom-split"></i>
                                    <span className="d-lg-block"> Search</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <Nav.Item>
                                <Nav.Link
                                    className="m-0"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <span className="no-icon">Account</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Dropdown as={Nav.Item}>
                                <Dropdown.Toggle
                                    aria-expanded={false}
                                    aria-haspopup={true}
                                    as={Nav.Link}
                                    data-toggle="dropdown"
                                    id="navbarDropdownMenuLink"
                                    variant="default"
                                    className="m-0"
                                >
                                    <span className="no-icon">Dropdown</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Action
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Another action
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Something
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Something else here
                                    </Dropdown.Item>
                                    <div className="divider"></div>
                                    <Dropdown.Item
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Separated link
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {auth.uid ?
                                <Nav.Item>
                                    <Nav.Link className="m-0" onClick={this.signOut}>
                                        <span className="no-icon">Log out</span>
                                    </Nav.Link>
                                </Nav.Item>
                                :
                                <Nav.Item>
                                    <Nav.Link className="m-0" href={ROUTER.SIGN_IN}>
                                        <span className="no-icon">Log in</span>
                                    </Nav.Link>
                                </Nav.Item>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

