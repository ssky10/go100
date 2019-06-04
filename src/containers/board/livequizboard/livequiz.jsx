//node_modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Quiz from "components/class/board-contents/liveboard/quiz";

class LiveQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeacher: false,
      nowIdx: 0,
      total: 0,
      user_num: 0,
      quiz: {
        type: "choiceable",
        context: "",
        img: null,
        answer: -1,
        example: []
      },
      scoreView: {},
      state: "wait"
    };
  }

  componentDidMount() {
    const { location, match } = this.props;
    const sendWSMessage = this.sendWSMessage.bind(this);
    console.log("match", match);
    // this is an "echo" websocket service
    this.connection = new WebSocket(
      `wss://golony.dev/ws/livequiz/${match.params.id}/`
    );
    this.connection.onopen = function(event) {
      sendWSMessage("c2s_init");
    };

    // listen to onmessage event
    this.connection.onmessage = evt => {
      // add the new message to state
      switch (evt.data.method) {
        case "s2c_init":
          this.setState({
            isTeacher: evt.data.is_teacher
          });
          break;
        case "s2c_update_count":
          //현재 접속자수 업데이트
          this.setState({
            user_num: evt.data.user_count
          });
          break;
        case "s2c_start":
          //문제 시작
          this.setState({
            quiz: {
              total: evt.data.count,
              type: evt.data.choiceable ? "choiceable" : "non-choiceable",
              context: evt.data.context,
              img: evt.data.img,
              example: evt.data.example
            }
          });
          break;
        case "s2c_next":
          //문제 종료
          this.setState(state => ({
            quiz: {
              ...state.quiz,
              answer: evt.data.answer
            }
          }));
          break;
        case "s2c_result":
          //최종결과
          this.setState(state => ({
            quiz: {
              ...state.quiz,
              answer: evt.data.answer
            }
          }));
          break;
        case "s2c_report":
          //최종결과
          this.setState(state => ({
            quiz: {
              ...state.quiz,
              answer: evt.data.answer
            }
          }));
          break;
        default:
          break;
      }
    };
  }

  sendWSMessage = (msg, answer = 0) => {
    const { token } = this.props;
    const { nowIdx } = this.state;
    switch (msg) {
      case "c2s_init":
        this.connection.send(
          JSON.stringify({ method: msg, user_token: token })
        );
        break;
      case "c2s_start":
        this.connection.send(
          JSON.stringify({
            method: msg,
            user_token: token,
            reqIdx: nowIdx + 1
          })
        );
        break;
      case "c2s_answer":
        this.connection.send(
          JSON.stringify({
            method: msg,
            user_token: token,
            reqIdx: nowIdx,
            answer: String(answer)
          })
        );
        break;
      case "c2s_next":
        this.connection.send(
          JSON.stringify({
            method: msg,
            user_token: token,
            reqIdx: nowIdx
          })
        );
        break;
      case "c2s_result":
        this.connection.send(
          JSON.stringify({
            method: msg,
            user_token: token
          })
        );
        break;
      default:
        break;
    }
  };

  onclickExample = choice => {
    try {
      this.sendWSMessage("c2s_answer", choice);
    } catch (err) {
      alert(err);
    } finally {
      this.setState(state => ({
        quiz: {
          ...state.quiz,
          answer: choice
        }
      }));
    }
  };

  onclickNext = () => {
    const { state, total, nowIdx } = this.state;
    switch (state) {
      case "wait":
        try {
          this.sendWSMessage("c2s_start");
        } catch (err) {
          alert(err);
        } finally {
          this.setState(state => ({
            state: "start"
          }));
        }
        break;
      case "start":
        try {
          this.sendWSMessage("c2s_next");
        } catch (err) {
          alert(err);
        } finally {
          this.setState(state => ({
            state: "next"
          }));
        }
        break;
      case "next":
        try {
          if (nowIdx === total) {
            this.sendWSMessage("c2s_result");
          } else {
            this.sendWSMessage("c2s_start");
          }
        } catch (err) {
          alert(err);
        } finally {
          if (nowIdx === total) {
            this.setState(state => ({
              state: "result"
            }));
          } else {
            this.setState(state => ({
              nowIdx: state.nowIdx + 1,
              state: "start"
            }));
          }
        }
        break;
      case "result":
        this.connection.close();
        this.props.history.pop();
        break;
      default:
        break;
    }
  };

  onclickCreate = () => {
    this.setState(state => ({ isWrite: true }));
  };

  render() {
    const { nowIdx, user_num, quiz, scoreView, state, isTeacher } = this.state;
    return (
      <React.Fragment>
        <Quiz
          state={state}
          nowIdx={nowIdx}
          user_num={user_num}
          quiz={quiz}
          isTeacher={isTeacher}
          scoreView={scoreView}
          onclickNext={this.onclickNext}
          onclickExample={this.onclickExample}
        />
      </React.Fragment>
    );
  }
}

export default LiveQuiz;
