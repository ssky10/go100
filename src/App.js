//node_module
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  faBars,
  faTimes,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

//container&components
import { Login, ClassesList, Class, ClassNoMaterialUI, Exam } from "containers";
import { LoginProvider } from "./context/loginProvider";
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
              <Route exact path="/" component={Login} />
              <Route exact path="/classeslist" component={ClassesList} />
              <Route exact path="/class" component={Class} />
              <Route exact path="/exam" component={Exam} />
            </MuiThemeProvider>
          </LoginProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
