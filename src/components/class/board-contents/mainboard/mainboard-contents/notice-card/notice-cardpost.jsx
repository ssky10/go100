//node_module
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

const styles = theme => ({
    layout:{
        flexGrow: 1,
        width: 'auto',
        height: `auto`,
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        overflow: 'hidden'
    },
    card:{
        backgroundColor: `${theme.palette.grey[200]}`,
        marginBottom: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
    grid:{
        padding: theme.spacing.unit,

    },
    avatar:{
        padding: theme.spacing.unit,
    }
});

class NoticeCardPost extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { classes, posts } = this.props;
        const PostItems = ({date, contents}) => {
            return(
                <Card
                    className={classes.card}
                >
                    <Grid
                        container
                        spacing={24}
                    >
                        <Grid item xs={10}>
                            <Avatar
                                className={classes.avatar}
                            >T
                            </Avatar>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography
                                className={classes.typography}
                            >
                                {date}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} zeroMinWidth>
                            <Typography >
                                {contents}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            )
        }
        
        const PostList = posts.map(
            (post) => {
                const { noticeid, username, update_date, title} = post.toJS();
                return (
                    <PostItems 
                        key={noticeid}
                        title={title}
                        contents={title}
                        date={update_date}
                    />
                )
            }
        )
        
        return (
            <div className={classes.layout}>
                {PostList}
            </div>
        );
    }
}


NoticeCardPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoticeCardPost);