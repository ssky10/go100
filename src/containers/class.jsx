//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";

//stylesheet
import style from "containers/class.css";

const cx = classNames.bind(style);

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>class page</div>;
  }
}

export default Class;
