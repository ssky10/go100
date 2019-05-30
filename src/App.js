//node_module
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { Paper, Typography } from '@material-ui/core'

//container&components
import { Login, ClassesList, ClassRouter, Exam } from "containers";

import PrivateRoute from "./privateRoute";
import Template from "components/template";

//SVG Icons
import Block from '@material-ui/icons/Block'

//store
import { LoginProvider, LoginConsumer } from "./context/loginProvider";
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
    ].join(","),
    h1:{
      fontWeight: 300,
    },
    h2:{
      fontWeight: 300,
    },
    h3:{
      fontWeight: 400,
    },
    h4:{
      fontWeight: 400,
    },
    h5:{
      fontWeight: 400,
    },
    h6:{
      fontWeight: 800
    },
    subtitle1:{
      fontWeight: 400,
    },
    subtitle2:{
      fontWeight: 700,
    },
    body1:{
      fontWeight: 400,
    },
    body2:{
      fontWeight: 400,
    },
    button:{
      fontWeight: 700,
    },
    caption:{
      fontWeight: 700,
    },
    overline:{
      fontWeight: 400,
    }
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
  constructor(props) {
    super(props);
    this.state = {
      page:'login'
    };
  }
  render() {
    const page = this.state.page;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <LoginProvider>
            <LoginConsumer>
              {(state)=>{
                if(!(page===state.page)){
                  this.setState({
                    page: state.page
                  })
                }
              }}
            </LoginConsumer>
            <MuiThemeProvider theme={theme}>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/classeslist" component={ClassesList}/>
                <Route path="/class" component={ClassRouter} />
                <PrivateRoute exact path="/exam" component={Exam} />
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
