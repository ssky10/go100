import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";

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

const writeExam = ({
  classes,
  value,
  onChangeValue,
  onselectAnswer,
  onSubmit
}) => {
  return (
    <main className={classes.content}>
      <Paper className={classes.paper} elevation={1}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          문제 만들기
        </Typography>
      </Paper>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Paper className={classes.paper} elevation={1}>
          <form className={classes.form} onSubmit={onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <FormLabel component="legend">문제 유형</FormLabel>
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
              />

              <List className={classes.root}>
                {value.type === "choiceable" ? (
                  value.example.toArray().map((item, idx) => (
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
                  ))
                ) : (
                  <FormControl>
                    <Input
                      name="answer"
                      fullWidth
                      onChange={onChangeValue}
                      value={value.answer}
                    />
                  </FormControl>
                )}
              </List>
              <FormLabel component="legend">해설</FormLabel>
              <Editor
                id="explanation"
                onChange={onChangeValue}
                value={value.explanation}
                ableImg={false}
              />
              <Divider />
              <Button size="small" className={classes.button} type="submit">
                <CreateIcon />
                문제 제출하기
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Slide>
    </main>
  );
};

writeExam.propTypes = {
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

writeExam.defaultProps = {
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

export default withStyles(styles, { withTheme: true })(writeExam);
