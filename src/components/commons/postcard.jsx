import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from  '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Grid, Avatar, Divider, List, ListItem, ListItemText } from '@material-ui/core';

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
    }
    
    render() {        
        const { classes, posts } = this.props;
        
        const PostItems=({title, user, date, deadline, contents}) => {
            const {classes, isNotice} = this.props;
            
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
                                {title}
                            </Grid>
                            {!isNotice?
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
                        
                        <Grid
                            className={classes.contents}
                            item
                            xs={12}
                            zeroMinWidth
                        >
                            <Typography >
                                {contents}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            )
        }

        const PostList = posts.map((post, index)=>{
            const { isNotice } = this.props;
            if(isNotice){
                const { user, title, date, contents } = post.toJS();
                return (
                    <PostItems
                        key={index}
                        title={title}
                        user={user}
                        date={date}
                        contents={contents}
                    />
                )
            }else{
                const { title, DeadLine, content  } = post.toJS();
                return (
                    <PostItems
                        key={index}
                        title={title}
                        deadline={DeadLine}
                        contents={content}
                    />
                )
            }
        })

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
