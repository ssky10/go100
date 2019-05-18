import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import NotiIcon from "@material-ui/icons/Notifications";
import NotiOffIcon from "@material-ui/icons/NotificationsOff";
import {
  requestPermission,
  upDatePermissionState,
  deleteToken
} from "../push-notification";

//services
import * as service from "../services/users";

//components
import Template from "components/template";

//stores
import { notiRegister, notiUnRegister } from "../store/modules/auth";

class TemplateContainer extends React.Component {
  defaultProps = {};

  state = {};

  handleNotiToggle = () => {
    const { notiRegister, notiUnRegister, isNoti } = this.props;
    if (isNoti) {
      deleteToken().then(function(result) {
        if (result) {
          notiUnRegister();
        }
      });
    } else {
      requestPermission().then(function(params) {
        upDatePermissionState().then(function(permissionState) {
          if (permissionState.status) {
            service.sendToken(permissionState.token).then(function(response) {
              if (response.data.status) {
                notiRegister(permissionState.token);
              } else {
                deleteToken().then(function(result) {
                  if (result) {
                    notiUnRegister();
                  }
                });
                alert(response.data.msg);
              }
            });
          }
        });
      });
    }
  };

  render() {
    const { theme, drawer, title, menu, isLogin, user, isNoti } = this.props;

    const appBarMenu = (
      <div>
        {menu}
        <IconButton
          color="inherit"
          aria-label="set Notification"
          onClick={this.handleNotiToggle}
        >
          {isNoti ? <NotiIcon /> : <NotiOffIcon />}
        </IconButton>
      </div>
    );

    return (
      <Template
        theme={theme}
        drawer={drawer}
        title={title}
        menu={appBarMenu}
        isLogin={isLogin}
        user={user}
      >
        {this.props.children}
      </Template>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  // **** .get 을 사용해서 값 조회
  isNoti: auth.get("isNoti"),
  token: auth.get("token")
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  notiRegister: token => dispatch(notiRegister(token)),
  notiUnRegister: () => dispatch(notiUnRegister())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateContainer);
