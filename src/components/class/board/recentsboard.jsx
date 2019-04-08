//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//styles
import style from 'components/class/board/recentsboard.css';

const cx = classNames.bind(style);

class RecentsBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className={cx("recents")}>
                Recent Board
            </div>
        );
    }
}
 
export default RecentsBoard;