//node_modules
import React, { Component } from 'react';
import { fromJS, List } from 'immutable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles, Grid, Paper, Typography, Divider } from '@material-ui/core';

//service
import { getNoticePostList, getWorkPostList, getQnAPostList } from "store/modules/post";

//component
import NoticeCard from 'components/class/board-contents/mainboard/mainboard-contents/notice-card/notice-cardpost';
import WorkCard from 'components/class/board-contents/mainboard/mainboard-contents/work-card/work-cardpost';
import QnACard from 'components/class/board-contents/mainboard/mainboard-contents/qna-card/qna-cardpost';

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 5,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 2,
        flexGrow: 1
    },
    noticepaper:{
        padding: theme.spacing.unit * 1,
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 10,
        textAlign: "center",
        height: "380px",
    },
    secondrow:{
        marginTop: theme.spacing.unit / 2 * 3,
        marginRight: theme.spacing.unit / 2 * 17,
    },
    paper: {
        padding: theme.spacing.unit * 1,
        textAlign: "center"
    },
    posts:{
        height: "26vh",
        overflow: "auto"
    },
    noticeposts:{
        height: "315px",
        overflow: "auto"
    },
    title: {
        margin: theme.spacing.unit,
    },
    divider: {
    }
})

class MainBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticePosts: List(),
            workPosts: List(),
            qnaPosts: List()
        }
    }

    componentDidMount(){
        const { getNoticePostList, getWorkPostList, getQnAPostList, token, classIdx, boardIdx } = this.props;
        
        console.log("mainboard: "+token);

        getNoticePostList(token, classIdx, boardIdx);
        getWorkPostList(token, classIdx, boardIdx);
        getQnAPostList(token, classIdx);
    }

    componentWillReceiveProps(nextProps){
        const { noticePostList:oldNoticePostList, workPostList:oldWorkPostList,qnaPostList:oldQnaPostList } = this.props;

        const { noticePostList:newNoticePostList, workPostList:newWorkPostList,qnaPostList:newQnaPostList } = nextProps;

        if( oldNoticePostList!==newNoticePostList ){
            newNoticePostList.then(res => {
                if( res.data.list ){
                    this.setState({
                        noticePosts: fromJS(res.data.list)
                    })
                }
            })
        }

        if( oldWorkPostList !== newWorkPostList ){
            newWorkPostList.then(res => {
                if (res.data.list) {
                    this.setState({
                            workPosts: fromJS(res.data.list)
                    })
                }
            })
        }

        if( oldQnaPostList !== newQnaPostList ){
            newQnaPostList.then(res => {
                if (res.data.list) {
                    this.setState(
                        {
                            qnaPosts: fromJS(res.data.list)
                        }
                    ) 
                }
            })
        }
    }

    render() {
        const { classes, classIdx } = this.props;

        const noticePosts = this.state.noticePosts
        const workPosts = this.state.workPosts;
        const qnaPosts = this.state.qnaPosts;

        return (
            <div
                className={classes.root}
             >
                <Grid
                    container
                    spacing={0}
                >
                    <Grid
                        className={classes.firstrow}
                        item
                        xs={12}
                    >
                        <Paper
                            className={classes.noticepaper}
                            elevation={1}
                            square={true}
                        >
                            <Typography
                                component="h3"
                                variant="h6"
                                gutterBottom
                                className={classes.title}
                            >
                                Recent Notice
                            </Typography>
                            <Divider
                                className={classes.divider}
                            />
                            <div
                                className={classes.noticeposts}
                            >
                                {<NoticeCard posts={noticePosts}/>}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid
                        className={classes.secondrow}
                        container
                        item
                        spacing={24}
                        xs={12}
                    >
                        <Grid
                            item
                            xs={2}
                        >
                            <Paper
                                className={classes.paper}
                                elevation={1}
                                square={true}
                            >
                                <Typography
                                    component="h3"
                                    variant="h6"
                                    gutterBottom
                                    className={classes.title}
                                >
                                    Recent Work
                                </Typography>
                                <Divider
                                    className={classes.divider}
                                />
                                <div
                                    className={classes.posts}
                                >
                                    {<WorkCard posts={workPosts}/>}
                                </div>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            xs={10}
                        >
                            <Paper
                                className={classes.paper}
                                elevation={1}
                                square={true}
                            >
                                <Typography
                                    component="h3"
                                    variant="h6"
                                    gutterBottom
                                    className={classes.title}
                                >
                                    Q&A
                                </Typography>
                                <Divider
                                    className={classes.divider}
                                />
                                <div
                                    className={classes.posts}
                                >
                                    <QnACard 
                                    posts={qnaPosts}
                                    classIdx={classIdx}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

MainBoard.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = ({ post }) => ({
    // **** .get 을 사용해서 값 조회
    noticePostList: post.get("noticePostList"),
    workPostList: post.get("workPostList"),
    qnaPostList: post.get("qnaPostList")
});

  // props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
    getNoticePostList: (token, classIdx, boardIdx) => dispatch(getNoticePostList(token, classIdx, boardIdx)),
    getWorkPostList: (token, classIdx, boardIdx) => dispatch(getWorkPostList(token, classIdx, boardIdx)),
    getQnAPostList: (token, classIdx) => dispatch(getQnAPostList(token, classIdx))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MainBoard));