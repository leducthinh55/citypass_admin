import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = (props) => {
    const location = useLocation();
    const isActive = location.pathname === props.to ? 'active' : '';
    return (
        <li className={isActive}>
            <Link {...props}>
                {props.children}
            </Link>
        </li>
    );
}

NavLink.contextTypes = {
    router: PropTypes.object
};

export default NavLink;