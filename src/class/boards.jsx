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
} from "containers/board";

const Boards = ({boardNo}) => {
        return (
            <div className={('board-container')}>
                {(boardNo == 0) && (
                    <MainBoard/>
                )}
                {(boardNo == 1) && (
                    <NoticeBoard/>
                )}
                {(boardNo == 2) && (
                    <WorkBoard/>
                )}
                {(boardNo == 3) && (
                    <QnABoard/>
                )}
                {(boardNo == 4) && (
                    <LiveQuizBoard/>
                )}
                {(boardNo == 5) && (
                    <TeacherBoard/>
                )}
            </div>
        );
}

export default Boards;
