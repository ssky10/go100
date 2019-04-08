import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

//stylesheet
import styles from "./loginPanel.css";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const LoginPanel = ({ user, password, onSubmit, onChange }) => {
  return (
    <div className={cx("home")}>
      <div className={cx("login-container")}>
        <h2 className={cx("login-header")}>go100</h2>
        <form action="" onSubmit={onSubmit} name="login">
          <input
            name="USER"
            type="text"
            placeholder="ENTER ID"
            value={user}
            onChange={onChange}
          />
          <input
            name="PASSWORD"
            type="password"
            placeholder="ENTER PASSWORD"
            value={password}
            onChange={onChange}
          />

          <button className={cx("btn-submit")} type="submit">
            SIGN IN
          </button>
        </form>
        <span className={cx("divider")}>OR</span>
        <form action="" onSubmit={onSubmit} name="guest">
          <Link to="/classeslist">
            <button className={cx("btn-guest")} type="submit">
              Enter to Guest
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

LoginPanel.propTypes = {
  user: PropTypes.string,
  password: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

LoginPanel.defaultProps = {
  user: "",
  password: "",
  onSubmit: () => console.warn("onSubmit not defined"),
  onChange: () => console.warn("onChange not defined")
};

export default LoginPanel;
