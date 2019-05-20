//node_modules
import React, { Component } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

//components
import Template from "components/template";

//stylesheet
// import styles from "containers/classes-list.module.css";
import { withStyles } from "@material-ui/core";

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

import ClassList from "components/class/classeslist";
const cx = classNames.bind(styles);

class ClassesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, theme, isLogin, user} = this.props;
    // const { classes }= this.props;

    return (
      <div classname = {classes}>


      <Template theme={theme} title="클래스 목록">
        <div>
          {isLogin && <h1>{user}의 클래스 목록입니다.</h1>}
          <List component="nav">
            <ListItem button component={Link} to="class">
              <ListItemText primary="Class Page" />
            </ListItem>
            <ListItem button component={Link} to="exam">
              <ListItemText primary="Exam" />
            </ListItem>
          </List>
        </div>
      </Template>

      <div>
        <ClassList>
          
        </ClassList>
      </div>
      



      





     </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  // **** .get 을 사용해서 값 조회
  isLogin: auth.get("isLogin"),
  user: auth.get("user")
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassesList);
