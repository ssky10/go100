//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SvgIcon from "@material-ui/core/SvgIcon";

//SVGIcon
import HangleIcon from "icons/hangul-icon";
import EngIcon from "icons/eng-icon";
import MathIcon from "icons/math-icon";
import HistoryIcon from "icons/history-icon";
import SocietyIcon from "icons/society-icon";
import ScienceIcon from "icons/science-icon";

//components
import Template from "components/class/template";
import Boards from "components/class/boards"

//stores
import { chageBoard } from "store/modules/classboard";

class ClassMaterialUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
			isTeacher: false
		};
  }

  render() {
    const subjectNames = ["Main","공지사항", "과제", "Q&A", "LiveQuiz", "강사"];
    const subjectIcons = [
      <HangleIcon size="24" />,
      <EngIcon size="24" />,
      <MathIcon size="24" />,
      <HistoryIcon size="24" />,
      <SocietyIcon size="24" />,
			<ScienceIcon size="24" />
		];

		const ListItems = (text, index) => (
			<ListItem 
				button 
				onClick={() => onChangeBoard(index)}
			>
        <ListItemIcon>
        <SvgIcon>{subjectIcons[index]}</SvgIcon>
        </ListItemIcon>
        <ListItemText 
          inset 
          primary={text}
        />
      </ListItem>
		)

    const drawer = (
      <div>
        {subjectNames.map((text, index) => (
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