import { Map, List } from "immutable";

// 액션 타입을 정의해줍니다.
const CHANGESUBJECT = "exam/CHANGESUBJECT";
const ADDQUESTION = "exam/ADDQUESTION";
const REMOVEQUESTION = "exam/REMOVEQUESTION";

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const changeSubject = subject => ({ type: CHANGESUBJECT, subject });
export const addQuestion = question => ({ type: ADDQUESTION, question });
export const removeQuestion = () => ({ type: REMOVEQUESTION });

// 모듈의 초기 상태를 정의합니다.
const initialState = Map({
  subject: -1,
  questions: List()
});

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
  // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
  // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
  switch (action.type) {
    case CHANGESUBJECT:
      // **** set 으로 특정 필드의 값을 설정
      return state.set("subject", action.subject);

    case ADDQUESTION:
      return state.update("questions", questions =>
        questions.push(Map(action.question))
      );

    case REMOVEQUESTION:
      return state.set("questions", List());

    default:
      return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
  }
}
