//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


//component
import NoticeCard from 'components/class/board/mainboard-contents/notice-card/notice-cardpost';
import WorkCard from 'components/class/board/mainboard-contents/work-card/work-cardpost';
import QnACard from 'components/class/board/mainboard-contents/qna-card/qna-cardpost';

const styles = theme => ({
    root:{
        padding: theme.spacing.unit * 2,
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

const noticePosts = [
    'notice1'
]

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
            spacing: '16'
        }
    }
    
    render() { 
        const { classes } = this.props;
        
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
                            {noticePosts.map(post => (
                                <NoticeCard>
                                    {post}
                                </NoticeCard>
                            ))}
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
                                    <WorkCard>
                                        {post}
                                    </WorkCard>
                                ))}
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
                                    <QnACard>
                                        {post}
                                    </QnACard>
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
export default withStyles(styles)(MainBoard);