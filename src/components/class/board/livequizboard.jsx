//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//style
import style from 'components/class/board/livequizboard.css'

const cx = classNames.bind(style);

class LiveQuizBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="livequiz-board">
                LiveQuiz Board
            </div>
        );
    }
}
 
export default LiveQuizBoard;