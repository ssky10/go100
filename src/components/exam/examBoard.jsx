import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

const ExamBoard = ({ subject, classes }) => {
  return (
    <main className={classes.content}>
      {parseInt(subject / 100) === 0 && <Typography paragraph>국어</Typography>}
      {parseInt(subject / 100) === 1 && <Typography paragraph>영어</Typography>}
      {parseInt(subject / 100) === 2 && <Typography paragraph>수학</Typography>}
      {parseInt(subject / 100) === 3 && (
        <Typography paragraph>한국사</Typography>
      )}
      {parseInt(subject / 100) === 4 && <Typography paragraph>사회</Typography>}
      {parseInt(subject / 100) === 5 && <Typography paragraph>과학</Typography>}
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
