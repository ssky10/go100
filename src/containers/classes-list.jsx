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



const cards = [1, 2, 3, 4, 5, 6];
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
      <div classname = {classes.root}>


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


           <div className={classNames(classes.layout, classes.cardGrid)}>
           {/* End hero unit */}
           <Grid container spacing={40}>
             {cards.map(card => (
               <Grid item key={card} sm={6} md={4} lg={3}>
                 <Card className={classes.card}>
                   {/* <CardMedia
                     className={classes.cardMedia}
                     image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                     title="Image title"
                   /> */}
                   <CardContent className={classes.cardContent}>
                     <Typography gutterBottom variant="h5" component="h2">
                       Heading
                     </Typography>
                     <Typography>
                       This is a media card. You can use this section to describe the content.
                     </Typography>
                   </CardContent>
                   <CardActions>
                     <Button size="small" color="primary">
                       View
                     </Button>
                     <Button size="small" color="primary">
                       Edit
                     </Button>
                   </CardActions>
                 </Card>
               </Grid>
             ))}
           </Grid>
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


ClassesList.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(ClassesList);

export default withStyles(styles)(ClassesList);