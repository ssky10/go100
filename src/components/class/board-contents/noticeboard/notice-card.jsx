import React, { Component } from 'react';
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
    }
})

class NoticeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const { classes, posts } = this.props;

        console.log(posts);

        const PostItems=({user, title, date, contents}) => {
            const {classes} = this.props;
            console.log(user, title, date, contents);
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
                                item
                                xs = {2}
                            >
                                <List
                                    className={classes.list}
                                >
                                    <ListItem>
                                        <ListItemText
                                            className={classes.listitem} 
                                            primary={user} 
                                            secondary={date}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid
                                item
                                xs = {9}
                            >
                                {title}
                            </Grid>
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
 
export default withStyles(styles)(NoticeCard);