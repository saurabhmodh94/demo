import React, { Component } from "react";
import PropTypes from "prop-types";
import Tweets from "./Tweets";
import Form from "./Form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    if (!this.props.isAuth) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Form />
        <Tweets />
      </div>
    );
  }
}

Dashboard.propTypes = {};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
