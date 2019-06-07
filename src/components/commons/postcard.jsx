import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from  '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Grid, Avatar, Divider, List, ListItem, ListItemText } from '@material-ui/core';

import * as axios from 'services/post';

const styles = theme => ({
    layout:{
        marginBottom: theme.spacing.unit * 2,
        width: "auto"
    },
    fisrtrow:{
        margin: theme.spacing.unit * 1,
        padding: 0
    },
    avatar:{
        height: 60,
        width: 60        
    },
    title:{
        cursor:"pointer",
        textDecoration: 'none'
    },
    list: {
        padding: 0
    },
    listitem:{
        padding: 0
    },
    contents:{
        padding: theme.spacing.unit * 1,
        height: `200px`
    },
    due:{
        textAlign:'right'
    }
})

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            openIndex: undefined,
            contents: '',
        }
    }

    handleOpen = (idx) => {
        const {classIdx, token} = this.props;
        const {posts} = this.props;
        console.log(posts.size)
        this.setState({
            isOpen: !this.state.isOpen,
            openIndex: idx
        })
        axios.getNoticePost( token, classIdx, idx)
        .then(res => {
            console.log(res)
            if(res){
                this.setState({
                    contents: res.data.content
                })
            }
        })
    }

    render() {        
        const { classes, posts } = this.props;
        
        const PostItems=({title, idx, user, date, deadline, contents}) => {
            const {classes, isNotice, isAnswer} = this.props;
            
            return (
                <Card
                    className={classes.layout}
                >
                    <Grid
                        container
                        spacing={0}
                    >
                        <Grid
                            className={classes.fisrtrow}
                            container
                            item
                            xs={12}
                        >
                            <Grid
                                item
                                xs={false}
                            >
                                <Avatar
                                    className={classes.avatar}
                                >
                                T
                                </Avatar>
                            </Grid>
                            <Grid
                                className={classes.writer}
                                item
                                xs = {2}
                            >
                                {isNotice ?
                                <ListItem>
                                    <ListItemText
                                        className={classes.listitem} 
                                        primary={user} 
                                        secondary={date}
                                    />
                                </ListItem>
                                :null}         
                            </Grid>
                            <Grid
                                item
                                xs = {7}
                            >
                                <Typography
                                    variant="subtitle1"
                                    className={classes.title}
                                    onClick={()=>this.handleOpen(idx)}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                            {(!isNotice&&!isAnswer)?
                            <Grid
                                className={classes.due}
                                container
                                item
                                xs = {2}
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Typography
                                        variant="overline"
                                    >
                                        Due
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Typography
                                        variant="overline"
                                    >
                                        ~{deadline}
                                    </Typography>
                                </Grid>
                            </Grid>
                            : null}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Divider
                                variant='fullWidth'
                            />
                        </Grid>
                        {(!isNotice) ? <Grid
                            className={classes.contents}
                            item
                            xs={12}
                            zeroMinWidth
                        >
                            <Typography >
                                {contents}
                            </Typography>
                        </Grid> : (idx===this.state.openIndex&&this.state.isOpen) ?
                        <Grid
                            className={classes.contents}
                            item
                            xs={12}
                            zeroMinWidth
                        >
                            <Typography >
                                {this.state.contents}
                            </Typography>
                        </Grid>:null}
                        
                    </Grid>
                </Card>
            )
        }

        const PostList = (posts) ? posts.map((post, index)=>{
            const { isNotice, isAnswer } = this.props;
            if(isNotice){
                const { noticeid, user, title, date, contents } = post.toJS();
                return (
                    <PostItems
                        key={index}
                        idx={noticeid}
                        title={title}
                        user={user}
                        date={date}
                        contents={contents}
                    />
                )
            }else if(!isAnswer){
                const { title, DeadLine, content  } = post.toJS();
                return (
                    <PostItems
                        key={index}
                        title={title}
                        deadline={DeadLine}
                        contents={content}
                    />
                )
            }else{
                const {user_id, contents} = post;
                return (
                    <PostItems
                        key={index}
                        title={user_id}
                        contents={contents}
                    />
                )
            }
        }) : console.log(posts);

        return (
            <div
                className={classes.layout}
            >
                {PostList}
            </div>
        );
    }
}
 
export default withStyles(styles)(PostCard);
