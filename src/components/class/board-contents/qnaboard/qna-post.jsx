//node_modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, List } from 'immutable';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';
import { QuestionAnswer } from '@material-ui/icons';

//services
import * as axios from 'services/post'

const styles = theme => ({
    root:{
        width: '700px',
        height: '800px',
        marginTop: theme.spacing.unit * 5,
        marginBottom : theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 10,
        marginRight: theme.spacing.unit * 10,
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


})

let post = List();

class QnAPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isGet: false
        }
    }

    componentDidMount() {
        console.log("componentDidMount")
        axios
            .getQnAPost(this.props.match.params.id)
            .then(res => {
                if(res.data.result){
                    post = fromJS(res.data.result);
                    if( this.state.isGet===false){
                        this.setState({
                            isGet: true
                        })
                    }
                }
            })
    }

    render(){
        const { classes, match } = this.props
        if (this.state.isGet){
            const { user_id, title, date, contents, isAnswered } = post.toJS()[0];
            return (
                this.state.isGet &&
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
                                {user_id}
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
                            className={classes.grid}
                            item
                            xs={12}
                        >
                            {contents}
                        </Grid>
                    </Grid>
                </Paper>
            );
        }else
        return (
            <Paper>

            </Paper>
        );
    }
}

QnAPost.propTypes = {
    classes:PropTypes.object.isRequired
}
export default (withStyles(styles))(QnAPost);