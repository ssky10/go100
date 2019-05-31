import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";

//SVGIcon
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import NoteIcon from "@material-ui/icons/Notes";
import InboxIcon from "@material-ui/icons/Inbox";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.7),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.9)
    },
    margin: theme.spacing.unit,
    width: "auto"
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  example: {
    display: "-webkit-inline-box",
    width: "100%",
    fontSize: "inherit"
  }
});

const Drawer = ({
  classes,
  open,
  subjectNames,
  onClickSubject,
  subsubjectNames,
  onClickSubSubject,
  subjectIcons,
  onClickSearch,
  ...props
}) => {
  return (
    <div>
      <Divider />
      <form className={classes.search} onSubmit={onClickSearch}>
        <IconButton
          className={classes.searchIcon}
          aria-label="Search"
          type="submit"
          elevation={3}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          type="number"
          placeholder="문제번호"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
        />
      </form>
      <Divider />
      <ListItem button component={onClickSubSubject} subject={-2}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary={"작성한 문제"} />
      </ListItem>
      <Divider />
      <ListItem button component={onClickSubSubject} subject={-1}>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText inset primary={"오답노트"} />
      </ListItem>
      {subjectNames.map((text, index) => (
        <div>
          <Divider />
          <ListItem button onClick={() => onClickSubject(index)} key={text}>
            <ListItemIcon>
              <SvgIcon>{subjectIcons[index]}</SvgIcon>
            </ListItemIcon>
            <ListItemText inset primary={text} />
            {open === index ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={open === index}
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
                  component={onClickSubSubject}
                  subject={index * 100 + subindex}
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
};

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
  subjectNames: PropTypes.array,
  onClickSubject: PropTypes.func,
  subsubjectNames: PropTypes.array,
  onClickSubSubject: PropTypes.func,
  subjectIcons: PropTypes.array,
  onClickSearch: PropTypes.func
};

Drawer.defaultProps = {
  subjectNames: ["제목1", "제목2"],
  onClickSubject: () => {
    console.log("큰제목");
  },
  subsubjectNames: [["소제목1", "소제목2"], ["소제목1", "소제목2"]],
  onClickSubSubject: () => {
    console.log("소제목");
  },
  subjectIcons: [],
  onClickSearch: e => {
    console.log("검색!");
    e.preventDefault();
  }
};

export default withStyles(styles, { withTheme: true })(Drawer);
