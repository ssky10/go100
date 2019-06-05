//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { fromJS, List } from 'immutable';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';

//components
import Write from 'components/commons/write';
import PostCard from 'components/commons/postcard';
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
            posttitle: '',
            isTeacher: true,
            textfield: '',
            deadline:new Date(),
            postList: List()
        }
    }

    handleSumbit = e => {
        const { classIdx, token } = this.props
        const target = e.target;
        console.log("전송 시작");
        e.preventDefault();
        if (target.name === "post") {
            axios.writeHomework(classIdx, token, this.state.posttitle, this.state.textfield,this.state.deadline)
        }
    }

    handleChange = e => {
        const target = e.target
        const name = e.target.name

        console.log(name);
        console.log(target.value);

        this.setState({
            [name]: target.value
        });
    };

    componentDidMount(){
        const {classIdx, token}=this.props;

        axios.getHomeworkPostList(classIdx, token)
        .then(res =>{
            if(res.data){
                this.setState({
                    postList: fromJS(res.data.list)
                })
            }
        })
    }
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
                            <Write
                                isCard="Homework"
                                title={this.state.posttitle}
                                contents={this.state.textfield}
                                deadline={this.state.deadline}
                                handleChange={this.handleChange}
                                handleSumbit={this.handleSumbit}
                            />
                        </Grid>
                        }
                        <Grid
                            className={classes.body}
                            item
                            xs={12}
                        >
                            <PostCard
                                isNotice={false}
                                posts={this.state.postList}
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