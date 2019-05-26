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
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import NextIcon from "@material-ui/icons/ArrowForwardIos";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import SadIcon from "@material-ui/icons/SentimentDissatisfied";
import GoodIcon from "@material-ui/icons/ThumbUpAlt";

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
  }
});

const ExamBoard = ({
  subject,
  classes,
  question,
  onclickExample,
  onclickBack,
  onclickNext,
  onclickCreate
}) => {
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
        <Typography className={classes.title} variant="h4" gutterBottom>
          {subject}
          {subject !== "오답노트" && (
            <Tooltip title="문제 만들기">
              <IconButton aria-label="Create" onClick={onclickCreate}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
      </Paper>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Paper className={classes.paper} elevation={1}>
          {question === false ? (
            <div style={{ textAlign: "center" }}>
              {subject === "오답노트" ? (
                <GoodIcon
                  style={{ fontSize: "15em", color: "rgba(0,0,0,0.1)" }}
                />
              ) : (
                <SadIcon
                  style={{ fontSize: "15em", color: "rgba(0,0,0,0.1)" }}
                />
              )}
              <Typography className={classes.title} variant="h6" gutterBottom>
                {subject === "오답노트"
                  ? "현재 틀린문제가 없어요!"
                  : "현재 만들어진 문제가 없어요.... 문제를 만들어 주세요!"}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography className={classes.code} variant="h6" gutterBottom>
                #{question.get("code")}
              </Typography>
              <Typography className={classes.title} variant="h6" gutterBottom>
                {question.get("context")}
              </Typography>
              {question.get("choiceable") ? (
                <List className={classes.root}>
                  <ListItem alignItems="flex-start">
                    <Chip
                      className={classes.example}
                      avatar={<Avatar>1</Avatar>}
                      onClick={() =>
                        onclickExample(question.get("example")[0].code)
                      }
                      label={question.get("example")[0].context}
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <Chip
                      className={classes.example}
                      avatar={<Avatar>2</Avatar>}
                      onClick={() =>
                        onclickExample(question.get("example")[1].code)
                      }
                      label={question.get("example")[1].context}
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <Chip
                      className={classes.example}
                      avatar={<Avatar>3</Avatar>}
                      onClick={() =>
                        onclickExample(question.get("example")[2].code)
                      }
                      label={question.get("example")[2].context}
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <Chip
                      className={classes.example}
                      avatar={<Avatar>4</Avatar>}
                      onClick={() =>
                        onclickExample(question.get("example")[3].code)
                      }
                      label={question.get("example")[3].context}
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <Chip
                      className={classes.example}
                      avatar={<Avatar>5</Avatar>}
                      onClick={() =>
                        onclickExample(question.get("example")[4].code)
                      }
                      label={question.get("example")[4].context}
                    />
                  </ListItem>
                </List>
              ) : (
                <TextField id="standard-dense" label="정답" margin="dense" />
              )}
            </div>
          )}
        </Paper>
      </Slide>
      <Paper className={classes.paper} elevation={1}>
        <Button size="small" className={classes.button} onClick={onclickBack}>
          <BackIcon />
          이전문제
        </Button>
        <Button
          size="small"
          className={classes.button}
          style={{ float: "right" }}
          onClick={onclickNext}
        >
          다음문제
          <NextIcon />
        </Button>
      </Paper>
    </main>
  );
};

ExamBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  subject: PropTypes.string,
  question: PropTypes.string,
  onclickExample: PropTypes.func,
  examples: PropTypes.array,
  onclickBack: PropTypes.func,
  onclickNext: PropTypes.func,
  onclickCreate: PropTypes.func
};

ExamBoard.defaultProps = {
  subject: "테스트 과목명",
  question: "문제가 나오는 부분",
  onclickExample: num => alert(num + "번 보기 선택"),
  examples: ["보기 1 번", "보기 2 번", "보기 3 번", "보기 4 번"],
  onclickBack: () => alert("이전 문제 클릭"),
  onclickNext: () => alert("다음 문제 클릭"),
  onclickCreate: () => alert("문제 풀기 선택")
};

export default withStyles(styles, { withTheme: true })(ExamBoard);
