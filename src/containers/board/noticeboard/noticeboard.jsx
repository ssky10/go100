//node_modules
import React, { Component } from 'react';
import { List, fromJS } from 'immutable';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

//components
import PostCard from 'components/commons/postcard'
import Write from 'components/commons/write';

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
            posttitle: '',
            isTeacher: true,
            textfield: '',
            postlists: List()
        }
    }

    handleSubmit = e => {
        const { token, classIdx } = this.props;
        const target = e.target;
        if (target.name === "post") {
            axios
                .setNoticePost(token, classIdx, this.state.textfield, this.state.posttitle);
        }
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        console.log("name : "+name);
        console.log("target : "+target.value);
        this.setState({
            [name]: target.value
        });
    };

    componentDidMount() {
        const { classIdx, boardIdx, token } = this.props;
        axios
            .getNoticePostList(token, classIdx, boardIdx)
            .then(res => {
                if( res.data.list ){
                    this.setState({
                        postlists: fromJS(res.data.list)
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
                                isCard="Notice"
                                title={this.state.posttitle}
                                contents={this.state.textfield}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                            />
                        </Grid>
                        }
                        <Grid
                            item
                            xs={12}
                        >
                            <PostCard
                                isNotice={true}
                                classIdx={this.props.classIdx}
                                token={this.props.token}
                                posts={this.state.postlists}
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
