//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

//components
import NoticeCard from 'components/class/board-contents/noticeboard/notice-card';
import NoticeWrite from 'components/class/board-contents/noticeboard/notice-write';

//sevices
import * as axios from "services/post";

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
        marginLeft: theme.spacing.unit * 10,
        marginRight: theme.spacing.unit * 10,
    },
    write:{
        marginBottom: theme.spacing.unit * 2
    }
})

class NoticeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Notice",
            isTeacher: true,
            textfield: ''
        }
    }

    handleSumbit = e => {
        const target = e.target;
        console.log("전송 시작");
        if (target.name === "post") {
            axios
                .setNoticePost(this.props.boardIdx, new Date(), this.state.textfield);
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
                            <NoticeWrite
                                contents={this.state.textfield}
                                onChange={this.handleContentsChange}
                                onSubmit={this.handleSumbit}
                            />
                        </Grid>
                        }
                        <Grid
                            item
                            xs={12}
                        >
                            <NoticeCard
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

NoticeBoard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NoticeBoard);
