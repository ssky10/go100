import React, { Component, createContext } from "react";
import { getToken, saveToken } from "../localStorageAccess";

const Context = createContext(); // Context 를 만듭니다.

// Context 안에는 Provider 와 Consumer 라는게 존재합니다.
// 이 둘은, Context 를 이용하기 위해 필요한 컴포넌트들입니다.
// Consumer 는 나중에 내보내줄 때 편하도록 LoginConsumer 라고 부르도록 설정했습니다.
const { Provider, Consumer: LoginConsumer } = Context;

// Provider 에서 state 를 사용하기 위해서 컴포넌트를 새로 만들어줍니다.
class LoginProvider extends Component {
  constructor(props) {
    super(props);
    const token = getToken();
    this._changePage = (pageURL) => {
      if(!(this.state.pwd===pageURL)){
        this.setState({
          pwd: pageURL,
        });
      }
    }
    this.state = {
      token: token,
      isLogin: token ? true : false,
      pwd: 'login',
      changePage: this._changePage,
    };
  }

  // 여기서 actions 라는 객체는 우리가 임의로 설정하는 객체입니다.
  // 나중에 변화를 일으키는 함수들을 전달해줄때, 함수 하나하나 일일히 전달하는 것이 아니라,
  // 객체 하나로 한꺼번에 전달하기 위함입니다.
  actions = {
    setLogin: token => {
      saveToken(token);
      this.setState({ token: token, isLogin: true });
    }
  };

  render() {
    const { state, actions } = this;
    // Provider 내에서 사용할 값은, "value" 라고 부릅니다.
    // 현재 컴포넌트의 state 와 actions 객체를 넣은 객체를 만들어서,
    // Provider 의 value 값으로 사용하겠습니다.
    const auth = { state, actions };
    return <Provider value={auth}>{this.props.children}</Provider>;
  }
}

// :: HoC 를 사용
function useAuth(WrappedComponent) {
  return function useAuth(props) {
    return (
      <LoginConsumer>
        {({ state, actions }) => (
          <WrappedComponent
            {...props}
            token={state.token}
            isLogin={state.isLogin}
            setLogin={actions.setLogin}
          />
        )}
      </LoginConsumer>
    );
  };
}

// 내보내줍니다.
export { LoginProvider, LoginConsumer, useAuth };
