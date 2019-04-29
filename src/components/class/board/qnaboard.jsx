//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//stylesheet
import style from 'components/class/board/qnaboard.module.css';

const cx = classNames.bind(style);

class QnABoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="qna-board">
                Q&A Board
            </div>
        );
    }
}
 
export default QnABoard;