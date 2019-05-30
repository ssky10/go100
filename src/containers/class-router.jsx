import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles, ListItem, ListItemIcon, ListItemText, Divider, SvgIcon, IconButton } from '@material-ui/core'

import {
    MainBoard, 
    NoticeBoard, 
    WorkBoard, 
    QnABoard, 
    LiveQuizBoard,
    TeacherBoard
} from "containers/board";

import QnAPost from 'components/class/board-contents/qnaboard/qna-post';
import QnAWrite from 'components/class/board-contents/qnaboard/qna-write';

import { TemplateContainer } from "containers";

import ArrowBack from "@material-ui/icons/ArrowBack";
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
        const { theme, classes, history } = this.props;
        
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
        
        const menu = (
            <IconButton
                color="inherit"
                onClick={()=>{history.push('/classeslist')}}
            >
                <ArrowBack/>
            </IconButton>
        )
        
        console.log(this.props);
        return (
            <TemplateContainer 
                theme={theme}
                drawer={drawer}
                menu={menu}
                title='우효'
                isLogin={true}
                user={"user1"}
            >
                <Switch>
                    <Route exact path="/class" render={()=>(
                        <MainBoard boardIdx={0}/>
                    )}/>
                    <Route path="/class/notice" render={()=>(
                        <NoticeBoard boardIdx={1}/>
                    )}/>
                    <Route path="/class/work" render={()=>(
                        <WorkBoard boardIdx={2}/>
                    )}/>
                    <Route exact path="/class/qna" render={()=>(
                        <QnABoard boardIdx={3}/>
                    )}/>
                    <Route path="/class/qna/write/" component={QnAWrite}/>
                    <Route path="/class/qna/post/:id" component={QnAPost}/>
                    <Route path="/class/livequiz" render={()=>(
                        <LiveQuizBoard boardIdx={4}/>
                    )}/>
                    <Route path="/class/teacher" render={()=>(
                        <TeacherBoard boardIdx={5}/>
                    )}/> 
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