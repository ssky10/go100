//node_modules
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

//components
import TemplateContainer from "./template-container";
import ClassList from "components/class/classeslist";
import { useAuth } from "../context/loginProvider";
import { getlist, makeClass } from "../services/list";

import AddIcon from "@material-ui/icons/Add";

class ClassesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ID: "user",
      isTeacher: false,
      open: false,
      name: "",
      desc: ""
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.setList();
  }

  setList = () => {
    const { token } = this.props;
    const setState = this.setState.bind(this);
    getlist(token).then(function(result) {
      if (result.data.status) {
        setState(state => ({
          list: result.data.Context,
          ID: result.data.id,
          isTeacher: result.data.is_teacher
        }));
      }
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCreate = () => {
    const { token } = this.props;
    const { name, desc } = this.state;
    const setList = this.setList.bind(this);
    const setState = this.setState.bind(this);
    makeClass(token, name, desc).then(function(response) {
      if (response.data.status) {
        setState({ open: false });
        setList();
      }
    });
  };

  onChange = e => {
    const target = e.target;
    const name = target.id;
    console.log(name, target.value);
    this.setState({
      [name]: target.value
    });
  };

  render() {
    const { classes, theme, isLogin, token } = this.props;
    const { ID, isTeacher, open } = this.state;

    const appBarMenu = (
      <div>
        <Tooltip title="클래스 개설">
          <IconButton
            color="inherit"
            aria-label="create-class"
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">수업 개설하기</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="수업명"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="desc"
              label="수업설명"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>취소</Button>
            <Button onClick={this.handleCreate}>개설하기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    return (
      <div className={classes}>
        <TemplateContainer
          theme={theme}
          title="클래스 목록"
          isLogin={isLogin}
          user={ID}
          token={token}
          menu={isTeacher ? appBarMenu : null}
        >
          <ClassList list={this.state.list} />
        </TemplateContainer>
      </div>
    );
  }
}

export default useAuth(ClassesList);
