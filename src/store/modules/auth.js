import { Map } from "immutable";

// 액션 타입을 정의해줍니다.
const LOGIN = "auth/LOGIN";
const LOGOUT = "auth/LOGOUT";
const SETTOKEN = "auth/SETTOKEN";
const NOTIREGISTER = "auth/NOTIREGISTER";
const NOTIUNREGISTER = "auth/NOTIUNREGISTER";

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const storeLogin = (ID, userToken) => ({ type: LOGIN, ID, userToken });
export const storeLogout = () => ({ type: LOGOUT });
export const setToken = userToken => ({ type: SETTOKEN, userToken });
export const notiRegister = token => ({ type: NOTIREGISTER, token });
export const notiUnRegister = () => ({ type: NOTIUNREGISTER });

// 모듈의 초기 상태를 정의합니다.
const initialState = Map({
  isLogin: false,
  ID: "",
  userToken: "",
  token: "",
  isNoti: false
});

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
  // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
  // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
  switch (action.type) {
    case LOGIN:
      // **** set 으로 특정 필드의 값을 설정
      return state
        .set("isLogin", true)
        .set("user", action.ID)
        .set("userToken", action.userToken);
    case LOGOUT:
      return state
        .set("isLogin", false)
        .set("user", "")
        .set("userToken", "");
    case SETTOKEN:
      return state.set("isLogin", true).set("userToken", action.userToken);
    case NOTIREGISTER:
      return state.set("isNoti", true).set("token", action.token);
    case NOTIUNREGISTER:
      return state.set("isNoti", false).set("token", "");
    default:
      return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
  }
}
