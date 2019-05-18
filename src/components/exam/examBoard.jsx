import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  paper: {
    height: "100%",
    padding: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1
  },
  title: {
    margin: 0
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

const ExamBoard = ({ subject, classes, question }) => {
  // if (!document.getElementById("jqMath")) {
  //   const scriptjqMath = document.createElement("script");
  //   scriptjqMath.id = "Mathjax";
  //   scriptjqMath.src =
  //     "//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";
  //   document.body.appendChild(scriptjqMath);
  // }

  return (
    <main className={classes.content}>
      <Paper className={classes.paper} elevation={1}>
        <Grid container spacing={8}>
          <Grid item xs={9}>
            <Typography className={classes.title} variant="h4" gutterBottom>
              {subject}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="문제번호"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper} elevation={1}>
        <Typography className={classes.title} variant="h6" gutterBottom>
          {subject}
        </Typography>
      </Paper>
    </main>
  );
};

ExamBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  subject: PropTypes.string,
  question: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(ExamBoard);
