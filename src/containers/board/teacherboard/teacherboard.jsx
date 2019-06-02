//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';

//stylesheet
import style from 'containers/board/teacherboard/teacherboard.module.css'

const cx = classNames.bind(style);

class TeacherBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <div className="teacher-board">
                Teacher Board
            </div>
        );
    }
}
 
export default TeacherBoard;