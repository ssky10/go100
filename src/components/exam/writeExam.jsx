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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import BoldIcon from "@material-ui/icons/FormatBold";
import UnderLineIcon from "@material-ui/icons/FormatUnderlined";
import ItalicIcon from "@material-ui/icons/FormatItalic";
import FncIcon from "@material-ui/icons/Functions";

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
  editorButton: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    backgroundColor: "white"
  },
  editorDiv: {
    marginTop: theme.spacing.unit,
    backgroundColor: "white"
  }
});

const writeExam = ({
  subject,
  classes,
  question,
  examples,
  value,
  changeValue,
  onclickExample,
  onclickBack,
  onclickNext,
  onSubmit
}) => {
  // if (!document.getElementById("jqMath")) {
  //   const scriptjqMath = document.createElement("script");
  //   scriptjqMath.id = "Mathjax";
  //   scriptjqMath.src =
  //     "//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";
  //   document.body.appendChild(scriptjqMath);
  // }
  const excuteEditButton = exc => {
    document.execCommand(exc, false, "");
  };

  return (
    <main className={classes.content}>
      <Paper className={classes.paper} elevation={1}>
        <Grid container spacing={8}>
          <Grid item xs={9}>
            <Typography className={classes.title} variant="h4" gutterBottom>
              문제 만들기
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
          <form className={classes.form} onSubmit={onSubmit} name="write">
            <FormControl margin="normal" required fullWidth>
              <FormLabel component="legend">문제 유형</FormLabel>
              <RadioGroup
                aria-label="문제 유형"
                name="type"
                className={classes.group}
                value={value}
                onChange={changeValue}
              >
                <FormGroup row>
                  <FormControlLabel
                    value="객관식"
                    control={<Radio />}
                    label="객관식"
                  />
                  <FormControlLabel
                    value="단답형"
                    control={<Radio />}
                    label="단답형"
                  />
                </FormGroup>
              </RadioGroup>
              <FormLabel component="legend">문제</FormLabel>
              <Paper
                className={classes.paper}
                elevation={1}
                style={{
                  backgroundColor: "rgba(0,0,0,0.07)",
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginTop: "8px"
                }}
              >
                <Button
                  onClick={() => excuteEditButton("bold")}
                  className={classes.editorButton}
                  variant="contained"
                  size="small"
                >
                  <BoldIcon />
                  진하게
                </Button>
                <Button
                  className={classes.editorButton}
                  onClick={() => excuteEditButton("underline")}
                  variant="contained"
                  size="small"
                >
                  <UnderLineIcon />
                  밑줄
                </Button>
                <Button
                  className={classes.editorButton}
                  onClick={() => excuteEditButton("italic")}
                  variant="contained"
                  size="small"
                >
                  <ItalicIcon />
                  기울이기
                </Button>
                <Button
                  className={classes.editorButton}
                  variant="contained"
                  size="small"
                >
                  <FncIcon />
                  수식입력
                </Button>
                <Divider />
                <div
                  className={classes.editorDiv}
                  id="editor"
                  contenteditable="true"
                >
                  문제를 작성하세요.
                </div>
              </Paper>

              <List className={classes.root}>
                <ListItem alignItems="flex-start">
                  <Chip
                    className={classes.example}
                    avatar={<Avatar>1</Avatar>}
                    label={
                      <div id="editor" contenteditable="true">
                        보기1번
                      </div>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <Chip
                    className={classes.example}
                    avatar={<Avatar>2</Avatar>}
                    label={
                      <div id="editor" contenteditable="true">
                        보기2번
                      </div>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <Chip
                    className={classes.example}
                    avatar={<Avatar>3</Avatar>}
                    label={
                      <div id="editor" contenteditable="true">
                        보기3번
                      </div>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <Chip
                    className={classes.example}
                    avatar={<Avatar>4</Avatar>}
                    label={
                      <div id="editor" contenteditable="true">
                        보기4번
                      </div>
                    }
                  />
                </ListItem>
              </List>
              <FormLabel component="legend">해설</FormLabel>
              <Paper
                className={classes.paper}
                elevation={1}
                style={{
                  backgroundColor: "rgba(0,0,0,0.07)",
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginTop: "8px"
                }}
              >
                <div id="editor" contenteditable="true">
                  해설을 작성하세요.
                </div>
              </Paper>
              <Divider />
              <Button
                size="small"
                className={classes.button}
                onClick={onclickNext}
              >
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
  examples: PropTypes.array,
  onclickBack: PropTypes.func,
  onclickNext: PropTypes.func,
  onSubmit: PropTypes.func
};

writeExam.defaultProps = {
  subject: "테스트 과목명",
  question: "문제가 나오는 부분",
  onclickExample: num => alert(num + "번 보기 선택"),
  examples: ["보기 1 번", "보기 2 번", "보기 3 번", "보기 4 번"],
  onclickBack: () => alert("이전 문제 클릭"),
  onclickNext: () => alert("다음 문제 클릭"),
  value: "객관식",
  changeValue: () => alert("유형변경"),
  onSubmit: () => alert("전송")
};

export default withStyles(styles, { withTheme: true })(writeExam);
