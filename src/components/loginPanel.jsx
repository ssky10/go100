import React from "react";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

//stylesheet
import PropTypes from "prop-types";

const styles = theme => ({
  home: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  loginContainer: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  header: {
    fontFamily: "NanumSquare",
    fontWeight: "bold",
    background: "-webkit-linear-gradient(0deg, #007CFF 20%, #21CBF3 80%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textTransform: "uppercase",
    textAlign: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  input: { fontFamily: "NanumGothic" },
  submit: {
    marginTop: theme.spacing.unit * 3,
    background: "#2196F3",
    color: "#fff"
  },
  guest: {
    marginTop: theme.spacing.unit,
    background: "#43e58f",
    color: "#fff"
  },
  divider: {
    display: "block",
    position: "relative",
    top: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    fontSize: "25px",
    color: "#000",
    textAlign: "center"
  }
});

const LoginPanel = ({ ID, password, onSubmit, onChange, classes }) => {
  return (
    <div className={classes.home}>
      <CssBaseline />
      <Paper className={classes.loginContainer}>
        <Typography className={classes.header} variant="h2">
          go100
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} name="login">
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="id">ID</InputLabel>
            <Input
              id="id"
              name="ID"
              placeholder="ENTER ID"
              color="primary"
              autoFocus
              onChange={onChange}
              value={ID}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="PASSWORD"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="ENTER PASSWORD"
              onChange={onChange}
              value={password}
              className={classes.input}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
        <Divider className={classes.divider} variant="middle" />
        <form
          className={classes.form}
          action=""
          onSubmit="return false"
          name="guest"
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="classeslist"
            className={classes.guest}
          >
            Enter to Guest
          </Button>
        </form>
      </Paper>
    </div>
  );
};

LoginPanel.propTypes = {
  user: PropTypes.string,
  password: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

LoginPanel.defaultProps = {
  user: "",
  password: "",
  onSubmit: () => console.warn("onSubmit not defined"),
  onChange: () => console.warn("onChange not defined")
};

export default withStyles(styles)(LoginPanel);
