//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

//components
import Template from "components/template";

//stylesheet
import styles from "containers/classes-list.module.css";

const cx = classNames.bind(styles);

class ClassesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { theme, isLogin, user } = this.props;

    return (
      <Template theme={theme} title="클래스 목록">
        <div>
          {isLogin && <h1>{user}의 클래스 목록입니다.</h1>}
          <List component="nav">
            <ListItem button component={Link} to="class">
              <ListItemText primary="Class Page" />
            </ListItem>
            <ListItem button component={Link} to="exam">
              <ListItemText primary="Exam" />
            </ListItem>
          </List>
        </div>
      </Template>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  // **** .get 을 사용해서 값 조회
  isLogin: auth.get("isLogin"),
  user: auth.get("user")
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassesList);
