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
import BackIcon from "@material-ui/icons/ArrowBackIos";
import NextIcon from "@material-ui/icons/ArrowForwardIos";

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
  }
});

const ExamBoard = ({
  subject,
  classes,
  question,
  examples,
  onclickExample,
  onclickBack,
  onclickNext
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
        <Grid container spacing={8}>
          <Grid item xs={9}>
            <Typography className={classes.title} variant="h4" gutterBottom>
              {subject}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="문제번호"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Paper className={classes.paper} elevation={1}>
          <Typography className={classes.title} variant="h6" gutterBottom>
            {question}
          </Typography>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <Chip
                className={classes.example}
                avatar={<Avatar>1</Avatar>}
                onClick={() => onclickExample(1)}
                label={examples[0]}
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <Chip
                className={classes.example}
                avatar={<Avatar>2</Avatar>}
                onClick={() => onclickExample(2)}
                label={examples[1]}
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <Chip
                className={classes.example}
                avatar={<Avatar>3</Avatar>}
                onClick={() => onclickExample(3)}
                label={examples[2]}
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <Chip
                className={classes.example}
                avatar={<Avatar>4</Avatar>}
                onClick={() => onclickExample(4)}
                label={examples[3]}
              />
            </ListItem>
          </List>
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
  onclickNext: PropTypes.func
};

ExamBoard.defaultProps = {
  subject: "테스트 과목명",
  question: "문제가 나오는 부분",
  onclickExample: num => alert(num + "번 보기 선택"),
  examples: ["보기 1 번", "보기 2 번", "보기 3 번", "보기 4 번"],
  onclickBack: () => alert("이전 문제 클릭"),
  onclickNext: () => alert("다음 문제 클릭")
};

export default withStyles(styles, { withTheme: true })(ExamBoard);
