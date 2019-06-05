import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SvgIcon
} from "@material-ui/core";

//containers
import {
  MainBoard,
  NoticeBoard,
  WorkBoard,
  QnABoard,
  QnAPost,
  QnAWrite,
  LiveQuizBoard,
  LiveQuiz,
  TeacherBoard
} from "containers/board";
import { TemplateContainer } from "containers";

//services
import { useAuth } from "context/loginProvider";

//Icons
import HomeIcon from "@material-ui/icons/Home";
import NoticeIcon from "@material-ui/icons/Announcement";
import QNAIcon from "@material-ui/icons/QuestionAnswer";
import CreateIcon from "@material-ui/icons/Create";
import TeacherIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Event";

class ClassRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeacher: true
    };
  }

  render() {
    const { theme, match, token } = this.props;
    console.log(this.props);

    console.log(match.params.id);
    let boardNames = ["Main", "공지사항", "과제", "Q&A", "LiveQuiz"];

    this.state.isTeacher ? boardNames.push("강사") : (boardNames = boardNames);

    const boardIcons = [
      <HomeIcon />,
      <NoticeIcon />,
      <WorkIcon />,
      <QNAIcon />,
      <CreateIcon />,
      <TeacherIcon />
    ];

    const ListItems = (
      text,
      index,
      URLs = ["", "/notice", "/work", "/qna", "/livequiz", "/teacher"]
    ) => (
      <ListItem button component={Link} to={`${match.url}${URLs[index]}`}>
        <ListItemIcon>
          <SvgIcon>{boardIcons[index]}</SvgIcon>
        </ListItemIcon>
        <ListItemText inset primary={text} />
      </ListItem>
    );

    const drawer = (
      <div>
        {boardNames.map((text, index) => (
          <div key={index * 10}>
            <Divider />
            {ListItems(text, index)}
          </div>
        ))}
      </div>
    );
    return (
      <TemplateContainer
        theme={theme}
        drawer={drawer}
        title="우효"
        isLogin={true}
        user={"user1"}
      >
        <Switch>
          <Route
            exact
            path={match.url}
            render={() => (
              <MainBoard
                classIdx={match.params.id}
                boardIdx={0}
                token={token}
              />
            )}
          />
          <Route
            path={`${match.url}/notice`}
            render={() => (
              <NoticeBoard
                classIdx={match.params.id}
                boardIdx={1}
                token={token}
              />
            )}
          />
          <Route
            path={`${match.url}/work`}
            render={() => (
              <WorkBoard
                classIdx={match.params.id}
                boardIdx={2}
                token={token}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/qna`}
            render={() => (
              <QnABoard classIdx={match.params.id} boardIdx={3} token={token} />
            )}
          />
          <Route
            path={`${match.url}/qna/write`}
            render={() => <QnAWrite classIdx={match.params.id} token={token} />}
          />
          <Route path={`${match.url}/qna/post/:id`} component={QnAPost} />
          <Route
            path={`${match.url}/livequiz/:id`}
            render={props => <LiveQuiz token={token} {...props} />}
          />
          <Route
            path={`${match.url}/livequiz`}
            render={() => (
              <LiveQuizBoard boardIdx={4} token={token} match={match} />
            )}
          />
          <Route
            path={`${match.url}/teacher`}
            render={() => (
              <TeacherBoard
                classIdx={match.params.id}
                boardIdx={5}
                token={token}
              />
            )}
          />
        </Switch>
      </TemplateContainer>
    );
  }
}
export default useAuth(ClassRouter);
