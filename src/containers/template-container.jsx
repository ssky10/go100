import React from "react";
import IconButton from "@material-ui/core/IconButton";
import NotiIcon from "@material-ui/icons/Notifications";
import NotiOffIcon from "@material-ui/icons/NotificationsOff";
import {
  requestPermission,
  upDatePermissionState,
  deleteToken
} from "../push-notification";

import { saveNotiToken, getNotiToken } from "../localStorageAccess";

//services
import * as service from "../services/users";

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
    const { theme, drawer, title, menu, isLogin, user } = this.props;

    const appBarMenu = (
      <div>
        {menu}
        <IconButton
          color="inherit"
          aria-label="set Notification"
          onClick={this.handleNotiToggle}
        >
          {this.state.notiToken ? <NotiIcon /> : <NotiOffIcon />}
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

export default TemplateContainer;
