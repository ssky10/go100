//node_modules
import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

//stylesheet
import styles from 'components/class/board-nav.css';

const cx = classNames.bind(styles);

const BoardNavigator = () => {

    return (
        <div className={cx("board-nav-container")}>
            <div className={cx("board-nav-body")}>
                <div id="aboutMenu"><p>소개</p></div>
                <div id="noticeMenu"><p>공지사항</p></div>
                <div id="curriMenu"><p>학사과정/교과</p></div>
                <div id="deptMenu"><p>학과소식</p></div>
                <div id="boardMenu"><p>게시판</p></div>
            </div>        
        </div>
    );
}
 
export default BoardNavigator;