import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTweet } from "../../actions/tweets"; // modify

class Form extends Component {
  state = {
    tweet: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const tweet = this.state.tweet;
    this.props.addTweet({
      tweet
    });
    this.setState({ [e.target.name]: "" });
  };
  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Tweet</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Tweet</label>
            <textarea
              className="form-control"
              type="text"
              name="tweet"
              onChange={this.onChange}
              value={this.state.tweet}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(
  mapStateToProps,
  { addTweet }
)(Form);
