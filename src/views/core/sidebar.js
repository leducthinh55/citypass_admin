import React, { useState, useEffect } from 'react';
import { ROUTER } from 'src/constants';
// import NavLink from "../common/nav-link";
import { Nav } from 'react-bootstrap'
import Attractions from '../pages/attractions';
import Dashboard from '../pages/dashboard';
import { useLocation, NavLink } from "react-router-dom";

const routes = [
  {
    path: ROUTER.DASHBOARD,
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
  },
  {
    path: ROUTER.ATTRACTIONS,
    name: "Attractions",
    icon: "nc-icon nc-circle-09",
  },
  {
    path: ROUTER.TICKET_TYPE,
    name: "Ticket Type",
    icon: "nc-icon nc-notes",
  },
  {
    path: ROUTER.CITY,
    name: "City",
    icon: "nc-icon nc-notes",
  }
];
const SideBar = () => {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-color="black">
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + "src/assets/img/sidebar-1.png" + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("src/assets/img/reactlogo.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            CITY PASS
        </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={activeRoute(prop.path)}
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default SideBar;