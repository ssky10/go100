//node_module
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    layout:{
        width:"auto",
        flexGrow: 1,
        backgroundColor: `${theme.palette.grey[200]}`,
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        overflow: 'hidden'
    },
    title:{
        textAlign: "left"
    }
});

class WorkCardPost extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, posts } = this.props;

        const PostItems = ({ title, subject, date }) => {
            return(
                <Grid
                    container
                    spacing={24}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.title}
                            variant="h6"
                        >
                            {subject}
                        </Typography>
                        <Typography
                            className={classes.title}
                            variant="subtitle2"
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                    >
                        <Typography
                            variant="subtitle1"
                        >
                            Date
                        </Typography>
                    </Grid> 
                    <Grid
                        item
                        xs={8}
                    >
                        <Typography
                            variant="overline"
                        >
                            ~{date}
                        </Typography>
                    </Grid>             
                </Grid>
            )
        }
        
        const PostList = posts.map(
            (post) => {
                const { idx, title, subject, date} = post.toJS();
                console.log("noticePostsList실행");
                console.log("idx : "+idx+", title : "+title+", subject : "+subject+", date : "+date);
                return (
                    <PostItems 
                        key={idx}
                        title={title}
                        subject={subject}
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
 

WorkCardPost.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(WorkCardPost);