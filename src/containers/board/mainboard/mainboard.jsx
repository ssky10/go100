//node_modules
import React, { Component } from 'react';
import { fromJS, List } from 'immutable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

//service
import * as service from "services/notice";
import { getPostList } from "store/modules/post";

//component
import NoticeCard from 'components/class/board-contents/mainboard/mainboard-contents/notice-card/notice-cardpost';
import WorkCard from 'components/class/board-contents/mainboard/mainboard-contents/work-card/work-cardpost';
import QnACard from 'components/class/board-contents/mainboard/mainboard-contents/qna-card/qna-cardpost';

const styles = theme => ({
    root:{
        padding: theme.spacing.unit * 1,
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

const boardTitle = [
    '최근 공지',
    '최근 과제',
    '묻고 답하기'
];

let noticePosts = List();

const workPosts = [
    'work1'
]

const qnaPosts = [
    'qna1'
]

class MainBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spacing: '16',
            isUpdate: false
        }
    }

    displayPostList = () => {
        const { getPostList } = this.props;
        getPostList();
    }

    componentDidMount(){
        this.displayPostList();
        console.log("componentDidMount 실행")
        
        {this.forceUpdate()}
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
        const { classes, postList } = this.props;
        if((typeof postList.size) !== "number"){
            postList.then(res => {
                if (res.data.result) {
                    noticePosts = fromJS(res.data.result)
                    if(this.state.isUpdate === false){
                        this.setState(
                            {
                                isUpdate: true
                            }
                        )
                    }                    
                }
            })
        }
        
        console.log(noticePosts);
        
        const noticePostsList = noticePosts.map(
            (post) => {
                const { idx, title, contents, date} = post.toJS();
                console.log("noticePostsList실행");
                return (
                    <NoticeCard 
                        key={idx}
                        title={title}
                        contents={contents}
                        date={date}
                    />
                )
            }
        );

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
                            elevation={0}
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
                                {(noticePostsList)}
                            </div>                     
                        </Paper>
                    </Grid>
                    <Grid 
                        item 
                        xs={2}
                    >
                        <Paper
                            className={classes.paper}
                            elevation={0}
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
                                {workPosts.map(post => (
                                    <WorkCard key={post.toString}/>
                                ))
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
                            elevation={0}
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
                                {qnaPosts.map(post => (
                                    <QnACard key = {post.toString}/>
                                ))}
                            </div> 
                        </Paper>
                    </Grid>
                </Grid>
            </div>            
        );
    }
}
/* <div className={cx("main-board")}>
<div className={cx("recent-notice")}>
    최근 공지
</div>
<div className={cx("recent-work")}>
    최근 과제
</div>
<div className={cx("recent-qna")}>
    최근 물음
</div>
<div className={cx("recent-livequiz")}>
    최근 XX
</div>
</div> */

MainBoard.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = ({ post }) => ({
    // **** .get 을 사용해서 값 조회
    postList: post.get("postList")
});
  
  // props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
    getPostList: board => dispatch(getPostList(board))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MainBoard));