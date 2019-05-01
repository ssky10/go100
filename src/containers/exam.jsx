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
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HangleIcon from "icons/hangleIcon";
import EngIcon from "icons/engIcon";
import MathIcon from "icons/mathIcon";
import HistoryIcon from "icons/historyIcon";
import SocietyIcon from "icons/societyIcon";
import ScienceIcon from "icons/scienceIcon";

//components
import Template from "components/exam/template";
import ExamBoard from "components/exam/examBoard";

//stores
import { changeSubject } from "../store/modules/exam";

//stylesheet
import style from "containers/exam.module.css";
const cx = classNames.bind(style);

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = { open: -1 };
  }

  handleClick = subject => {
    if (subject === this.state.open) this.setState(state => ({ open: -1 }));
    else this.setState(state => ({ open: subject }));
  };

  render() {
    const subjectNames = ["국어", "영어", "수학", "한국사", "사회", "과학"];
    const subjectIcons = [
      <HangleIcon size="24" />,
      <EngIcon />,
      <MathIcon size="24" />,
      <HistoryIcon />,
      <SocietyIcon />,
      <ScienceIcon />
    ];
    const subsubjectNames = [
      ["중등국어", "공통국어", "화법과 작문", "언어와 매체", "독서", "문학"],
      ["공통영어", "영어1", "영어2", "영어회화", "영어독해와 작문"],
      ["중등수학", "공통수학", "수학1", "수학2", "미적분", "확률과 통계"],
      ["중등역사", "한국사"],
      ["중등사회", "통합사회", "정치와 법", "경제", "사회/문화", "생활과 윤리"],
      ["중등과학", "통합과학", "물리1/2", "화학1/2", "생명1/2", "지구과학1,2"]
    ];
    const drawer = (
      <div>
        {subjectNames.map((text, index) => (
          <div>
            <Divider />
            <ListItem button onClick={() => this.handleClick(index)}>
              <ListItemIcon>
                <SvgIcon>{subjectIcons[index]}</SvgIcon>
              </ListItemIcon>
              <ListItemText inset primary={text} />
              {this.state.open === index ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.open === index}
              timeout="auto"
              unmountOnExit
            >
              <Divider />
              <List component="div" disablePadding>
                {subsubjectNames[index].map((text, subindex) => (
                  <ListItem
                    button
                    key={text}
                    onClick={() => changeSubject(index * 100 + subindex)}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </div>
    );

    const { theme, subject, changeSubject } = this.props;
    return (
      <div className={cx("class-container")}>
        <Template theme={theme} drawer={drawer} title="Go100 Exam">
          <ExamBoard subject={subject} />
        </Template>
      </div>
    );
  }
}

const mapStateToProps = ({ exam }) => ({
  subject: exam.get("subject")
});

const mapDispatchToProps = dispatch => ({
  changeSubject: subject => dispatch(changeSubject(subject))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exam);
