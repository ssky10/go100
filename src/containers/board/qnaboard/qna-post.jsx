//node_modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS, List } from 'immutable';
import { withStyles, Paper, Grid} from '@material-ui/core';

//services
import { useAuth } from 'context/loginProvider'
import * as axios from 'services/post'

//components
import PostItem from 'components/class/board-contents/qnaboard/qna-post'
import Write from 'components/commons/write'

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
            qpost: List()
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
                qpost: fromJS(res.data)
                })
            }
        })
    }

    render(){
        const { classes, match } = this.props
        const qpost = this.state.qpost;

        console.log("After toJS");   

        if(qpost){
            const { title, writer_id, date,  isAnswered, is_teacher, q_contents} = qpost.toJS();
            return (
                <div>
                    <Grid
                        container
                        spacing={0}
                    >
                        <Grid
                            container
                            item
                            xs={12}
                        >
                            <Grid
                                item
                                xs={2}
                            />
                            <Grid
                                item
                                xs={8}
                            >
                                <PostItem
                                    classes={this.props.classes}
                                    title={title}
                                    isAnswered={isAnswered}
                                    writer_id={writer_id}
                                    date={date}
                                    q_contents={q_contents}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                            />
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                        >
                            <Grid
                                item
                                xs={2}
                            />
                            <Grid
                                item
                                xs={8}
                            >
                                <Write
                                    isCard={"Answer"}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                            />
                        </Grid>
                    </Grid>
                </div>
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