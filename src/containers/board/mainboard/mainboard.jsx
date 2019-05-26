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
        marginLeft: theme.spacing.unit * 1,
        padding: theme.spacing.unit * 1,
        paddingTop: theme.spacing.unit * 2,
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 1,
        textAlign: "center"
    },
    noticepaper:{
        padding: theme.spacing.unit * 1,
        textAlign: "center",
        height: "380px",
    },
    posts:{
        width: "100%",
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

let noticePosts = List();

let workPosts = List();

let qnaPosts = List();

class MainBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spacing: '16',
            isUpdate: false
        }
    }

    componentDidMount(){
        const { getNoticePostList, getWorkPostList, getQnAPostList, boardIdx } = this.props;

        console.log(boardIdx);

        getNoticePostList(boardIdx);
        getWorkPostList(boardIdx);
        getQnAPostList(boardIdx);

        console.log("componentDidMount 실행")
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate 실행")
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.page !== this.props.gage) {
            this.displayPostList();
            console.log("componentDidUpdate 실행")
        }
    }

    render() {
        const { classes, noticePostList, workPostList,qnaPostList } = this.props;

        if(((typeof noticePostList.size) !== "number") && ((typeof workPostList.size) !== "number")  && ((typeof qnaPostList.size) !== "number"))
        {
            noticePostList.then(res => {
                if (res.data.result) {
                    noticePosts = fromJS(res.data.result)
                }
            })
            workPostList.then(res => {
                if (res.data.result) {
                    workPosts = fromJS(res.data.result)
                }
            })
            qnaPostList.then(res => {
                if (res.data.result) {
                    qnaPosts = fromJS(res.data.result)
                }
                if(this.state.isUpdate === false){
                    this.setState(
                        {
                            isUpdate: true
                        }
                    )
                }
            })
        }

        return (
            <div
                className={classes.root}
             >
                <Grid
                    container
                    spacing={24}
                >
                    <Grid
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
                                variant="title"
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
                                variant="title"
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
                                {<WorkCard posts={workPosts}/>
                                }
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
                                variant="title"
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
                                />
                            </div>
                        </Paper>
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
    getNoticePostList: board => dispatch(getNoticePostList(board)),
    getWorkPostList: board => dispatch(getWorkPostList(board)),
    getQnAPostList: board => dispatch(getQnAPostList(board))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MainBoard));