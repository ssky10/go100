//node_module
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

//icons
import NewIcons from '@material-ui/icons/FiberNew';

const styles = theme => ({
    layout:{
        width:"auto",
        flexGrow: 1,
        margin: theme.spacing.unit,
        overflow: 'hidden'
    },
    container:{
        width: "auto"
    },
    title:{
        textAlign: "left"
    },
});

const isNewPost = true;

class QnaCardPost extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const { classes, posts } = this.props;

        console.log("QnACard:"+posts);
        const PostItems = ({date, contents}) => {
            return(
                <Grid
                    container
                    spacing={24}
                >
                    <Grid
                        item
                        xs={1}  
                    >
                        <Typography>
                            Idx
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={1}
                    >                    
                        {isNewPost && 
                            (<NewIcons/>)
                        }
                    </Grid>
                    <Grid
                        item
                        xs={8}
                    >
                        <Typography
                            variant="h6"
                        >
                            Title
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                    >
                        <Typography
                        >
                            MM-DD
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

QnaCardPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QnaCardPost);