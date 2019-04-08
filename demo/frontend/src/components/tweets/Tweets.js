import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTweets, deleteTweet } from "../../actions/tweets"; // modify

class Tweets extends Component {
  componentDidMount() {
    this.props.getTweets();
  }
  onDelete = (id, e) => {
    e.preventDefault();
    this.props.deleteTweet(id);
  };
  render() {
    return (
      <div>
        <h2>Tweets</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tweet</th>
              <th>Created</th>
              <th>Updated</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.tweets.map(tweet => (
              <tr key={tweet.id}>
                <td>{tweet.tweet}</td>
                <td>{tweet.created_at}</td>
                <td>{tweet.updated_at}</td>
                <td>
                  <button
                    onClick={this.onDelete.bind(this, tweet.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Tweets.propTypes = {};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  tweets: state.tweets.tweets
});

export default connect(
  mapStateToProps,
  { getTweets, deleteTweet }
)(Tweets);
