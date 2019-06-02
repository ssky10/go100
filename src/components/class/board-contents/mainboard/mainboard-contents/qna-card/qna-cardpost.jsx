//node_module
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

//icons
import { QuestionAnswer } from '@material-ui/icons'

const styles = theme => ({
    layout:{
        width:"auto",
        flexGrow: 1,
        margin: theme.spacing.unit,
        overflow: 'hidden'
    },
    link:{
        textDecoration: 'none'  
    },
    container:{
        paddingTop:theme.spacing.unit * 2,
        paddingBottom:theme.spacing.unit * 1
    },
    title:{
        textAlign: "left"
    },
});

class QnaCardPost extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const { classes, posts, classIdx } = this.props;
        const PostItems = ({idx, isAnswered, title, date}) => {
            return(
                <Grid
                    className={classes.container}
                    container
                    spacing={24}
                >
                    <Grid
                        item
                        xs={1}  
                    >
                        <Typography>
                            {idx}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={1}
                    >                    
                        {(isAnswered ==='1')&& 
                            <QuestionAnswer/>
                        }
                    </Grid>
                    <Grid
                        item
                        xs={8}
                    >
                        <Typography
                            variant="subtitle1"
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                    >
                        <Typography
                        >
                            {date}
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
        
        const PostList = posts.map(
            (post) => {
                const { post_id, user_id, isAnswered, title, reg_date} = post.toJS();
                return (
                    <Link
                        key={post_id}
                        className={classes.link}
                        to={`${classIdx}/qna/post/${post_id}`}
                    >
                        <PostItems
                            idx={post_id}
                            user_id={user_id}
                            isAnswered={isAnswered}
                            title={title}
                            date={reg_date}
                        />
                        <Divider/>
                    </Link>
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