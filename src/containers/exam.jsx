//node_modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
      examHome: false,
      nowIdx: 0,
      total: 0,
      ID: "user1"
    };
  }

  componentDidMount() {
    this.updateAllQ(-1, this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    const { subject: newSubject, token } = nextProps;
    const { subject: oldSubject, location } = this.props;
    console.log(location);
    if (newSubject !== oldSubject) {
      if (location.pathname !== "/exam") {
        this.setState(state => ({ examHome: true }));
      } else {
        this.updateAllQ(newSubject, token);
      }
    }
  }

  updateAllQ = (subject, token) => {
    const { addQuestion, removeQuestion } = this.props;
    const setState = this.setState.bind(this);
    removeQuestion();
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

  onclickExample = choice => {};

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

  render() {
    const { theme, subject, changeSubject, isLogin, questions } = this.props;
    const { question, nowIdx, total, ID } = this.state;
    const subjectNames = ["국어", "영어", "수학", "한국사", "사회", "과학"];
    const subjectIcons = [
      <HangleIcon size="24" />,
      <EngIcon size="24" />,
      <MathIcon size="24" />,
      <HistoryIcon size="24" />,
      <SocietyIcon size="24" />,
      <ScienceIcon size="24" />
    ];
    const subsubjectNames = [
      ["중등국어", "공통국어", "화법과 작문", "언어와 매체", "독서", "문학"],
      ["공통영어", "영어1", "영어2", "영어회화", "영어독해와 작문"],
      ["중등수학", "공통수학", "수학1", "수학2", "미적분", "확률과 통계"],
      ["중등역사", "한국사"],
      ["중등사회", "통합사회", "정치와 법", "경제", "사회/문화", "생활과 윤리"],
      ["중등과학", "통합과학", "물리1/2", "화학1/2", "생명1/2", "지구과학1,2"]
    ];
    const drawer = (
      <Drawer
        subjectNames={subjectNames}
        open={this.state.open}
        onClickSubject={this.handleClick}
        subsubjectNames={subsubjectNames}
        onClickSubSubject={this.handleSubject}
        subjectIcons={subjectIcons}
      />
    );
    const appBarMenu = <div />;

    return (
      <React.Fragment>
        {/*this.state.examHome && <Redirect to="/exam" />*/}
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
                subsubjectNames[parseInt(subject / 100)][
                  subject - parseInt(subject / 100) * 100
                ]
              }
            />
          ) : (
            <ExamBoard
              subject={
                subject === -1
                  ? "오답노트"
                  : subsubjectNames[parseInt(subject / 100)][
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
