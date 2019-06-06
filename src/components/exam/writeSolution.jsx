import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import BoldIcon from "@material-ui/icons/FormatBold";
import UnderLineIcon from "@material-ui/icons/FormatUnderlined";
import ItalicIcon from "@material-ui/icons/FormatItalic";
import FncIcon from "@material-ui/icons/Functions";

import Editor from "./editor";
import { Input } from "@material-ui/core";

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
  },
  example: {
    display: "-webkit-inline-box",
    width: "100%",
    fontSize: "inherit"
  },
  button: {
    width: "100%",
    marginTop: theme.spacing.unit * 2
  },
  exampleAnswer: {
    backgroundColor: "#FDCF56",
    "&:hover": {
      backgroundColor: "#FDCF56"
    },
    "&:focus": {
      backgroundColor: "#FDCF56"
    }
  }
});

const writeSolution = ({ classes, value, onChangeValue, onSubmit }) => {
  return (
    <main className={classes.content}>
      <Paper className={classes.paper} elevation={1}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          첨삭 작성하기
        </Typography>
      </Paper>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Paper className={classes.paper} elevation={1}>
          <form className={classes.form} onSubmit={onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <FormLabel component="legend">점수</FormLabel>
              <TextField
                label="0~10점"
                id="margin-dense"
                type="number"
                name="score"
                margin="dense"
                onChange={onChangeValue}
              />
              <FormLabel component="legend">첨삭내용</FormLabel>
              <Editor
                id="context"
                onChange={onChangeValue}
                value={value.context}
                ableImg={true}
              />
              <Divider />
              <Button size="small" className={classes.button} type="submit">
                <CreateIcon />
                첨삭완료
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Slide>
    </main>
  );
};

writeSolution.propTypes = {
  classes: PropTypes.object.isRequired,
  subject: PropTypes.string,
  question: PropTypes.string,
  value: PropTypes.string,
  changeValue: PropTypes.func,
  onclickExample: PropTypes.func,
  onclickBack: PropTypes.func,
  onclickNext: PropTypes.func,
  onSubmit: PropTypes.func,
  onChangeValue: PropTypes.func
};

writeSolution.defaultProps = {
  subject: "테스트 과목명",
  question: "문제가 나오는 부분",
  onclickExample: num => alert(num + "번 보기 선택"),
  examples: ["보기 1 번", "보기 2 번", "보기 3 번", "보기 4 번"],
  onclickBack: () => alert("이전 문제 클릭"),
  onclickNext: () => alert("다음 문제 클릭"),
  value: "choiceable",
  changeValue: () => alert("유형변경"),
  onSubmit: () => alert("전송")
};

export default withStyles(styles, { withTheme: true })(writeSolution);
