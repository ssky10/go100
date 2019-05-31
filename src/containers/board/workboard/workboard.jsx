//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { fromJS, List } from 'immutable';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';

//components
import WorkWrite from 'components/class/board-contents/workboard/work-write';
import WorkCard from 'components/class/board-contents/workboard/work-card';

//service
import * as axios from 'services/post'

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 5,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 2,
        flexGrow: 1
    },
    title:{
        marginBottom: theme.spacing.unit * 2
    },
    contents:{        
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 10,
    },
    write:{
        marginBottom: theme.spacing.unit * 2
    }
})


class WorkBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Work",
            isTeacher: true,
            textfield: ''
        }
    }

    handleSumbit = e => {
        const target = e.target;
        console.log("전송 시작");
        if (target.name === "post") {
        }
    }

    handleContentsChange = e => {
        this.setState({
            textfield: e.target.value
        });
    };

    render() { 
        const { classes } = this.props;
        const title = this.state.title;
        const isTeacher = this.state.isTeacher;
        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={0}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.title}
                            variant="h5"
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid
                        className={classes.contents}
                        container
                        item
                        xs={12}
                    >
                        {isTeacher && 
                        <Grid
                            className={classes.write}
                            item
                            xs={12}
                        >
                            <WorkWrite
                                contents={this.state.textfield}
                                onChange={this.handleContentsChange}
                                onSubmit={this.handleSumbit}
                            />
                        </Grid>
                        }
                        <Grid
                            className={classes.body}
                            item
                            xs={12}
                        >
                            <WorkCard
                                user="teacher"
                                date="MM-DD"
                                contents="test"
                            />
                        </Grid>
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