//node_module
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

//container&components
import { Login, ClassesList, Class, Exam } from "containers";
import QnAPost from './components/class/board-contents/qnaboard/qna-post';
import { LoginProvider } from "./context/loginProvider";
import store from "./store";

//stylesheet
import "./App.css";

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "NanumSquare",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary: {
      main: "#feeae6"
    }
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <LoginProvider>
            <MuiThemeProvider theme={theme}>
              <Route exact path="/" component={Login} />
              <Route exact path="/classeslist" component={ClassesList} />
              <Route exact path="/class" component={Class} />
              <Route path="/class/qna/post/:id" component={QnAPost}/>
              <Route exact path="/exam" component={Exam} />
            </MuiThemeProvider>
          </LoginProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
