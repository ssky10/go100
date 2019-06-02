//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//stylesheet
import style from 'containers/board/livequizboard/livequizboard.module.css'

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