//node_modules
import React, { Component } from "react";
import { List, Map } from "immutable";

//services
import * as service from "../../../services/live";

import QuizList from "components/class/board-contents/liveboard/quizList";
import QuizWrite from "components/class/board-contents/liveboard/makeQuiz";

class LiveQuizBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,
      list: [],
      quizList: List([
        {
          type: "choiceable",
          context: "",
          img: null,
          answer: 0,
          example: List(["", ""])
        }
      ]),
      defaultQuiz: {
        type: "choiceable",
        context: "",
        img: null,
        answer: 0,
        example: List(["", ""])
      },
      isWrite: false
    };
  }

  componentDidMount() {
    service
      .getList(this.props.token, this.props.match.params.id)
      .then(function(response) {
        console.log(response.data);
        if (response.data.status) {
          this.setState(state => ({
            list: response.data.list
          }));
        }
      });
  }

  onChangeValue = e => {
    const target = e.target;
    const name = target.name === undefined ? target.id : target.name;
    console.log(name, this.state.writeExam);
    switch (name) {
      case "context":
        this.setState(state => ({
          quizList: state.quizList.update(state.idx, val => ({
            ...val,
            context: e.srcElement.innerHTML
          }))
        }));
        break;
      case "explanation":
        this.setState(state => ({
          quizList: state.quizList.update(state.idx, val => ({
            ...val,
            explanation: e.srcElement.innerHTML
          }))
        }));
        break;
      case "img":
        this.setState(state => ({
          quizList: state.quizList.update(state.idx, val => ({
            ...val,
            img: e.target.files[0]
          }))
        }));
        break;
      default:
        if (/^example(\d+)/.test(name)) {
          const result = /^example(\d+)/.exec(name);
          const idx = parseInt(result[1]);
          console.log(
            this.state.quizList.get(this.state.idx).example.get(idx) !==
              target.value
          );
          if (
            this.state.quizList.get(this.state.idx).example.get(idx) !==
            target.value
          ) {
            if (
              idx + 1 ===
              this.state.quizList.get(this.state.idx).example.size
            ) {
              this.setState(state => ({
                quizList: state.quizList.update(state.idx, val => ({
                  ...val,
                  example: val.example.update(idx, val => target.value).push("")
                }))
              }));
            } else if (
              target.value == "" &&
              this.state.quizList.get(this.state.idx).example.size > 2
            ) {
              this.setState(state => ({
                quizList: state.quizList.update(state.idx, val => ({
                  ...val,
                  example: val.example.delete(idx)
                }))
              }));
            } else {
              this.setState(state => ({
                quizList: state.quizList.update(state.idx, val => ({
                  ...val,
                  example: val.example.set(idx, target.value)
                }))
              }));
            }
          }
        } else {
          this.setState(state => ({
            quizList: state.quizList.update(state.idx, val => ({
              ...val,
              [name]: target.value
            }))
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

  onclickCreate = () => {
    this.setState(state => ({ isWrite: true }));
  };

  onclickAdd = () => {
    this.setState(state => ({
      quizList: state.quizList.push(state.defaultQuiz)
    }));
  };

  onclickBack = () => {
    if (this.state.idx === 0) {
      alert("처음문제 입니다.");
      return;
    }
    this.setState(state => ({ idx: state.idx - 1 }));
  };

  onclickNext = () => {
    if (this.state.idx === this.state.quizList.size - 1) {
      alert("마지막문제 입니다.");
      return;
    }
    this.setState(state => ({ idx: state.idx + 1 }));
  };

  render() {
    const { match } = this.props;
    const { quizList, idx } = this.state;
    return this.state.isWrite ? (
      <QuizWrite
        onChangeValue={this.onChangeValue}
        value={quizList.get(idx)}
        idx={idx}
        onselectAnswer={this.onselectAnswer}
        onSubmit={this.onClickMakeQ}
        onclickBack={this.onclickBack}
        onclickNext={this.onclickNext}
        onclickAdd={this.onclickAdd}
      />
    ) : (
      <QuizList url={match.url} onclickCreate={this.onclickCreate} />
    );
  }
}

export default LiveQuizBoard;
