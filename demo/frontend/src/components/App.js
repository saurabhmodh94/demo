import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Header from "./layout/Header";
import Dashboard from "./tweets/Dashboard";

import store from "./../store";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
