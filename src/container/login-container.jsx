//node_modules
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

//services
import * as service from "../services/users";
import { login } from "../store/modules/auth";

//stylesheet
import LoginPanel from "../component/loginPanel";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USER: "",
      PASSWORD: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    const { login } = this.props;
    if (e.target.name === "login") {
      service
        .login(this.state.USER, this.state.PASSWORD)
        .then(function(response) {
          if (response.data.result) {
            alert(response.data.nickname + "님 환영합니다!");
            login(response.data.nickname);
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
    const { isLogin } = this.props;
    console.log(isLogin);
    return (
      <div>
        {isLogin && <Redirect to="/classeslist" />}
        <LoginPanel
          user={this.state.USER}
          password={this.state.PASSWORD}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  // **** .get 을 사용해서 값 조회
  isLogin: auth.get("isLogin"),
  user: auth.get("user")
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
