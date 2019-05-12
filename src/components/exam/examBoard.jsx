import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  paper: {
    height: "100%"
  }
});

const ExamBoard = ({ subject, classes }) => {
  return (
    <main className={classes.content}>
      <Paper className={classes.paper} elevation={1}>
        {parseInt(subject / 100) === 0 && (
          <Typography paragraph>국어</Typography>
        )}
        {parseInt(subject / 100) === 1 && (
          <Typography paragraph>영어</Typography>
        )}
        {parseInt(subject / 100) === 2 && (
          <Typography paragraph>수학</Typography>
        )}
        {parseInt(subject / 100) === 3 && (
          <Typography paragraph>한국사</Typography>
        )}
        {parseInt(subject / 100) === 4 && (
          <Typography paragraph>사회</Typography>
        )}
        {parseInt(subject / 100) === 5 && (
          <Typography paragraph>과학</Typography>
        )}
      </Paper>
    </main>
  );
};

ExamBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  subject: PropTypes.number
};

export default withStyles(styles, { withTheme: true })(ExamBoard);
