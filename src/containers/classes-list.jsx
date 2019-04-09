//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//stylesheet
import styles from "containers/classes-list.css";

const cx = classNames.bind(styles);

class ClassesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isLogin, user } = this.props;

    return (
      <div>
        {isLogin && <h1>{user}의 클래스 목록입니다.</h1>}
        <ul>
          <li>
            <Link to="class">
              <a href="#" className={cx("dummy")}>
                Class Page
              </a>
            </Link>
          </li>
          <li>
            <Link to="exam">
              <a href="#" className={cx("dummy")}>
                Exam
              </a>
            </Link>
          </li>
        </ul>
      </div>
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
