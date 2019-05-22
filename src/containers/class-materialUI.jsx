//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { fromJS, List } from 'immutable';
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SvgIcon from "@material-ui/core/SvgIcon";

//SVGIcon
import HomeIcon from "@material-ui/icons/Home";
import NoticeIcon from "@material-ui/icons/Announcement";
import QNAIcon from "@material-ui/icons/QuestionAnswer";
import CreateIcon from "@material-ui/icons/Create"
import TeacherIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Event";

//components
import TemplateContainer from "containers/template-container";
import {
  MainBoard, 
  NoticeBoard, 
  WorkBoard, 
  QnABoard, 
  LiveQuizBoard,
  TeacherBoard
} from "containers/board";

//stores
import { changeBoard } from "store/modules/classboard";

//styles
import style from "containers/class-materialUI.module.css";

const cx = classNames.bind(style);

class ClassMaterialUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeacher: true,
      isLogined: true,
      title: '학원이름',
    };
  }

  render() {
    const { theme, board, onChangeBoard } = this.props;
    const title = this.state.title;
    const isLogined = this.state.isLogined;
    let boardNames = ["Main","공지사항", "과제", "Q&A", "LiveQuiz"];
    
    //강사로그인일 경우
    this.state.isTeacher ? boardNames.push("강사") : boardNames = boardNames;

    const boardIcons = [
      <HomeIcon />,
      <NoticeIcon />,
      <WorkIcon />,
      <QNAIcon />,
      <CreateIcon />,
			<TeacherIcon />
    ];
    
		const ListItems = (text, index) => ( 
			<ListItem 
				button 
				onClick={(e) => {
          onChangeBoard(index);
          }
        }
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

    const BoardsContainer = ({ boardNo }) => {
      return (
        <div className={cx('board-container')}>
                {(boardNo == 0) && (
                    <MainBoard
                      boardIdx={boardNo}
                    />
                )}
                {(boardNo == 1) && (
                    <NoticeBoard
                      boardIdx={boardNo}
                    />
                )}
                {(boardNo == 2) && (
                    <WorkBoard
                      boardIdx={boardNo}
                    />
                )}
                {(boardNo == 3) && (
                    <QnABoard
                      boardIdx={boardNo}
                    />
                )}
                {(boardNo == 4) && (
                    <LiveQuizBoard
                      boardIdx={boardNo}
                    />
                )}
                {(boardNo == 5) && (
                    <TeacherBoard
                      boardIdx={boardNo}
                    />
                )}
            </div>
      )
    }
    return (
      <TemplateContainer 
        theme={theme}
        drawer={drawer}
        title={title}
        isLogin={true}
        user={"user1"}
      >
        <BoardsContainer
          boardNo={board}
        />
      </TemplateContainer>
    );
  }
}

const mapStateToProps = ({ classboard }) => ({
  board: classboard.get("board")
})

const mapDispatchToProps = dispatch => ({
  onChangeBoard: board => dispatch(changeBoard(board))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassMaterialUI);