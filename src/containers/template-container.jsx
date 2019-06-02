import React from "react";
import { Redirect } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import NotiIcon from "@material-ui/icons/Notifications";
import NotiOffIcon from "@material-ui/icons/NotificationsOff";
import Tooltip from "@material-ui/core/Tooltip";
import {
  requestPermission,
  upDatePermissionState,
  deleteToken
} from "../push-notification";

import {
  saveNotiToken,
  getNotiToken,
  getToken,
  deleteStorage
} from "../localStorageAccess";

//services
import * as service from "../services/users";

import { useAuth } from "../context/loginProvider";

//components
import Template from "components/template";

class TemplateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notiToken: getNotiToken()
    };
  }

  setStateNotiToken = token => {
    this.setState({ notiToken: token });
  };

  handleNotiToggle = () => {
    const { token } = this.props;
    const { setStateNotiToken } = this;
    if (this.state.notiToken !== false) {
      service.deleteToken(token, this.state.notiToken).then(function(response) {
        if (response.data.status) {
          deleteToken().then(function(result) {
            if (result) {
              saveNotiToken("");
              setStateNotiToken(false);
            }
          });
        } else {
          alert(response.data.msg);
        }
      });
    } else {
      requestPermission().then(function(params) {
        upDatePermissionState().then(function(permissionState) {
          if (permissionState.status) {
            service
              .sendToken(token, permissionState.token)
              .then(function(response) {
                if (response.data.status) {
                  saveNotiToken(permissionState.token);
                  setStateNotiToken(permissionState.token);
                } else {
                  deleteToken().then(function(result) {
                    if (result) {
                      saveNotiToken("");
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
    const { theme, drawer, title, menu, isLogin, user, setLogout } = this.props;

    const handleLogout = () => {
      const token = getToken();
      if (token) {
        service.logout(token).then(function(response) {
          if (response.data.status) {
            deleteToken().then(function(result) {
              if (result) {
                deleteStorage();
                setLogout();
                return <Redirect to="/" />;
              }
            });
          }
        });
      }
    };

    const appBarMenu = (
      <div style={{ display: "inherit" }}>
        {menu}
        <Tooltip title={this.state.notiToken ? "알림취소" : "알림설정"}>
          <IconButton
            color="inherit"
            aria-label="set Notification"
            onClick={this.handleNotiToggle}
          >
            {this.state.notiToken ? <NotiIcon /> : <NotiOffIcon />}
          </IconButton>
        </Tooltip>
      </div>
    );

    return (
      <Template
        theme={theme}
        drawer={drawer}
        title={title}
        menu={appBarMenu}
        isLogin={isLogin}
        logout={handleLogout}
        user={user}
      >
        {this.props.children}
      </Template>
    );
  }
}

export default useAuth(TemplateContainer);
