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
import CreateIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import BoldIcon from "@material-ui/icons/FormatBold";
import UnderLineIcon from "@material-ui/icons/FormatUnderlined";
import ItalicIcon from "@material-ui/icons/FormatItalic";
import FncIcon from "@material-ui/icons/Functions";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import NextIcon from "@material-ui/icons/ArrowForwardIos";
import Tooltip from "@material-ui/core/Tooltip";

import Editor from "../../../exam/editor";
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
  code: {
    margin: 0,
    color: "rgba(0,0,0,0.5)"
  },
  example: {
    display: "-webkit-inline-box",
    width: "100%",
    fontSize: "inherit"
  },
  submitButton: {
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

const makeQuiz = ({
  classes,
  value,
  onChangeValue,
  onclickBack,
  onclickNext,
  onselectAnswer,
  onclickAdd,
  onSubmit,
  isReset,
  title,
  idx
}) => {
  return (
    <main className={classes.content}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Paper className={classes.paper} elevation={1}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            <Input
              name="title"
              placeholder="퀴즈 제목"
              onChange={onChangeValue}
              value={title}
            />
            <Tooltip title="문항 추가하기">
              <IconButton aria-label="Create" onClick={onclickAdd}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </Paper>
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.code} variant="h6" gutterBottom>
              #{idx + 1}번
            </Typography>
            <FormControl margin="normal" required fullWidth>
              <FormLabel component="legend">문제 유형</FormLabel>
              {console.log(value)}
              <RadioGroup
                aria-label="문제 유형"
                name="type"
                className={classes.group}
                value={value.type}
                onChange={onChangeValue}
                row
              >
                <FormControlLabel
                  value="choiceable"
                  control={<Radio color="default" />}
                  label="객관식"
                />
                <FormControlLabel
                  value="non-choiceable"
                  control={<Radio color="default" />}
                  label="단답형"
                />
              </RadioGroup>
              <FormLabel component="legend">문제</FormLabel>
              <Editor
                id="context"
                onChange={onChangeValue}
                value={value.context}
                ableImg={true}
                isReset={isReset}
              />

              <List className={classes.root}>
                {value.example.toArray().map((item, idx) => (
                  <ListItem alignItems="flex-start">
                    <Chip
                      className={
                        idx === value.answer
                          ? `${classes.example} ${classes.exampleAnswer}`
                          : classes.example
                      }
                      avatar={<Avatar>{idx + 1}</Avatar>}
                      key={idx}
                      label={
                        <FormControl>
                          <Input
                            name={`example${idx}`}
                            fullWidth
                            onChange={onChangeValue}
                            value={item}
                          />
                        </FormControl>
                      }
                      onClick={() => onselectAnswer(idx)}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </FormControl>
          </Paper>
        </Slide>
        <Paper
          className={classes.paper}
          style={{ display: "flex" }}
          elevation={1}
        >
          <Button size="small" className={classes.button} onClick={onclickBack}>
            <BackIcon />
            이전문제
          </Button>
          <Button size="small" style={{ margin: "0 auto" }} type="submit">
            <CreateIcon />
            라이브퀴즈 생성하기
          </Button>
          <Button size="small" className={classes.button} onClick={onclickNext}>
            다음문제
            <NextIcon />
          </Button>
        </Paper>
      </form>
    </main>
  );
};

makeQuiz.propTypes = {
  classes: PropTypes.object.isRequired,
  subject: PropTypes.string,
  question: PropTypes.string,
  value: PropTypes.string,
  changeValue: PropTypes.func,
  onclickExample: PropTypes.func,
  onSubmit: PropTypes.func,
  onChangeValue: PropTypes.func
};

makeQuiz.defaultProps = {
  subject: "테스트 과목명",
  question: "문제가 나오는 부분",
  onclickExample: num => alert(num + "번 보기 선택"),
  examples: ["보기 1 번", "보기 2 번", "보기 3 번", "보기 4 번"],
  value: "choiceable",
  changeValue: () => alert("유형변경"),
  onSubmit: () => alert("전송")
};

export default withStyles(styles, { withTheme: true })(makeQuiz);
