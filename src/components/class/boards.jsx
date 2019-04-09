//node_module
import React, { Component } from 'react';
import classNames from "classnames/bind";

//components
import {
    MainBoard, 
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
            isBoard: 0
        }
    }

    render() {
        const isBoard = this.state.isBoard;

        return (
            <div className={cx('board-container')}>
                {(isBoard == 0) && (
                    <MainBoard/>
                )}
                {(isBoard == 1) && (
                    <NoticeBoard/>
                )}
                {(isBoard == 2) && (
                    <WorkBoard/>
                )}
                {(isBoard == 3) && (
                    <QnABoard/>
                )}
                {(isBoard == 4) && (
                    <LiveQuizBoard/>
                )}
                {(isBoard == 5) && (
                    <TeacherBoard/>
                )}
            </div>
        );
    }
}
 
export default Boards;
