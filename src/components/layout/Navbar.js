import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "./AppBar";

import ScraperForm from "../auth&form/ScraperForm";
const Navbar = ({ adminExists, editorTokenAuth, adminTokenAuth }) => {
  //Test variables

  const guestLinks = (
    <ul>
      <li>
        <Link to="/user/register">Register</Link>
      </li>

      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const registerAdmin = <Link to="/admin/register">Register Admin</Link>;

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="far fa-calendar-alt"></i> Task Tracker
          </Link>
        </h1>
        <Fragment>
          {/* {!adminExists ? (
            registerAdmin
          ) : !editorTokenAuth && adminExists ? (
            guestLinks
          ) : (
          )} */}
          <ScraperForm />
          {!adminExists ? registerAdmin : null}
          {!adminTokenAuth && !editorTokenAuth ? guestLinks : null}
          {editorTokenAuth || adminTokenAuth ? <AppBar /> : null}
        </Fragment>
      </nav>
    </div>
  );
};

export default Navbar;
