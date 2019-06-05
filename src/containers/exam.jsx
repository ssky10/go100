//node_modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { List } from "immutable";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

//SVGIcon
import HangleIcon from "icons/hangleIcon";
import EngIcon from "icons/engIcon";
import MathIcon from "icons/mathIcon";
import HistoryIcon from "icons/historyIcon";
import SocietyIcon from "icons/societyIcon";
import ScienceIcon from "icons/scienceIcon";

import TemplateContainer from "containers/template-container";

//components
import ExamBoard from "components/exam/examBoard";
import WriteExam from "components/exam/writeExam";
import Drawer from "components/exam/drawer";

//stores
import {
  changeSubject,
  addQuestion,
  removeQuestion,
  addAnswer
} from "../store/modules/exam";
import { useAuth } from "../context/loginProvider";

//services
import * as service from "../services/exam";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: -1,
      snack: { open: false, msg: "" },
      anchorEl: null,
      isWrite: false,
      nowIdx: 0,
      total: 0,
      subject: -1,
      ID: "user1",
      isRefresh: false,
      writeExam: {
        type: "choiceable",
        context: "",
        img: null,
        answer: 0,
        explanation: "",
        example: List(["", ""])
      },
      template: {
        searchCode: null
      }
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount() start");
    console.log(
      this.props.match,
      this.props.match.path === "/exam/:code(\\d+)"
    );
    console.log("componentDidMount:", this.props.location);
    if (this.props.match.path === "/exam/:code(\\d+)") {
      this.updateAllQ(
        this.props.token,
        -3,
        1,
        parseInt(this.props.match.params.code)
      );
    } else {
      this.updateAllQ(this.props.token, -1, 5, -1);
    }
    console.log("componentDidMount() end");
  }

  componentWillReceiveProps(nextProps) {
    const { token, location: newLocation, match, questions } = nextProps;
    const { location: oldLocation } = this.props;
    console.log(newLocation, oldLocation);
    if (newLocation !== oldLocation) {
      if (match.path === "/exam/:code(\\d+)") {
        this.updateAllQ(token, -3, 1, parseInt(match.params.code));
        this.setState(state => ({ subject: -3, isWrite: false }));
      } else {
        const newSubject =
          newLocation.state == null
            ? null
            : newLocation.state.subject == null
            ? null
            : newLocation.state.subject;
        const oldSubject =
          oldLocation.state == null
            ? null
            : oldLocation.state.subject == null
            ? null
            : oldLocation.state.subject;
        console.log(newSubject, oldSubject);
        if (newSubject !== oldSubject) {
          const isRefresh =
            newLocation.state == null
              ? false
              : newLocation.state.isRefresh == null
              ? false
              : newLocation.state.isRefresh;
          if (isRefresh) {
            newLocation.state.isRefresh = false;
            this.updateAllQ(token, newSubject, 5, -1);
            this.setState(state => ({ subject: newSubject, isWrite: false }));
          }
        }
      }
    }
  }

  updateAllQ = (token, subject, num, code) => {
    const { addQuestion, removeQuestion } = this.props;
    const setState = this.setState.bind(this);
    removeQuestion();
    setState(state => ({ total: 0, nowIdx: 0 }));
    service.getQuestion(token, subject, num, code).then(function(response) {
      if (response.data.status) {
        if (response.data.num !== 0) {
          const array =
            subject !== -2 ? response.data.data : response.data.questions;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            addQuestion(element);
          }
          setState(state => ({ ID: response.data.id, total: array.length }));
        }
      }
      setState(state => ({ ID: response.data.id }));
    });
  };

  onclickExample = (code, choice) => {
    const { token, questions, addAnswer } = this.props;
    const { nowIdx } = this.state;
    service.markQuestion(token, code, choice).then(function(response) {
      console.log(response);
      if (response.data.status) {
        addAnswer(
          nowIdx,
          choice,
          response.data.answer,
          response.data.explanation
        );
        console.log(questions.get(nowIdx));
      }
    });
  };

  onclickSearch = e => {
    e.preventDefault();
    console.log(this.state.template.searchCode);
    this.setState({ isWrite: false });
    this.props.history.push("/exam/" + this.state.template.searchCode);
  };

  onChangeSearchCode = e => {
    const target = e.target;
    this.setState(state => ({
      template: { ...state.template, searchCode: target.value }
    }));
  };

  onChangeValue = e => {
    const target = e.target;
    const name = target.name === undefined ? target.id : target.name;
    console.log(name, this.state.writeExam);
    switch (name) {
      case "context":
        this.setState(state => ({
          writeExam: { ...state.writeExam, context: e.srcElement.innerHTML }
        }));
        break;
      case "explanation":
        this.setState(state => ({
          writeExam: { ...state.writeExam, explanation: e.srcElement.innerHTML }
        }));
        break;
      case "img":
        this.setState(state => ({
          writeExam: { ...state.writeExam, img: e.target.files[0] }
        }));
        break;
      default:
        if (/^example(\d+)/.test(name)) {
          const result = /^example(\d+)/.exec(name);
          const idx = parseInt(result[1]);
          console.log(this.state.writeExam.example.get(idx) !== target.value);
          if (this.state.writeExam.example.get(idx) !== target.value) {
            if (idx + 1 === this.state.writeExam.example.size) {
              this.setState(state => ({
                writeExam: {
                  ...state.writeExam,
                  example: state.writeExam.example
                    .update(idx, val => target.value)
                    .push("")
                }
              }));
            } else if (
              target.value == "" &&
              this.state.writeExam.example.size > 2
            ) {
              this.setState(state => ({
                writeExam: {
                  ...state.writeExam,
                  example: state.writeExam.example.delete(idx)
                }
              }));
            } else {
              this.setState(state => ({
                writeExam: {
                  ...state.writeExam,
                  example: state.writeExam.example.set(idx, target.value)
                }
              }));
            }
          }
        } else {
          this.setState(state => ({
            writeExam: { ...state.writeExam, [name]: target.value }
          }));
        }
        break;
    }
  };

  onClickMakeQ = e => {
    e.preventDefault();
    const { token } = this.props;
    const { subject, writeExam } = this.state;
    const setState = this.setState.bind(this);
    service.makeQuestion(token, subject, writeExam).then(function(response) {
      console.log(response);
      if (response.data.status) {
        setState(state => ({
          isWrite: false,
          writeExam: {
            type: "choiceable",
            context: "",
            img: null,
            answer: 0,
            explanation: "",
            example: List(["", ""])
          },
          snack: { open: true, msg: "문제가 등록되었습니다." }
        }));
      }
    });
  };

  onselectAnswer = idx => {
    this.setState(state => ({
      writeExam: { ...state.writeExam, answer: idx }
    }));
  };

  onclickBack = () => {
    if (this.state.nowIdx === 0) {
      alert("처음문제 입니다.");
      return;
    }
    this.setState(state => ({ nowIdx: this.state.nowIdx - 1 }));
  };

  onclickNext = () => {
    if (this.state.nowIdx === this.state.total - 1) {
      alert("마지막문제 입니다.");
      return;
    }
    this.setState(state => ({ nowIdx: this.state.nowIdx + 1 }));
  };

  onclickCreate = () => {
    this.setState(state => ({ isWrite: true }));
  };

  handleClick = subject => {
    if (subject === this.state.open) this.setState(state => ({ open: -1 }));
    else this.setState(state => ({ open: subject }));
  };

  handleSubject = subject => {
    this.props.changeSubject(subject);
    console.log(this.props.location.pathname);
    //this.updateAllQ(subject);
    this.setState(state => ({ isWrite: false }));
  };

  handleSubject = props => (
    <React.Fragment>
      <Link
        to={{
          pathname: "/exam",
          state: { subject: props.subject, isRefresh: true }
        }}
        {...props}
      />
    </React.Fragment>
  );

  handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snack: { open: false, msg: "" } });
  };

  subjectNames = ["국어", "영어", "수학", "한국사", "사회", "과학"];
  subjectIcons = [
    <HangleIcon size="24" />,
    <EngIcon size="24" />,
    <MathIcon size="24" />,
    <HistoryIcon size="24" />,
    <SocietyIcon size="24" />,
    <ScienceIcon size="24" />
  ];
  subsubjectNames = [
    ["중등국어", "공통국어", "화법과 작문", "언어와 매체", "독서", "문학"],
    ["공통영어", "영어1", "영어2", "영어회화", "영어독해와 작문"],
    ["중등수학", "공통수학", "수학1", "수학2", "미적분", "확률과 통계"],
    ["중등역사", "한국사"],
    ["중등사회", "통합사회", "정치와 법", "경제", "사회/문화", "생활과 윤리"],
    ["중등과학", "통합과학", "물리1/2", "화학1/2", "생명1/2", "지구과학1/2"]
  ];

  render() {
    const { theme, isLogin, questions } = this.props;
    const {
      nowIdx,
      total,
      ID,
      subject,
      template,
      test,
      writeExam
    } = this.state;
    const drawer = (
      <Drawer
        subjectNames={this.subjectNames}
        open={this.state.open}
        onClickSubject={this.handleClick}
        subsubjectNames={this.subsubjectNames}
        onClickSubSubject={this.handleSubject}
        subjectIcons={this.subjectIcons}
        onClickSearch={this.onclickSearch}
        onChangeSearchCode={this.onChangeSearchCode}
        values={template}
      />
    );
    const appBarMenu = <div />;

    return (
      <React.Fragment>
        <TemplateContainer
          theme={theme}
          drawer={drawer}
          title="Go100 Exam"
          menu={appBarMenu}
          isLogin={isLogin}
          user={ID}
          token={this.props.token}
        >
          {this.state.isWrite ? (
            <WriteExam
              subject={
                this.subsubjectNames[parseInt(subject / 100)][
                  subject - parseInt(subject / 100) * 100
                ]
              }
              onChangeValue={this.onChangeValue}
              value={writeExam}
              onselectAnswer={this.onselectAnswer}
              onSubmit={this.onClickMakeQ}
            />
          ) : (
            <ExamBoard
              subject={
                subject === -2
                  ? "내가 작성한 문제"
                  : subject === -1
                  ? "오답노트"
                  : this.subsubjectNames[parseInt(subject / 100)][
                      subject - parseInt(subject / 100) * 100
                    ]
              }
              question={total > 0 ? questions.get(nowIdx) : false}
              onclickExample={this.onclickExample}
              onclickBack={this.onclickBack}
              onclickNext={this.onclickNext}
              onclickCreate={this.onclickCreate}
            />
          )}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.snack.open}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.snack.msg}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleSnackClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </TemplateContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ exam, auth }) => ({
  subject: exam.get("subject"),
  isLogin: auth.get("isLogin"),
  questions: exam.get("questions")
});

const mapDispatchToProps = dispatch => ({
  changeSubject: subject => dispatch(changeSubject(subject)),
  addQuestion: question => dispatch(addQuestion(question)),
  removeQuestion: () => dispatch(removeQuestion()),
  addAnswer: (idx, choice, answer, explanation) =>
    dispatch(addAnswer(idx, choice, answer, explanation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(useAuth(Exam));
