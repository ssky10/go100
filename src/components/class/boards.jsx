//node_module
import React, { Component } from 'react';
import classNames from "classnames/bind";

//components
/*
import RecentBoard from "components/class/board/recentsboard";
import NoticeBoard from "components/class/board/noticeboard";
import WorkBoard from "components/class/board/workboard";
import QnABoard from "components/class/board/qnaboard";
import LiveQuizBoard from "components/class/board/livequizboard"
*/
import {
    RecentsBoard, 
    NoticeBoard, 
    WorkBoard, 
    QnABoard, 
    LiveQuizBoard,
    TeacherBoard
} from "components/class/board"
//stylesheet
import style from "components/class/boards.css";

const cx = classNames.bind(style);

class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecents: true,
            isNotice: false,
            isWork: false,
            isQnA: false,
            isLiveQuiz: false,
            isTeacher: false
        }
    }

    render() {
        const isRecents = this.state.isRecents;
        const isNotice = this.state.isNotice;
        const isWork = this.state.isWork;
        const isQnA = this.state.isQnA;
        const isLiveQuiz = this.state.isLiveQuiz;
        const isTeacher = this.state.isTeacher;

        return (
            <div className={cx('board-container')}>
                {isRecents && (
                    <RecentsBoard/>
                )}
                {isNotice && (
                    <NoticeBoard/>
                )}
                {isWork && (
                    <WorkBoard/>
                )}
                {isQnA && (
                    <QnABoard/>
                )}
                {isLiveQuiz && (
                    <LiveQuizBoard/>
                )}
                {isTeacher && (
                    <TeacherBoard/>
                )}
            </div>
        );
    }
}
 
export default Boards;
