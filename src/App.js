//node_module
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { Paper, Typography, ListItem, ListItemIcon, ListItemText, Divider, SvgIcon } from '@material-ui/core'

//container&components
import { Login, ClassesList, Exam, TemplateContainer } from "containers";
import QnAPost from './components/class/board-contents/qnaboard/qna-post';
import {
  MainBoard, 
  NoticeBoard, 
  WorkBoard, 
  QnABoard, 
  LiveQuizBoard,
  TeacherBoard
} from "containers/board";
import PrivateRoute from "./privateRoute";
import Template from "components/template";

//SVG Icons
import Block from '@material-ui/icons/Block'
import HomeIcon from "@material-ui/icons/Home";
import NoticeIcon from "@material-ui/icons/Announcement";
import QNAIcon from "@material-ui/icons/QuestionAnswer";
import CreateIcon from "@material-ui/icons/Create"
import TeacherIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Event";

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
  constructor(props) {
    super(props);
    this.state = {
      page:'login'
    };
  }
  render() {
    const page = this.state.page;

    let boardNames = ["Main","공지사항", "과제", "Q&A", "LiveQuiz"];

    const boardIcons = [
      <HomeIcon />,
      <NoticeIcon />,
      <WorkIcon />,
      <QNAIcon />,
      <CreateIcon />,
			<TeacherIcon />
    ];

    const ListItems = (text, index, URLs=["/class","/class/notice","/class/work","/class/qna","/class/livequiz","/class/teacher"]) => (
			<ListItem 
				button
        component={Link}
        to={`${URLs[index]}`}
			>
        <ListItemIcon>
        <SvgIcon>{boardIcons[index]}</SvgIcon>
        </ListItemIcon>
        <ListItemText 
          inset 
          primary={text}
        />
      </ListItem>
    )
    
    const drawer = (
      <div>
        {boardNames.map((text, index) => (
          <div key = {index*10}>
            <Divider />
              {ListItems(text, index)}
          </div>
        ))}
      </div>
    );

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
                <Route exact path="/classeslist" component={ClassesList} />
                {
                  <TemplateContainer 
                    theme={theme}
                    drawer={drawer}
                    title='우효'
                    isLogin={true}
                    user={"user1"}
                  >
                    <Route exact path="/class" component={MainBoard} />
                    <Route exact path="/class/notice" component={NoticeBoard}/>
                    <Route exact path="/class/work" component={WorkBoard}/>
                    <Route exact path="/class/qna" component={QnABoard}/>
                    <Route exact path="/class/livequiz" component={LiveQuizBoard}/>
                    <Route exact path="/class/teacher" component={TeacherBoard}/>
                    <Route path="/class/qna/post/:id" component={QnAPost}/>
                  </TemplateContainer>
                }
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
