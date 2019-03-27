//node_modules
import React, { Component } from 'react';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

//stylesheet
import styles from 'container/login-container.css';

//
const cx = classNames.bind(styles);

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            USER:'',
            PASSWORD:''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (e) => {
        if(e.target.name==='login')
            alert("로그인\n"+"USER : "+this.state.USER+"\nPASSWORD : "+this.state.PASSWORD);
        else if(e.target.name==='guest')
            alert("게스트");
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    render() { 
        return (
            <div className={cx('home')}>
                <div className={cx('login-container')}>
                    <h2 className={cx('login-header')} >go100</h2>
                    <form action="" onSubmit={this.handleSubmit} name="login">
                        <input name="USER" type="text" placeholder="ENTER E-MAIL" value={this.state.USER} onChange={this.handleChange}/>
                        <input name="PASSWORD" type="password" placeholder="ENTER PASSWORD" value={this.state.PASSWORD} onChange={this.handleChange}/>
                        <Link to="/classeslist">
                            <button className={cx('btn-submit')} type="submit">SIGN IN</button>
                        </Link>
                    </form>
                    <span className={cx('divider')}>OR</span>
                    <form action="" onSubmit={this.handleSubmit} name="guest">
                        <Link to="/classeslist">
                        <button className={cx('btn-guest')} type="submit">Enter to Guest</button>                    
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default LoginContainer;