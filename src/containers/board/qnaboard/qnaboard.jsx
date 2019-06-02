//node_modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fromJS, List } from 'immutable';
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { withStyles, Paper, Grid, Typography, Divider } from '@material-ui/core';
import { QuestionAnswer, Create } from '@material-ui/icons';

//services
import { getQnAPostList } from "store/modules/post";

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 5,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 10,
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
    },
    listtitletypo:{
        textAlign:"center"
    },
    link:{
        textDecoration: 'none'  
    },
    contents:{
        padding: theme.spacing.unit * 1,
        cursor: 'pointer',
    },
    contentsidx:{
        position: 'relative',        
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        textAlign: 'center',
        userSelect: 'none'
    },
    contentsicon:{
        position: 'relative',        
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
    },
    contentstitle:{
        position: 'relative',        
        top:'50%',
        transform:'translateY(-50%)',
        userSelect: 'none'
    },
    contentsdate:{
        userSelect: 'none'
    }
})

let qnaPosts = List();

class QnABoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false
        }
    }

    componentDidMount(){
        const { getQnAPostList, boardIdx, token, classIdx } = this.props;
        
        getQnAPostList(token, classIdx);
    }

    render() { 
        const { classes, qnaPostList } = this.props;
        
        if(typeof qnaPostList.size !== "number")
        {
            qnaPostList.then(res => {
                if(res.data.result){
                    qnaPosts = fromJS(res.data.result);
                    if( this.state.isUpdate === false ){
                        this.setState(
                            {
                                isUpdate: true
                            }
                        )
                    }
                }
            })
        }
    }
    render() { 
        const { classes, qnaPostList } = this.props;
        const qnaPosts = this.state.qnaPosts;
        const { classIdx } = this.props

        const PostItems = ({idx, isAnswered, title, date}) => {
            return (
                <Grid
                    className={classes.contents}
                    container
                    spacing={0}
                    item
                    xs={12}
                >
                    <Grid
                        item
                        xs={1}
                    >
                        <Typography
                            className={classes.contentsidx}
                            variant="body2"
                        >
                        {idx}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={1}
                    >
                        {(isAnswered==='1') &&
                        <QuestionAnswer
                            className={classes.contentsicon}
                        />}
                    </Grid>
                    <Grid
                        item
                        xs={9}
                    >
                        <Typography
                            className={classes.contentstitle}
                            variant="body2"
                        >
                        {title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={1}
                    >
                        <Typography
                            className={classes.contentsdate}
                            variant="body2"
                        >
                        {date}
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
        const PostList = qnaPosts.map(
            (post) => {
                const { post_id, isAnswered, title, reg_date} = post.toJS();
                console.log("classid2 :"+classIdx);
                return (
                    <Link
                        className={classes.link}
                        key={post_id}
                        to={"qna/post/"+`${post_id}`}
                    >
                        <PostItems
                            idx={post_id}
                            isAnswered={isAnswered}
                            title={title}
                            date={reg_date}
                        />
                        <Divider/>
                    </Link>                    
                )
            }
        )
        console.log("classid1:"+classIdx)
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
                            QnABoard
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                    />
                    <Grid
                        item
                        xs={1}
                    >
                        <Link
                            className={`${classes.linkwrite} ${classes.link}`} 
                            to={`qna/write/`}
                        >
                            <Paper
                                className={classes.writepaper}
                                square
                            >
                                <Create/>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    글쓰기
                                </Typography>
                            </Paper>
                        </Link>
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
                                container
                                spacing={0}
                                item
                                xs={12}
                            >
                                <Grid
                                    item
                                    xs={1}
                                >
                                    <Typography
                                        className={classes.listtitletypo}
                                        variant="subtitle2"
                                    >
                                    No.
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                >
                                    <Typography
                                        className={classes.listtitletypo}
                                        variant="subtitle2"
                                    >
                                    Answer
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={9}
                                >
                                    <Typography
                                        className={classes.listtitletypo}
                                        variant="subtitle2"
                                    >
                                    Title
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                >
                                    <Typography
                                        className={classes.listtitletypo}
                                        variant="subtitle2"
                                    >
                                    Date
                                    </Typography>
                                </Grid>
                            </Grid>
                            {PostList}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

QnABoard.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = ({ post }) => ({
    qnaPostList: post.get("qnaPostList")
});

const mapDispatchToProps = dispatch => ({
    getQnAPostList: board => dispatch(getQnAPostList(board))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(QnABoard));