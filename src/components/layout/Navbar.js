import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "./AppBar";

const Navbar = ({ adminExists, editorTokenAuth }) => {
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
            <AppBar />
          )} */}

          {!adminExists ? registerAdmin : null}
          {adminExists && !editorTokenAuth ? guestLinks : null}
        </Fragment>
      </nav>
    </div>
  );
};

export default Navbar;
