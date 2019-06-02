import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import classNames from "classnames";
import { Link } from "react-router-dom";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

const ClassList = ({ classes, list }) => {
  return (
    <div className={classNames(classes.layout, classes.cardGrid)}>
      <Grid container spacing={40}>
        <Grid item key="exam" sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                문제풀기
              </Typography>
              <Typography>
                내가 직접 문제를 출제하고 다른 친구들이 작성한 문제를
                풀어보세요.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={"/exam"}>
                바로가기
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {list.map(card => (
          <Grid item key={card} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.class_name}
                </Typography>
                <Typography>{card.class_desc}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={"/class/" + card.class_id}
                >
                  입장하기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

ClassList.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array
};

ClassList.defaultProps = {
  list: []
};

export default withStyles(styles)(ClassList);
