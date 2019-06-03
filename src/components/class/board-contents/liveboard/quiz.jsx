import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import CorrectIcon from "@material-ui/icons/RadioButtonUnchecked";

//Icon
import WrongIcon from "@material-ui/icons/Close";

const styles = theme => ({
  paper: {
    height: "100%",
    padding: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1
  },
  title: {
    margin: 0
  },
  context: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    textAlign: "center"
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
  exampleSelect: {
    backgroundColor: "#FDCF56",
    "&:hover": {
      backgroundColor: "#FDCF56"
    },
    "&:focus": {
      backgroundColor: "#FDCF56"
    }
  },
  exampleAnswer: {
    backgroundColor: "#ff86bc",
    "&:hover": {
      backgroundColor: "#ff86bc"
    },
    "&:focus": {
      backgroundColor: "#ff86bc"
    }
  }
});

const AfterSolve = ({ classes, question, isTeacher, userList }) => {
  return (
    <div>
      <Typography className={classes.code} variant="h6" gutterBottom>
        #현재 접속자수 : {userList}
      </Typography>
      <div className={classes.context}>
        {question.get("choice") == question.get("answer") ? (
          <CorrectIcon style={{ fontSize: "6em", color: "#FDCF56" }} />
        ) : (
          <WrongIcon style={{ fontSize: "6em", color: "#ff86bc" }} />
        )}
        <Typography className={classes.title} variant="h6">
          {question.get("context")}
        </Typography>
      </div>

      {question.get("choiceable") ? (
        <List className={classes.root}>
          {/* 객관식 보기 출력 부분*/}
          {question.get("example").map((example, idx) => (
            <ListItem alignItems="flex-start" key={idx}>
              <Chip
                className={
                  example.code === question.get("choice")
                    ? `${classes.example} ${classes.exampleSelect}`
                    : example.code == question.get("answer")
                    ? `${classes.example} ${classes.exampleAnswer}`
                    : classes.example
                }
                avatar={<Avatar>{idx + 1}</Avatar>}
                label={example.context}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <TextField id="standard-dense" label="정답" margin="dense" />
      )}
    </div>
  );
};

const BeforeSolve = ({
  classes,
  question,
  onclickExample,
  isTeacher,
  userList
}) => {
  return (
    <div>
      <Typography className={classes.code} variant="h6" gutterBottom>
        #현재 접속자수 : {userList}
      </Typography>
      <div className={classes.context}>
        <Typography className={classes.title} variant="h6">
          {question.get("context")}
        </Typography>
      </div>

      {question.get("choiceable") ? (
        <List className={classes.root}>
          {/* 객관식 보기 출력 부분*/}
          {question.get("example").map((example, idx) => (
            <ListItem alignItems="flex-start" key={idx}>
              {console.log(example)}
              <Chip
                className={
                  example.code === question.get("choice")
                    ? `${classes.example} ${classes.exampleSelect}`
                    : classes.example
                }
                avatar={<Avatar>{idx + 1}</Avatar>}
                onClick={() =>
                  onclickExample(question.get("code"), example.code)
                }
                label={example.context}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <TextField id="standard-dense" label="정답" margin="dense" />
      )}
    </div>
  );
};

const Wait = ({ classes, isTeacher, userList }) => {
  return (
    <React.Fragment>
      <Typography className={classes.code} variant="h6" gutterBottom>
        #현재 접속자수 : {userList}
      </Typography>
      <div className={classes.context}>
        <Typography className={classes.title} variant="h6">
          현재 접속 대기중입니다.
        </Typography>
      </div>
    </React.Fragment>
  );
};

const Quiz = ({
  classes,
  isTeacher,
  question,
  onclickExample,
  state,
  userList
}) => {
  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={1}>
        {state === 0 ? (
          <Wait classes={classes} />
        ) : state === 1 ? (
          <AfterSolve classes={classes} question={question} />
        ) : (
          <BeforeSolve
            classes={classes}
            question={question}
            onclickExample={onclickExample}
          />
        )}

        <Paper
          className={classes.paper}
          elevation={1}
          style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
        >
          <Button variant="contained" className={classes.button}>
            다음문제로 넘어가기
          </Button>
        </Paper>
      </Paper>
    </React.Fragment>
  );
};

Quiz.propTypes = {
  classes: PropTypes.object.isRequired,
  onclickExample: PropTypes.func,
  isTeacher: PropTypes.bool,
  question: PropTypes.object,
  isAnswerPage: PropTypes.bool,
  state: PropTypes.number
};

Quiz.defaultProps = {
  subject: "테스트 과목명",
  onclickExample: num => alert(num + "번 보기 선택"),
  isTeacher: true,
  question: {
    choiceable: true,
    context: "문제",
    answer: "2",
    example: [
      { code: 0, context: "1번보기" },
      { code: 1, context: "2번보기" },
      { code: 2, context: "3번보기" },
      { code: 3, context: "4번보기" }
    ]
  },
  state: 0
};

export default withStyles(styles, { withTheme: true })(Quiz);
