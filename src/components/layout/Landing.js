import React from "react";
import { Link, Redirect } from "react-router-dom";

const Landing = ({ adminExists, editorTokenAuth }) => {
  console.log(adminExists, editorTokenAuth);

  if (editorTokenAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          {adminExists ? (
            <div className="landing-inner">
              <h1 className="x-large">Project Tracker</h1>

              <p className="lead">Register editor</p>
              <div className="buttons">
                <Link to="/user/register" className="btn btn-primary">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ margin: "10rem 20rem" }} className="landing-inner">
              <h1 className="x-large">Project Tracker</h1>

              <div className="buttons">
                <Link to="admin/register" className="btn btn-primary">
                  Sign Admin
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login Admin
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
