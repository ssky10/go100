//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";

//stylesheet
import style from "containers/exam.css";

const cx = classNames.bind(style);

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>exam page</div>;
  }
}

export default Exam;
