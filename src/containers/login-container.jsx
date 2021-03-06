//node_modules
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

//services
import * as service from "../services/users";
import { storeLogin } from "../store/modules/auth";
import { LoginConsumer, useAuth } from "../context/loginProvider";

//components
import LoginPanel from "../components/loginPanel";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      PASSWORD: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    const { setLogin } = this.props;
    if (e.target.name === "login") {
      service
        .login(this.state.ID, this.state.PASSWORD)
        .then(function(response) {
          if (response.data.status) {
            alert(response.data.id + "님 환영합니다!");
            setLogin(response.data.user_token);
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
    console.log(target.value);
    this.setState({
      [name]: target.value
    });
  };

  render() {
    const { isLogin } = this.props;
    return (
      <div>
        {console.log(this.props)}
        {isLogin && <Redirect to="/classeslist" />}
        <LoginPanel
          ID={this.state.ID}
          password={this.state.PASSWORD}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <LoginConsumer>
          {
            ({state})=>(
              state.changePage('login')
            )
          }
        </LoginConsumer>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  // **** .get 을 사용해서 값 조회
  //isLogin: auth.get("isLogin"),
  ID: auth.get("ID")
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  storeLogin: ID => dispatch(storeLogin(ID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(useAuth(LoginContainer));
