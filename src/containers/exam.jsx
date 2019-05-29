//node_modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

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
  removeQuestion
} from "../store/modules/exam";
import { useAuth } from "../context/loginProvider";

//services
import * as service from "../services/exam";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: -1,
      anchorEl: null,
      isWrite: false,
      nowIdx: 0,
      total: 0,
      subject: -1,
      ID: "user1"
    };
  }

  componentDidMount() {
    console.log("componentDidMount() start");
    console.log(this.props.match);
    if (this.props.match.path === "/exam/:code(\\d+)") {
      this.updateAllQ(
        this.props.token,
        201,
        1,
        parseInt(this.props.match.params.code)
      );
    } else {
      this.updateAllQ(this.props.token, -1, 5, -1);
    }
    console.log("componentDidMount() end");
  }

  componentWillReceiveProps(nextProps) {
    const { token, location: newLocation, match } = nextProps;
    const { location: oldLocation } = this.props;
    console.log(match.path === "/exam/:code(\\d+)");
    if (match.path === "/exam/:code(\\d+)") {
      //
    } else if (newLocation !== oldLocation) {
      console.log(newLocation, oldLocation);
      const newSubject =
        newLocation.state == null
          ? -1
          : newLocation.state.subject == null
          ? -1
          : newLocation.state.subject;
      const oldSubject =
        oldLocation.state == null
          ? -1
          : oldLocation.state.subject == null
          ? -1
          : oldLocation.state.subject;

      if (newSubject !== oldSubject) {
        this.updateAllQ(token, newSubject, 5, -1);
        this.setState(state => ({ subject: newSubject }));
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
          const array = response.data.data;

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
    const { token } = this.props;
    service.markQuestion(token, code, choice).then(function(response) {
      console.log(response);
      if (response.data.status) {
      }
    });
  };

  onclickSearch = (subject, token) => {
    const { addQuestion, removeQuestion } = this.props;
    const setState = this.setState.bind(this);
    setState(state => ({ total: 0, nowIdx: 0 }));
    service.getQuestion(token, subject, 5, -1).then(function(response) {
      if (response.data.status) {
        if (response.data.num !== 0) {
          const array = response.data.data;

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
    const { nowIdx, total, ID, subject } = this.state;

    const handleSubject = props => (
      <React.Fragment>
        <Link
          to={{
            pathname: "/exam",
            state: { subject: props.subject }
          }}
          {...props}
        />
      </React.Fragment>
    );

    const drawer = (
      <Drawer
        subjectNames={this.subjectNames}
        open={this.state.open}
        onClickSubject={this.handleClick}
        subsubjectNames={this.subsubjectNames}
        onClickSubSubject={handleSubject}
        subjectIcons={this.subjectIcons}
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
        >
          {this.state.isWrite ? (
            <WriteExam
              subject={
                this.subsubjectNames[parseInt(subject / 100)][
                  subject - parseInt(subject / 100) * 100
                ]
              }
            />
          ) : (
            <ExamBoard
              subject={
                subject === -1
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
  removeQuestion: () => dispatch(removeQuestion())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(useAuth(Exam));
