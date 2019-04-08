import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "./../../actions/auth";
class Header extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Title Here
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          />
          {!this.props.isAuth ? (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <span className="navbar-text mr-3">
                <strong>
                  Welcome{" "}
                  {this.props.user ? `${this.props.user.username}` : "User"}
                </strong>
              </span>
              <li className="nav-item">
                <button
                  onClick={this.onLogout}
                  className="nav-link btn btn-info btn-sm text-light"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
