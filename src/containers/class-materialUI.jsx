//node_modules
import React, { Component } from "react";
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
import Template from "components/class/template";
import Boards from "components/class/boards"

//stores
import { chageBoard } from "store/modules/classboard";

class ClassMaterialUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
			isTeacher: true
		};
  }

  render() {
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
				onClick={() => onChangeBoard(index)}
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
          <div>
            <Divider />
              {ListItems(text, index)}
          </div>
        ))}
      </div>
    );

		const { theme, board, onChangeBoard } = this.props;
		const isTeacher = this.state.isTeacher;

    return (
      <Template theme={theme} drawer={drawer} title="Go100 Exam">
        <Boards
					isTeacher={isTeacher}
          boardNo={board}
        />
      </Template>
    );
  }
}

const mapStateToProps = ({ classboard }) => ({
  board: classboard.get("board")
})

const mapDispatchToProps = dispatch => ({
  onChangeBoard: board => dispatch(chageBoard(board))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassMaterialUI);