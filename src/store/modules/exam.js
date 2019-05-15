import { Map } from "immutable";

// 액션 타입을 정의해줍니다.
const CHANGESUBJECT = "exam/CHANGESUBJECT";

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const changeSubject = subject => ({ type: CHANGESUBJECT, subject });

// 모듈의 초기 상태를 정의합니다.
const initialState = Map({
  subject: 0
});

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
  // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
  // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
  switch (action.type) {
    case CHANGESUBJECT:
      // **** set 으로 특정 필드의 값을 설정
      return state.set("subject", action.subject);

    default:
      return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
  }
}
