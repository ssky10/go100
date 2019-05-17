//node_module
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    layout:{
        flexGrow: 1,
        backgroundColor: `${theme.palette.grey[200]}`,
        width: 'auto',
        height: `auto`,
        border: `3px solid ${theme.palette.common.black}`,
        borderRadius: `8px`,
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        overflow: 'hidden'
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
            )
        }
        
        const PostList = posts.map(
            (post) => {
                const { idx, title, contents, date} = post.toJS();
                console.log("noticePostsList실행");
                console.log("idx : "+idx+", title : "+title+", contents : "+contents+", date : "+date);
                return (
                    <PostItems 
                        key={idx}
                        title={title}
                        contents={contents}
                        date={date}
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