//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { connect } from "react-redux";

//components
import Navigator from "components/class/navigator";
import Boardmenu from "components/class/board-nav";
import Boards from "components/class/boards"
//redux-store

import { chageBoard } from "store/modules/classboard";

// import {
//     MainBoard, 
//     NoticeBoard, 
//     WorkBoard, 
//     QnABoard, 
//     LiveQuizBoard,
//     TeacherBoard
// } from "components/class/board";

//stylesheet
import style from "containers/class.module.css";

const cx = classNames.bind(style);

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeacher: true,
      board: 0
    };
  }
  render() {
    const { board, onChangeBoard } = this.props;
    console.log("확인 : "+ board);
    return (
      <div className={cx("class-container")}>
        <div className={cx("navigator")}>
          <Navigator />
        </div>
        <div className={cx("main-body")}>
          <div className={cx("board-menu")}>
            <Boardmenu 
              onChangeBoard={onChangeBoard}
              isTearcher={this.state.isTeacher}
            />
          </div>
          <div className={cx("board")}>
            <Boards/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ classboard }) => ({
  board: classboard.get("board")
})

const mapDispathToProps = dispatch => ({
  onChangeBoard: board => dispatch(chageBoard(board))
})

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Class);

//export default Class;
