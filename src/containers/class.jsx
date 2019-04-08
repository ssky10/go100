//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";

//components
import Navigator from "components/class/navigator";
import Boardmenu from "components/class/board-nav";

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
      <div className="class-container">
        <Navigator />
        <div className={cx("main-body")}>
          <div className={cx("main-top")}>
            <Boardmenu />
          </div>
        </div>
      </div>
    );
  }
}

export default Class;
