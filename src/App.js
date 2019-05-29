//node_module
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  faBars,
  faTimes,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import Paper from "@material-ui/core/Paper";
import Block from "@material-ui/icons/Block";
import Typography from "@material-ui/core/Typography";

//container&components
import { Login, ClassesList, Class, Exam } from "containers";
import Template from "components/template";
import { LoginProvider } from "./context/loginProvider";
import PrivateRoute from "./privateRoute";
import store from "./store";

//stylesheet
import "./App.css";

library.add(faBars, faTimes, faAngleLeft, faAngleRight);

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
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/classeslist" component={ClassesList} />
                <Route exact path="/class" component={Class} />
                <PrivateRoute exact path="/exam" component={Exam} />
                <PrivateRoute exact path="/exam/:code(\d+)" component={Exam} />
                <Route exact component={NoMatch} />
              </Switch>
            </MuiThemeProvider>
          </LoginProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

function NoMatch({ location }) {
  return (
    <Template theme={theme} title="Go100" isLogin={false}>
      <Paper elevation={1} style={{ margin: "1em", padding: "1em" }}>
        <Block
          style={{
            fontSize: "10em",
            color: "rgba(0,0,0,0.1)",
            float: "left",
            margin: "inherit"
          }}
        />
        <Typography component="h2" variant="h1">
          404 Error
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          style={{ marginBottom: "0.3em" }}
        >
          잘못된 접근입니다.
        </Typography>
        <Typography
          component="h6"
          variant="h6"
          style={{ marginBottom: "0.5em" }}
        >
          <code>{location.pathname}</code>는 없는 페이지 입니다.
        </Typography>
      </Paper>
    </Template>
  );
}

export default App;
