//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//stylesheet
import style from 'components/class/board/mainboard.module.css';

const cx = classNames.bind(style);

class MainBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className={cx("main-board")}>
                <div className={cx("recent-notice")}>
                    최근 공지
                </div>
                <div className={cx("recent-work")}>
                    최근 과제
                </div>
                <div className={cx("recent-qna")}>
                    최근 물음
                </div>
                <div className={cx("recent-livequiz")}>
                    최근 XX
                </div>
            </div>
        );
    }
}
 
export default MainBoard;