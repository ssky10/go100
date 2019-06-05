import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import CorrectIcon from "@material-ui/icons/RadioButtonUnchecked";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

//Icon
import WrongIcon from "@material-ui/icons/Close";
import SolutionIcon from "@material-ui/icons/AddComment";

const styles = theme => ({
  paper: {
    height: "100%",
    padding: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1
  },
  title: {
    ...theme.typography.h6,
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

const AfterSolve = ({ classes, question, isTeacher, handleCreateSolotion }) => {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Paper className={classes.paper} elevation={1}>
        <div>
          <Typography className={classes.code} variant="h6" gutterBottom>
            {isTeacher ? (
              <Tooltip title="첨삭하기">
                <IconButton
                  color="inherit"
                  aria-label="set Notification"
                  onClick={handleCreateSolotion}
                >
                  <SolutionIcon />
                </IconButton>
              </Tooltip>
            ) : null}
            #{question.get("code")}
          </Typography>
          <div className={classes.context}>
            {question.get("choice") == question.get("answer") ? (
              <CorrectIcon style={{ fontSize: "6em", color: "#FDCF56" }} />
            ) : (
              <WrongIcon style={{ fontSize: "6em", color: "#ff86bc" }} />
            )}
            <div
              id="context"
              className={classes.title}
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
          <Paper
            className={classes.paper}
            elevation={1}
            style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
          >
            <Typography variant="body1">
              {question.get("explanation")}
            </Typography>
          </Paper>
        </div>
      </Paper>
    </Slide>
  );
};

const BeforeSolve = ({ classes, question, onclickExample }) => {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Paper className={classes.paper} elevation={1}>
        <div>
          <Typography className={classes.code} variant="h6" gutterBottom>
            #{question.get("code")}
          </Typography>
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
                    className={classes.example}
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
      </Paper>
    </Slide>
  );
};

const MyQuestion = ({ classes, question }) => {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Paper className={classes.paper} elevation={1}>
        <div>
          <Typography className={classes.code} variant="h6" gutterBottom>
            #{question.get("code")}
          </Typography>
          <div className={classes.context}>
            <div
              id="context"
              className={classes.title}
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
                      example.code == question.get("answer")
                        ? `${classes.example} ${classes.exampleSelect}`
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
          <Paper
            className={classes.paper}
            elevation={1}
            style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
          >
            <Typography variant="body1">
              {question.get("explanation")}
            </Typography>
          </Paper>
        </div>
      </Paper>
    </Slide>
  );
};

const Question = ({
  classes,
  question,
  onclickExample,
  myQ,
  isTeacher,
  handleCreateSolotion
}) => {
  return (
    <React.Fragment>
      {myQ ? (
        <MyQuestion classes={classes} question={question} />
      ) : question.get("choice") === -1 ? (
        <BeforeSolve
          classes={classes}
          question={question}
          onclickExample={onclickExample}
        />
      ) : (
        <AfterSolve
          classes={classes}
          question={question}
          isTeacher={isTeacher}
          handleCreateSolotion={handleCreateSolotion}
        />
      )}
    </React.Fragment>
  );
};

Question.componentDidMount = () => {
  document.getElementById("context").innerHTML = this.props.question.get(
    "context"
  );
};

Question.propTypes = {
  classes: PropTypes.object.isRequired,
  onclickExample: PropTypes.func
};

Question.defaultProps = {
  subject: "테스트 과목명",
  onclickExample: num => alert(num + "번 보기 선택")
};

export default withStyles(styles, { withTheme: true })(Question);
