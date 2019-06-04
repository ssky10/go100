import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import BoldIcon from "@material-ui/icons/FormatBold";
import UnderLineIcon from "@material-ui/icons/FormatUnderlined";
import ItalicIcon from "@material-ui/icons/FormatItalic";
import FncIcon from "@material-ui/icons/Functions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  paper: {
    height: "100%",
    padding: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 1
  },
  editorButton: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    backgroundColor: "white"
  },
  fileInput: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  editorDiv: {
    marginTop: theme.spacing.unit,
    backgroundColor: "white"
  },
  formulaInput: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: "block"
  },
  formulaButton: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    backgroundColor: "white"
  }
});

class editor extends React.Component {
  state = {
    open: false,
    formula: "x+y",
    anchorNode: null,
    anchorOffset: 0
  };

  componentDidMount() {
    document
      .getElementById(this.props.id)
      .addEventListener("input", this.props.onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.isReset) return false;
    return true;
  }

  excuteEditButton = exc => {
    const selection = window.getSelection();
    const found = selection.containsNode(
      document.getElementById(this.props.id),
      true
    );
    if (found === true) {
      document.execCommand(exc, false, "");
    }
  };

  insertFormulaButton = () => {
    const selection = window.getSelection();
    this.setState({
      open: true,
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset
    });
  };

  excuteFormulaButton = form => {
    document.execCommand("insertText", false, form);
  };

  onChangeFourmula = e => {
    const target = e.target;
    const value = target.value.trim();
    if (value.length > 200) {
      alert("수식최대 지원 길이는 200자 입니다.");
      return;
    }
    this.setState({
      formula: value
    });
  };

  makeFourmulaImg = () => {
    const img =
      '<img src="https://chart.googleapis.com/chart?cht=tx&chf=bg,s,00000000&chl=' +
      encodeURIComponent(this.state.formula) +
      '" alt="수식에러" />';
    return img;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    const selection = window.getSelection();
    selection.collapse(this.state.anchorNode, this.state.anchorOffset);
    document.execCommand("insertHtml", false, this.makeFourmulaImg());
    this.setState({
      formula: "",
      open: false
    });
  };

  setCaret = node => {
    var caretID = "caret";
    var cc = document.createElement("span");
    cc.id = caretID;

    window
      .getSelection()
      .getRangeAt(0)
      .insertNode(cc);

    node.blur();
  };

  getCaret = node => {
    var caretID = "caret";

    node.focus();

    var range = document.createRange();
    var cc = document.getElementById(caretID);
    range.selectNode(cc);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    range.deleteContents();
  };

  render() {
    const { id, classes, ableImg, onChange, value, isReset } = this.props;

    return (
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
          onClick={() => this.excuteEditButton("bold")}
          className={classes.editorButton}
          variant="contained"
          size="small"
        >
          <BoldIcon />
          진하게
        </Button>
        <Button
          className={classes.editorButton}
          onClick={() => this.excuteEditButton("underline")}
          variant="contained"
          size="small"
        >
          <UnderLineIcon />
          밑줄
        </Button>
        <Button
          className={classes.editorButton}
          onClick={() => this.excuteEditButton("italic")}
          variant="contained"
          size="small"
        >
          <ItalicIcon />
          기울이기
        </Button>
        <Button
          className={classes.editorButton}
          onClick={() => this.insertFormulaButton()}
          variant="contained"
          size="small"
        >
          <FncIcon />
          수식입력
        </Button>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">수식입력</DialogTitle>
          <DialogContent>
            {this.state.formula !== "" && (
              <img
                src={
                  "https://chart.googleapis.com/chart?cht=tx&chf=bg,s,00000000&chl=" +
                  encodeURIComponent(this.state.formula)
                }
                alt="수식이미지"
              />
            )}
            <Divider />
            <Button
              onClick={() => this.excuteFormulaButton("x^{2}")}
              className={classes.formulaButton}
              variant="contained"
              size="small"
            >
              위첨자
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("x_{2}")}
              variant="contained"
              size="small"
            >
              아래첨자
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("\\sum_{k=1}^N k^2")}
              variant="contained"
              size="small"
            >
              시그마
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() =>
                this.excuteFormulaButton("\\lim_{n \\to \\infty}x")
              }
              variant="contained"
              size="small"
            >
              극한
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() =>
                this.excuteFormulaButton("\\int_{-N}^{N} e^{x}\\, dx")
              }
              variant="contained"
              size="small"
            >
              적분
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("\\frac{2}{4}")}
              variant="contained"
              size="small"
            >
              분수
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() =>
                this.excuteFormulaButton(
                  "f(n)=\\begin{cases} n/2, & \\mbox{if }n\\mbox{ is even} \\\\ 3n+1, & \\mbox{if }n\\mbox{ is odd}\\end{cases}"
                )
              }
              variant="contained"
              size="small"
            >
              경우나누기
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() =>
                this.excuteFormulaButton("\\sqrt[3]{x^3+y^3 \\over 2}")
              }
              variant="contained"
              size="small"
            >
              근호
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("{}_n\\mathrm{P}_{k}")}
              variant="contained"
              size="small"
            >
              순열
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("{}_n\\mathrm{\\pi}_{k}")}
              variant="contained"
              size="small"
            >
              중복순열
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("{}_n\\mathrm{C}_{k}")}
              variant="contained"
              size="small"
            >
              조합
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("{}_n\\mathrm{H}_{k}")}
              variant="contained"
              size="small"
            >
              중복조합
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("\\cap")}
              variant="contained"
              size="small"
            >
              교집합
            </Button>
            <Button
              className={classes.formulaButton}
              onClick={() => this.excuteFormulaButton("\\cup")}
              variant="contained"
              size="small"
            >
              합집합
            </Button>
            <TextField
              id={id + "F"}
              label="수식입력"
              fullWidth
              multiline
              autoFocus
              value={this.state.formula}
              onChange={this.onChangeFourmula}
              className={classes.formulaInput}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit}>확인</Button>
          </DialogActions>
        </Dialog>
        <Divider />
        {console.log(isReset, value)}
        <div
          className={classes.editorDiv}
          id={id}
          autoFocus
          contentEditable="true"
          suppressContentEditableWarning={true}
          onChange={onChange}
          dangerouslySetInnerHTML={{ __html: value }}
        />
        <Divider />
        {ableImg ? (
          <input type="file" name="img" className={classes.fileInput} />
        ) : null}
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(editor);
