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
      isReset: false,
      isTeacher: false,
      title: "",
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
    const setState = this.setState.bind(this);
    service
      .getList(this.props.token, this.props.match.params.id)
      .then(function(response) {
        console.log(response.data);
        if (response.data.status) {
          setState(state => ({
            list: response.data.list,
            isTeacher: response.data.is_teacher
          }));
        }
      });
  }

  onChangeValue = e => {
    const target = e.target;
    const name = target.name === undefined ? target.id : target.name;
    console.log(name, this.state.writeExam);
    switch (name) {
      case "title":
        this.setState(state => ({
          title: target.value
        }));
        break;
      case "context":
        this.setState(state => ({
          isReset: false,
          quizList: state.quizList.update(state.idx, val => ({
            ...val,
            context: e.srcElement.innerHTML
          }))
        }));
        break;
      case "img":
        this.setState(state => ({
          isReset: false,
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
                isReset: false,
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
                isReset: false,
                quizList: state.quizList.update(state.idx, val => ({
                  ...val,
                  example: val.example.delete(idx)
                }))
              }));
            } else {
              this.setState(state => ({
                isReset: false,
                quizList: state.quizList.update(state.idx, val => ({
                  ...val,
                  example: val.example.set(idx, target.value)
                }))
              }));
            }
          }
        } else {
          this.setState(state => ({
            isReset: false,
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
    const setState = this.setState.bind(this);
    service
      .makeQuiz(
        this.props.token,
        this.props.match.params.id,
        this.state.title,
        this.state.quizList
      )
      .then(function(response) {
        if (response.data.status) {
          setState(state => ({
            isWrite: false,
            quizList: List([state.defaultQuiz])
          }));
        }
      });
  };

  onselectAnswer = idx => {
    this.setState(state => ({
      quizList: state.quizList.update(state.idx, val => ({
        ...val,
        answer: idx
      }))
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
    this.setState(state => ({ idx: state.idx - 1, isReset: true }));
  };

  onclickNext = () => {
    if (this.state.idx === this.state.quizList.size - 1) {
      alert("마지막문제 입니다.");
      return;
    }
    this.setState(state => ({ idx: state.idx + 1, isReset: true }));
  };

  render() {
    const { match } = this.props;
    const { quizList, idx, list, isTeacher, title } = this.state;
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
        isReset={this.state.isReset}
        title={title}
      >
        {console.log("isReset", this.isReset)}
      </QuizWrite>
    ) : (
      <QuizList
        url={match.url}
        onclickCreate={this.onclickCreate}
        list={list}
        isTeacher={isTeacher}
      />
    );
  }
}

export default LiveQuizBoard;
