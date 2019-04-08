//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";

//components
import Navigator from "components/class/navigator";
import Boardmenu from "components/class/board-nav";
import Board from "components/class/boards";

//stylesheet
import style from "containers/class.css";

const cx = classNames.bind(style);

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={cx("class-container")}>
        <div className={cx("navigator")}>
          <Navigator />
        </div>
        <div className={cx("main-body")}>
          <div className={cx("board-menu")}>
            <Boardmenu />
          </div>
          <div className={cx("board")}>
            <Board />
          </div>
        </div>
      </div>
    );
  }
}

export default Class;
