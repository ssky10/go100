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
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//Icon
import CorrectIcon from "@material-ui/icons/RadioButtonUnchecked";
import WrongIcon from "@material-ui/icons/Close";

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
      <div className={classes.context}>
        {question.get("choice") == question.get("answer") ? (
          <CorrectIcon style={{ fontSize: "6em", color: "#FDCF56" }} />
        ) : (
          <WrongIcon style={{ fontSize: "6em", color: "#ff86bc" }} />
        )}
        <div
          className={classes.title}
          id="context"
          dangerouslySetInnerHTML={{ __html: question.get("context") }}
        />
        {question.get("img") !== undefined ? (
          <img
            src={`https://golony.dev${question.get("img")}`}
            alt="문제 이미지"
          />
        ) : null}
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

const BeforeSolve = ({ classes, question, onclickExample, isTeacher }) => {
  return (
    <div>
      <div className={classes.context}>
        <div
          className={classes.title}
          id="context"
          dangerouslySetInnerHTML={{ __html: question.get("context") }}
        />
        {question.get("img") !== undefined ? (
          <img
            src={`https://golony.dev${question.get("img")}`}
            alt="문제 이미지"
          />
        ) : null}
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
                onClick={!isTeacher ? () => onclickExample(example.code) : null}
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
      <div className={classes.context}>
        <Typography className={classes.title} variant="h6">
          현재 접속 대기중입니다.
        </Typography>
      </div>
    </React.Fragment>
  );
};

const Result = ({ classes, isTeacher, scoreView }) => {
  const list = [];
  let old_score = scoreView[0].score + 1,
    No = 0;

  scoreView.forEach((element, idx) => {
    if (old_score > element.score) {
      old_score = element.score;
      No = idx + 1;
    }
    list.push({ ...element, No: No });
  });

  return (
    <React.Fragment>
      <div className={classes.context}>
        <Typography className={classes.title} variant="h6">
          최종 순위
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>순위</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">점수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.No}
                </TableCell>
                <TableCell align="right">{row.user_id}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

const Quiz = ({
  classes,
  user_num,
  quiz,
  onclickExample,
  state,
  isTeacher,
  scoreView,
  onclickNext
}) => {
  return (
    <React.Fragment>
      <div className={classes.content}>
        <Paper className={classes.paper} elevation={1}>
          <Typography className={classes.code} variant="h6" gutterBottom>
            #현재 접속자수 : {user_num}
          </Typography>
          {state === "wait" ? (
            <Wait classes={classes} />
          ) : state === "start" ? (
            <BeforeSolve
              classes={classes}
              question={quiz}
              isTeacher={isTeacher}
              onclickExample={onclickExample}
            />
          ) : state === "next" ? (
            <AfterSolve classes={classes} question={quiz} />
          ) : state === "result" ? (
            <Result
              classes={classes}
              isTeacher={isTeacher}
              scoreView={scoreView}
            />
          ) : null}
        </Paper>
        {isTeacher ? (
          <Paper
            className={classes.paper}
            elevation={1}
            style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
          >
            <Button
              variant="contained"
              className={classes.button}
              onClick={onclickNext}
            >
              {state === "wait"
                ? "시작하기"
                : state === "start"
                ? "문제마감"
                : state === "next"
                ? "다음문제"
                : "라이브퀴즈 종료"}
            </Button>
          </Paper>
        ) : null}
      </div>
    </React.Fragment>
  );
};

Quiz.propTypes = {
  classes: PropTypes.object.isRequired,
  onclickExample: PropTypes.func,
  isTeacher: PropTypes.bool,
  question: PropTypes.object,
  isAnswerPage: PropTypes.bool,
  state: PropTypes.string
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
  state: "wait"
};

export default withStyles(styles, { withTheme: true })(Quiz);
