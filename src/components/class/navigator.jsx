import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './navigator.module.css';

const cx = classNames.bind(style);

const Navigator = () => {
    return (
        <div className={cx('nav-header')}>
            <h2 className={cx('logo')}>
                Go100
            </h2>
            <input type="checkbox" className={cx('chk')}/>
            <label htmlFor="chk" className={cx('show-menu-btn')}>
                <i><FontAwesomeIcon icon="bars"/></i>
            </label>
            <ul className={cx('menu')}>
                <a href="#">Home</a>
                <a href="#">About</a>
                <label htmlFor="chk" className={cx('hide-menu-btn')}>
                    <i><FontAwesomeIcon icon="times"/></i>
                </label>
            </ul>
        </div>
    );
}
 
export default Navigator;