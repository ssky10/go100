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


//stylesheet
import style from "containers/boards-containers.module.css";

const cx = classNames.bind(style);

const Boards = ({boardNo}) => {
    
        return (
            <div className={cx('board-container')}>
                {(boardNo == 0) && (
                    <MainBoard
                        boardNo = {boardNo}
                    />
                )}
                {(boardNo == 1) && (
                    <NoticeBoard
                        boardIdx={boardNo}
                    />
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
