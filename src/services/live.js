import axios from "axios";

export function getList(token, class_id) {
  return axios.post("https://golony.dev/api/livequiz/livequizList", {
    Origin: window.location.hostname,
    user_token: token,
    class: parseInt(class_id)
  });
}

export function makeQuiz(userToken, classID, title, quizList) {
  const quizzes = [];
  quizList.toArray().forEach(function(item, idx) {
    let val = {};
    val.choiceable = item.type === "choiceable" ? true : false;
    val.context = item.context;
    val.answer = String(item.answer);
    val.example = item.example.pop().map((value, idx) => ({
      code: idx,
      context: value
    }));

    quizzes.push(val);
  });

  return axios.post("https://golony.dev/api/livequiz/newLiveQ", {
    Origin: window.location.hostname,
    user_token: userToken,
    class: classID,
    title: title,
    quizzes: quizzes
  });
}
