import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["국어", "영어", "수학", "사회", "과학"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchAppBar);
