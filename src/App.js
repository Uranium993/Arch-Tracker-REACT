import React, { Fragment, useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth&form/Register";
import Login from "./components/auth&form/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Fails from "./components/auth&form/Fails";
import { UserContext } from "./actions/UserContext";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const adminCheck = true;

function App() {
  let username;

  if (localStorage.getItem("adminName")) {
    username = localStorage.getItem("adminName");
  } else {
    username = localStorage.getItem("editorName");
  }

  const [value, setValue] = useState({
    admin: Boolean,
    editor: Boolean,
    userName: username,
    error: Object,
  });

  const editorTokenAuth = !!localStorage.getItem("editorToken");
  const adminTokenAuth = !!localStorage.getItem("adminToken");

  //checks if admin exists and editor token

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ value, setValue }}>
        <Router>
          <Fragment>
            <Navbar
              adminExists={adminCheck}
              editorTokenAuth={editorTokenAuth}
              adminTokenAuth={adminTokenAuth}
            />

            <Route
              path="/"
              exact
              render={() => (
                <Landing
                  adminExists={adminCheck}
                  editorTokenAuth={editorTokenAuth}
                />
              )}
            />

            <section className="my-container">
              <Switch>
                <Route
                  path="/admin/register"
                  exact
                  render={() => {
                    return adminCheck ? (
                      <Fails adminExists={adminCheck} />
                    ) : (
                      <Register role={adminCheck ? "editor" : "admin"} />
                    );
                  }}
                />
                <Route
                  path="/user/register"
                  exact
                  render={() => {
                    return editorTokenAuth ? (
                      <Redirect to="/dashboard" />
                    ) : (
                      <Register role={editorTokenAuth ? null : "editor"} />
                    );
                  }}
                />
                <Route
                  path="/login"
                  auth={adminCheck}
                  render={() => (
                    <Login
                      token={editorTokenAuth}
                      adminToken={adminTokenAuth}
                      //error={value.error}
                    />
                  )}
                />

                <PrivateRoute
                  path="/dashboard"
                  auth={editorTokenAuth || adminTokenAuth}
                  exact
                  component={Dashboard}
                />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </UserContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

/* <div className="dashboard_container">
      <Dashboard />
    </div> */
