//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { fromJS, List } from 'immutable';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';

//service
import * as service from 'services/post'

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 5,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 2,
        flexGrow: 1
    },
    boardtitle:{
        marginBottom: theme.spacing.unit * 3,
    },
    paper:{
        width: '100%',
    },
    listtitle:{
        backgroundColor: "#7cb6f3",
        padding: theme.spacing.unit * 1
    }
})


class WorkBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    componentDidMount(){
    }

    render() { 
        const { classes } = this.props;
        return (
            <div
                className={classes.root}
            >
                <Grid
                    container
                    spacing={0}
                >
                    <Grid
                        className={classes.boardtitle}
                        item
                        xs={12}
                    >
                        <Typography
                            variant="h5"
                        >
                            WorkBoard
                        </Typography>
                    </Grid>
                    <Grid                        
                        container
                        item
                        xs={12}
                    >
                        <Paper
                            className={classes.paper}
                            elevation={1}
                            square={true}
                        >
                            <Grid
                                className={classes.listtitle}
                                item
                                xs={12}
                            >
                                listTitle
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

WorkBoard.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(WorkBoard);