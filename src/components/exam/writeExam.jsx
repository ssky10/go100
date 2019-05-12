import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

const suggestions = [
  { label: "중등국어" },
  { label: "공통국어" },
  { label: "화법과 작문" },
  { label: "언어와 매체" },
  { label: "독서" },
  { label: "문학" },
  { label: "중등영어" },
  { label: "공통영어" },
  { label: "영어1" },
  { label: "영어2" },
  { label: "영어회화" },
  { label: "영어독해와 작문" },
  { label: "중등수학" },
  { label: "공통수학" },
  { label: "수학1" },
  { label: "수학2" },
  { label: "미적분" },
  { label: "확률과 통계" },
  { label: "중등역사" },
  { label: "한국사" },
  { label: "중등사회" },
  { label: "통합사회" },
  { label: "정치와 법" },
  { label: "경제" },
  { label: "사회/문화" },
  { label: "생활과 윤리" },
  { label: "중등과학" },
  { label: "통합과학" },
  { label: "물리1/2" },
  { label: "화학1/2" },
  { label: "생명1/2" },
  { label: "지구과학1/2" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

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
  this.state = {
    age: "",
    name: "hai",
    labelWidth: 0
  };
  return (
    <main className={classes.content}>
      <Paper className={classes.paper} elevation={1}>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            name="age"
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Placeholder
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>Placeholder</FormHelperText>
        </FormControl>
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
