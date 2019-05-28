import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles, ListItem, ListItemIcon, ListItemText, Divider, SvgIcon } from '@material-ui/core'

import {
    MainBoard, 
    NoticeBoard, 
    WorkBoard, 
    QnABoard, 
    LiveQuizBoard,
    TeacherBoard
} from "containers/board";

import QnAPost from 'components/class/board-contents/qnaboard/qna-post';

import { TemplateContainer } from "containers";

import HomeIcon from "@material-ui/icons/Home";
import NoticeIcon from "@material-ui/icons/Announcement";
import QNAIcon from "@material-ui/icons/QuestionAnswer";
import CreateIcon from "@material-ui/icons/Create"
import TeacherIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Event";

const styles = theme => {

}
class ClassRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTeacher: true
        }
    }
    render() { 
        const { theme, classes, match } = this.props;
        
        let boardNames = ["Main","공지사항", "과제", "Q&A", "LiveQuiz"];

        this.state.isTeacher ? boardNames.push("강사") : boardNames = boardNames;

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
            <TemplateContainer 
                theme={theme}
                drawer={drawer}
                title='우효'
                isLogin={true}
                user={"user1"}
            >
                <Switch>
                    <Route exact path={match.url} component={MainBoard}/>
                    <Route path="/class/notice" component={NoticeBoard}/>
                    <Route path="/class/work" component={WorkBoard}/>
                    <Route exact path="/class/qna" component={QnABoard}/>   
                    <Route path="/class/qna/post/:id" component={QnAPost}/>
                    <Route path="/class/livequiz" component={LiveQuizBoard}/>
                    <Route path="/class/teacher" component={TeacherBoard}/> 
                </Switch>
            </TemplateContainer>            
        );
    }
}
ClassRouter.propTypes = {
    classes: PropTypes.object.isRequired
}

ClassRouter.defaultProps ={}
export default withStyles(styles)(ClassRouter);