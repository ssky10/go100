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
                Main Board
            </div>
        );
    }
}
 
export default MainBoard;