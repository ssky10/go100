//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//style
import style from 'components/class/board/workboard.css';

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