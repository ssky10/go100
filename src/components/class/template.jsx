import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";

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
  title: {
    ...theme.typography.h6,
    color: "#FFFFFF",
    fontFamily: "Nanum Gothic",
    fontSize: "1.5rem",
    fontWeight: 900
  },
  wideAppBar: {
    width: "100%"
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#C5D3D9"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class Template extends React.Component {
  defaultProps = {
    drawer: false
  };

  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, drawer, title } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={drawer ? classes.appBar : classes.wideAppBar}
        >
          <Toolbar>
            {drawer && (
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            <div className={classes.title}>{title}</div>
          </Toolbar>
        </AppBar>
        {drawer && (
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="js">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <div className={classes.toolbar} />
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="js">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                <div className={classes.toolbar} />
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

Template.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Template);