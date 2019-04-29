//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

//components
import Navigator from "components/exam/navigator";

//stylesheet
import style from "containers/exam.module.css";
const cx = classNames.bind(style);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fafafa", //"#FEDBD0",
      contrastText: "#000000" //"#442C2E"
    },
    secondary: {
      main: "#feeae6"
    }
  }
});

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={cx("class-container")}>
          <div className={cx("navigator")}>
            <Navigator />
          </div>
          <div className={cx("main-body")}>
            <div className={cx("board-menu")} />
            <div className={cx("board")} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Exam;
