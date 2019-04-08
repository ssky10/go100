//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//styles
import style from 'components/class/board/noticeboard.css';

const cx = classNames.bind(style);

class NoticeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="notice-board">
                Notice Board
            </div>
        );
    }
}
 
export default NoticeBoard;
