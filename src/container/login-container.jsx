//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { Link, Redirect } from "react-router-dom";

//services
import * as service from "../services/users";

//stylesheet
import styles from "container/login-container.css";

//
const cx = classNames.bind(styles);
//const isLogin = false;

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      USER: "",
      PASSWORD: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    const setTrue = () => {
      this.setState({
        isLogin: true
      });
    };
    if (e.target.name === "login") {
      service
        .login(this.state.USER, this.state.PASSWORD)
        .then(function(response) {
          if (response.data.result) {
            alert(response.data.nickname + "님 환영합니다!");
            setTrue();
          } else {
            alert(response.data.msg);
          }
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (e.target.name === "guest") alert("게스트");
    e.preventDefault();
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  render() {
    return (
      <div>
        {this.state.isLogin && <Redirect to="/classeslist" />}
        <div className={cx("home")}>
          <div className={cx("login-container")}>
            <h2 className={cx("login-header")}>go100</h2>
            <form action="" onSubmit={this.handleSubmit} name="login">
              <input
                name="USER"
                type="text"
                placeholder="ENTER ID"
                value={this.state.USER}
                onChange={this.handleChange}
              />
              <input
                name="PASSWORD"
                type="password"
                placeholder="ENTER PASSWORD"
                value={this.state.PASSWORD}
                onChange={this.handleChange}
              />

              <button className={cx("btn-submit")} type="submit">
                SIGN IN
              </button>
            </form>
            <span className={cx("divider")}>OR</span>
            <form action="" onSubmit={this.handleSubmit} name="guest">
              <Link to="/classeslist">
                <button className={cx("btn-guest")} type="submit">
                  Enter to Guest
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
