//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//stylesheet
import style from 'components/class/board/workboard.module.css';

const cx = classNames.bind(style);

class WorkBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="work-board">
                Work Board
            </div>
        );
    }
}
 
export default WorkBoard;