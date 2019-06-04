import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import NextIcon from "@material-ui/icons/ArrowForwardIos";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";
import SadIcon from "@material-ui/icons/SentimentDissatisfied";
import GoodIcon from "@material-ui/icons/ThumbUpAlt";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

const QuizList = ({ classes, list, onclickCreate, isTeacher, url }) => {
  return (
    <main className={classes.content}>
      <Paper className={classes.paper} elevation={1}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          라이브퀴즈 목록
          {isTeacher && (
            <Tooltip title="퀴즈 만들기">
              <IconButton aria-label="Create" onClick={onclickCreate}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
      </Paper>
      <Paper className={classes.paper} elevation={1}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>라이브 퀴즈 제목</TableCell>
              <TableCell align="right">문항수</TableCell>
              <TableCell align="right">생성일</TableCell>
              <TableCell align="right">시작하기</TableCell>
              {isTeacher ? <TableCell align="right">삭제하기</TableCell> : null}
            </TableRow>
          </TableHead>

          {list.length === 0 ? (
            <TableBody>
              <TableRow key={0}>
                <TableCell align="center" colSpan={5}>
                  현재 라이브퀴즈가 없습니다.
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {list.map(row => (
                <TableRow key={row.code}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.quizzes_num}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">
                    <Button component={Link} to={`${url}/livequiz/${row.code}`}>
                      입장하기
                    </Button>
                  </TableCell>
                  {isTeacher ? (
                    <TableCell align="right">
                      <Button
                        style={{ background: "rgb(225, 0, 80)" }}
                        component={Link}
                        to={`${url}/livequiz/${row.code}`}
                      >
                        삭제하기
                      </Button>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
    </main>
  );
};

QuizList.propTypes = {
  onclickCreate: PropTypes.func,
  list: PropTypes.array,
  isTeacher: PropTypes.bool,
  url: PropTypes.string
};

QuizList.defaultProps = {
  onclickCreate: () => alert("문제 만들기 선택"),
  list: [
    { code: 0, title: "라이브퀴즈 명", quizzes_num: 3, date: "2019-06-03" }
  ],
  isTeacher: false,
  url: "class/0"
};

export default withStyles(styles, { withTheme: true })(QuizList);
