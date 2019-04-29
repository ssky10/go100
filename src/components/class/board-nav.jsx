//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

//stylesheet
import styles from "components/class/board-nav.module.css";

const cx = classNames.bind(styles);

/*
User로부터 isTeacher 값 받아오기!!
*/
const BoardNavigator = ({onChangeBoard, isTeacher}) => {

  return (
    <div className={cx("board-nav-container")}>
      <div className={cx("board-nav-body")}>
        <div id="noticeMenu">
          <p>공지사항</p>
        </div>
        <div id="homeworkMenu">
          <p>과제</p>
        </div>
        <div id="qnaMenu">
          <p>Q&A</p>
        </div>
        <div id="quizMenu">
          <p>LiveQuiz</p>
        </div>
        {isTeacher && (
          <div id="teacherMenu">
            <p>강사페이지</p>
          </div>
        )}
      </div>
    </div>
  );
}



// class BoardNavigator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isTeacher:true
//     };
//   }
//   render() {
//     const isTeacher = this.state.isTeacher;

//     return (
//       <div className={cx("board-nav-container")}>
//         <div className={cx("board-nav-body")}>
//           <div id="noticeMenu">
//             <p>공지사항</p>
//           </div>
//           <div id="homeworkMenu">
//             <p>과제</p>
//           </div>
//           <div id="qnaMenu">
//             <p>Q&A</p>
//           </div>
//           <div id="quizMenu">
//             <p>LiveQuiz</p>
//           </div>
//           {isTeacher && (
//             <div id="teacherMenu">
//               <p>강사페이지</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

export default BoardNavigator;
