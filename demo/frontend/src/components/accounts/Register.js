import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";
import PropTypes from "prop-types";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    phone: null
  };
  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2, phone } = this.state;

    if (password != password2) {
      alert("passwond not same");
    } else {
      const newUser = {
        username,
        password,
        email,
        phone_number: phone
      };
      this.props.registerUser(newUser);
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (this.props.isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={this.state.username}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                maxLength={10}
                className="form-control"
                name="phone"
                onChange={this.onChange}
                value={this.state.phone}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={this.state.password2}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});
Register.propTypes = {
  isAuth: PropTypes.bool,
  registerUser: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
