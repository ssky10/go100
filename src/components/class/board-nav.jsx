//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

//stylesheet
import styles from 'components/class/board-nav.css';

const cx = classNames.bind(styles);

class BoardNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTeacher : false
        };
    }
    render() {
        const isTeacher = this.state.isTeacher;

        let menu = null;
        if(isTeacher) {
            menu = <div className={cx("board-nav-body","board-nav-body-included-teacherMenu")}>
            <div id="noticeMenu"><p>공지사항</p></div>
            <div id="homeworkMenu"><p>과제</p></div>
            <div id="qnaMenu"><p>Q&A</p></div>
            <div id="quizMenu"><p>LiveQuiz</p></div>
            <div id="teacherMenu"><p>강사페이지</p></div>
        </div>
        }else{
            menu = <div className={cx("board-nav-body")}>
            <div id="noticeMenu"><p>공지사항</p></div>
            <div id="homeworkMenu"><p>과제</p></div>
            <div id="qnaMenu"><p>Q&A</p></div>
            <div id="quizMenu"><p>LiveQuiz</p></div>
        </div>
        }

        return (
            <div className={cx("board-nav-container")}>
                {menu}
            </div>
        );
    }
}
 
export default BoardNavigator;