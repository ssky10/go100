//node_modules
import React, { Component } from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";

//SVGIcon
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HangleIcon from "icons/hangleIcon";
import EngIcon from "icons/engIcon";
import MathIcon from "icons/mathIcon";
import HistoryIcon from "icons/historyIcon";
import SocietyIcon from "icons/societyIcon";
import ScienceIcon from "icons/scienceIcon";

//components
import Template from "components/template";
import ExamBoard from "components/exam/examBoard";

//stores
import { changeSubject } from "../store/modules/exam";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = { open: -1, anchorEl: null };
  }

  handleClick = subject => {
    if (subject === this.state.open) this.setState(state => ({ open: -1 }));
    else this.setState(state => ({ open: subject }));
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { theme, subject, changeSubject, isLogin, user } = this.props;
    const open = Boolean(this.state.anchorEl);
    const subjectNames = ["국어", "영어", "수학", "한국사", "사회", "과학"];
    const subjectIcons = [
      <HangleIcon size="24" />,
      <EngIcon size="24" />,
      <MathIcon size="24" />,
      <HistoryIcon size="24" />,
      <SocietyIcon size="24" />,
      <ScienceIcon size="24" />
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
              style={{ backgroundColor: "#ffffff" }}
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
    const appBarMenu = (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          {isLogin ? <Avatar>{user[0]}</Avatar> : <AccountCircle />}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>{user} Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );

    return (
      <Template
        theme={theme}
        drawer={drawer}
        title="Go100 Exam"
        menu={appBarMenu}
      >
        <ExamBoard subject={subject} />
      </Template>
    );
  }
}

const mapStateToProps = ({ exam, auth }) => ({
  subject: exam.get("subject"),
  isLogin: auth.get("isLogin"),
  user: auth.get("user")
});

const mapDispatchToProps = dispatch => ({
  changeSubject: subject => dispatch(changeSubject(subject))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exam);
