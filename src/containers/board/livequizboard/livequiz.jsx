//node_modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Quiz from "components/class/board-contents/liveboard/quiz";

class LiveQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: -1,
      anchorEl: null,
      isWrite: false,
      nowIdx: 0,
      total: 0,
      subject: -1,
      ID: "user1",
      isRefresh: false,
      quiz: {
        type: "choiceable",
        context: "",
        img: null,
        answer: 0,
        example: []
      },
      template: {
        searchCode: null
      }
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentDidMount() {
    const { location, match } = this.props;
    console.log("match", match);
    // this is an "echo" websocket service
    this.connection = new WebSocket(`wss://golony.dev/ws/${match.params.id}`);
    // listen to onmessage event
    this.connection.onmessage = evt => {
      // add the new message to state
      this.setState({
        messages: this.state.messages.concat([evt.data])
      });
    };

    // for testing purposes: sending to the echo service which will send it back back
    // setInterval(_ => {
    //   this.connection.send(Math.random());
    // }, 2000);

    // console.log("componentDidMount() start");
    // console.log(
    //   this.props.match,
    //   this.props.match.path === "/exam/:code(\\d+)"
    // );
    // console.log("componentDidMount:", this.props.location);
    // if (this.props.match.path === "/exam/:code(\\d+)") {
    //   this.updateAllQ(
    //     this.props.token,
    //     -3,
    //     1,
    //     parseInt(this.props.match.params.code)
    //   );
    // } else {
    //   this.updateAllQ(this.props.token, -1, 5, -1);
    // }
    // console.log("componentDidMount() end");
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
    // removeQuestion();
    // setState(state => ({ total: 0, nowIdx: 0 }));
    // service.getQuestion(token, subject, num, code).then(function(response) {
    //   if (response.data.status) {
    //     if (response.data.num !== 0) {
    //       const array =
    //         subject !== -2 ? response.data.data : response.data.questions;
    //       for (let index = 0; index < array.length; index++) {
    //         const element = array[index];
    //         addQuestion(element);
    //       }
    //       setState(state => ({ ID: response.data.id, total: array.length }));
    //     }
    //   }
    //   setState(state => ({ ID: response.data.id }));
    // });
  };

  onclickExample = (code, choice) => {
    const { token, questions, addAnswer } = this.props;
    const { nowIdx } = this.state;
    // service.markQuestion(token, code, choice).then(function(response) {
    //   console.log(response);
    //   if (response.data.status) {
    //     addAnswer(
    //       nowIdx,
    //       choice,
    //       response.data.answer,
    //       response.data.explanation
    //     );
    //     console.log(questions.get(nowIdx));
    //   }
    // });
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
    // service.makeQuestion(token, subject, writeExam).then(function(response) {
    //   console.log(response);
    //   if (response.data.status) {
    //   }
    // });
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

  render() {
    const { theme, isLogin, questions } = this.props;
    const { nowIdx, total, ID, subject } = this.state;

    return (
      <React.Fragment>
        <Quiz />
        {/* {this.state.isWrite ? (
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
        )} */}
      </React.Fragment>
    );
  }
}

export default LiveQuiz;
