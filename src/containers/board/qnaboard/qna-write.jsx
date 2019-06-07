import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import QnAEditor from "components/class/board-contents/qnaboard/qna-write";

import * as axios from "services/post";

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 5,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 10,
        flexGrow: 1
    },
    boardheader:{
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
    },
    footer:{
        marginTop: theme.spacing.unit * 2,
    },
    csbuttons:{
        float: "right",
        '& + &':{
            marginRight: theme.spacing.unit * 2
        }
    }
})

class QnAWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
            myRequestedRefs: '',
        }
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        const { token, classIdx, userid } = this.props
        if(window.confirm("글 작성을 완료하시겠습니까?")){
            axios
                .writeQnAPost(token, classIdx, userid, this.state.title, this.state.contents)
                .then(res=>{
                    return(<Redirect to={`class/${classIdx}/login`} />)
                })
            e.preventDefault();
        }
    }

    excuteEditButton = (e, exc) => {
        const found = document.getElementById('contents')

        if( found && e.target.id === "fontSize" ){
            document.execCommand(exc, false, e.target.value);            
        }

        if(found){
            document.execCommand(exc, false, "");
        }
        
        this.setState({
            contents: document.getElementById('contents').innerHTML
        })
    };

    render() { 
        const { classes } = this.props;
        return (
            <form
                className={classes.root}
                onSubmit={(e)=>this.handleSubmit(e)}
            >
                <Paper
                    className={classes.boardheader}
                >
                    <Typography
                        variant="h5"
                        component="h5"
                    >
                        글쓰기
                    </Typography>
                </Paper>
                <form>
                    <QnAEditor
                        handleInputChange={this.handleInputChange}
                        excuteEditButton={this.excuteEditButton}
                    />
                    <div
                        className={classes.footer}
                    >
                        <Button
                            className={classes.csbuttons}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Post
                        </Button>
                        <Button
                            className={classes.csbuttons}
                            variant="contained"
                        >
                            Cancle
                        </Button>
                    </div>
                </form>
            </form>
        );
    }
}

QnAWrite.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QnAWrite);