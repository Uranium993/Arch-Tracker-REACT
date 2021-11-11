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
import { checkAdmin } from "./utils/setAuthToken";
import { UserContext } from "./actions/UserContext";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const initialState = {
  admin: false,
  editor: Boolean,
  userName: localStorage.getItem("editorName"),
  error: Object,
};

function App() {
  const [value, setValue] = useState(initialState);

  //checks if admin exists and editor token
  const adminExists = !!checkAdmin();
  const editorTokenAuth = !!localStorage.getItem("token");
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ value, setValue }}>
        <Router>
          <Fragment>
            <Navbar
              adminExists={adminExists}
              editorTokenAuth={editorTokenAuth}
            />

            <Route
              path="/"
              exact
              render={() => (
                <Landing
                  adminExists={adminExists}
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
                    return adminExists ? (
                      <Fails adminExists={adminExists} />
                    ) : (
                      <Register role={adminExists ? "editor" : "admin"} />
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
                  auth={adminExists}
                  render={() => <Login token={editorTokenAuth} />}
                />
                <PrivateRoute
                  path="/dashboard"
                  auth={editorTokenAuth}
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
