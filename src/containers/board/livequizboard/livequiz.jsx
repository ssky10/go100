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
      nowIdx: 1,
      total: 0,
      user_num: 0,
      quiz: {
        type: "choiceable",
        context: "",
        img: null,
        answer: -1,
        choice: -1,
        example: []
      },
      scoreView: {},
      state: "wait"
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      "componentDidUpdate: " +
        JSON.stringify(prevProps) +
        " " +
        JSON.stringify(prevState)
    );
    console.log(
      "componentDidUpdateNew: " +
        JSON.stringify(this.props) +
        " " +
        JSON.stringify(this.state)
    );
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
      const data = JSON.parse(evt.data);
      console.log(data);
      console.log(this.state);
      switch (data.method) {
        case "s2c_init":
          this.setState({
            isTeacher: data.is_teacher
          });
          break;
        case "s2c_update_count":
          //현재 접속자수 업데이트
          this.setState({
            user_num: data.user_count
          });
          break;
        case "s2c_start":
          //문제 시작
          this.setState({
            state: "start",
            nowIdx: data.reqIdx,
            total: data.count,
            quiz: {
              choiceable: data.choiceable,
              context: data.context,
              img: data.img,
              example: data.example,
              choice: -1,
              answer: -1
            }
          });
          break;
        case "s2c_next":
          //문제 종료
          this.setState(state => ({
            state: "next",
            nowIdx: state.nowIdx + 1,
            quiz: {
              ...state.quiz,
              answer: data.answer
            }
          }));
          break;
        case "s2c_result":
          //최종결과
          this.setState(state => ({
            state: "result",
            quiz: {
              ...state.quiz,
              answer: data.answer
            }
          }));
          break;
        case "s2c_report":
          //최종결과
          this.setState(state => ({
            state: "result",
            quiz: {
              ...state.quiz,
              answer: data.answer
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
            reqIdx: nowIdx
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
          choice: choice
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
        }
        break;
      case "start":
        try {
          this.sendWSMessage("c2s_next");
        } catch (err) {
          alert(err);
        }
        break;
      case "next":
        try {
          if (nowIdx >= total) {
            this.sendWSMessage("c2s_result");
            this.setState(state => ({
              state: "result"
            }));
          } else {
            this.sendWSMessage("c2s_start");
            this.setState(state => ({
              state: "start"
            }));
          }
        } catch (err) {
          alert(err);
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
