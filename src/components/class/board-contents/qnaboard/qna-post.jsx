//node_modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, List } from 'immutable';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';
import { QuestionAnswer } from '@material-ui/icons';

//services
import { useAuth } from 'context/loginProvider'
import * as axios from 'services/post'

const styles = theme => ({
    root:{
        height: '502px',
        marginTop: theme.spacing.unit * 5,
        marginBottom : theme.spacing.unit * 2,
        flexGrow: 1
    },
    title:{
        textAlign: 'center',
        background: '#f8f8f8',
        padding: theme.spacing.unit * 2,
        borderBottom: '1px solid #e9e9e9'
    },
    answericon:{
        paddingTop: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 2,
        borderBottom: '1px solid #e9e9e9',
        borderRight: '1px solid #e9e9e9'
    },
    grid:{
        padding: theme.spacing.unit * 1,
        borderBottom: '1px solid #e9e9e9',
        borderRight: '1px solid #e9e9e9'
    },
    body:{
        height:'400px',
        padding: theme.spacing.unit * 1,
        borderBottom: '1px solid #e9e9e9',
    }

})

class QnAPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            post: List()
        }
    }

    componentDidMount() {
        const { token } = this.props;
        const postId = this.props.match.params.id;
        console.log(this.props)
        axios
        .getQnAPost(token, 1, postId)
        .then(res => {
            console.log(res.data);
            if(res.data){
                this.setState({
                post: fromJS(res.data)
                })
            }
        })
    }

    render(){
        const { classes, match } = this.props
        const post = this.state.post;

        console.log("After toJS");   

        if(post){
            const { title, writer_id, date,  isAnswered, is_teacher, q_contents, a_contents } = post.toJS();
            return (
                <Grid
                    container
                    spacing={0}
                >
                    <Grid
                        item
                        xs={1}
                    />
                    <Grid
                        item
                        xs={10}
                    >
                        <Paper
                            className={classes.root}
                            elevation={1}
                            square={true}
                        >
                            <Grid
                                container
                                spacing={0}
                            >
                                <Grid
                                    className={classes.title}
                                    item
                                    xs={12}
                                >
                                    <Typography
                                        variant="h6"
                                    >
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={ classes.answericon}
                                    item
                                    xs={1}
                                >
                                    {(isAnswered==='1') &&
                                    <QuestionAnswer
                                        className={classes.contentsicon}
                                    />}
                                </Grid>
                                <Grid
                                    className={classes.grid}
                                    item
                                    xs={8}
                                >
                                    <Typography
                                        variant="body1"
                                    >
                                        {writer_id}
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={classes.grid}
                                    item
                                    xs={3}
                                >
                                    <Typography
                                        variant="body1"
                                    >
                                        {date}
                                    </Typography>
                                </Grid>        
                                <Grid
                                    className={classes.body}
                                    item
                                    xs={12}
                                >
                                    {q_contents}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={1}
                    />
                </Grid>
            );
        }
        else{
            return(
                <Paper/>
            )
        }
    }
}

QnAPost.propTypes = {
    classes:PropTypes.object.isRequired
}
export default ((withStyles(styles))(useAuth(QnAPost)));