//node_modules
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
//stylesheet
import styles from 'container/classes-list.css';

const cx = classNames.bind(styles);

class ClassesList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <ul>
                    <li>
                        <Link to="class"><a href="#" className={cx('dummy')}>Class Page</a></Link>
                    </li>
                    <li>
                        <Link to="exam"><a href="#" className={cx('dummy')}>Exam</a></Link>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default ClassesList;