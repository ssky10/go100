//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 5,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 2,
        flexGrow: 1
    },
})

class NoticeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Notice"
        }
    }
    render() { 
        const { classes } = this.props;
        const title = this.state.title;
        
        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing = {24}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            variant="h5"
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                    >
                        <Grid
                            item
                            xs={1}
                        >
                            <Typography
                                variant="h6"
                                align="center"
                            >
                                idx
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={8}
                        >
                            <Typography
                                variant="h6"
                                align="center"
                            >
                                title
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                        >
                            <Typography
                                variant="h6"
                                align="center"
                            >
                                date
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider/>
                </Grid>
            </div>
        );
    }
}

NoticeBoard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NoticeBoard);
