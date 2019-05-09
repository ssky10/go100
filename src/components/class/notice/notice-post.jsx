//node_module
import React from 'react';
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

const NoticePost = (props) => {
    const { classes } = props;
    return (  
        <div className={classes.layout}>
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
                        Date
                    </Typography>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                    <Typography >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Sit amet dictum sit amet justo. Semper eget duis at tellus. Mauris a diam maecenas sed enim ut. Dui faucibus in ornare quam. Tempor nec feugiat nisl pretium fusce id velit. Morbi tristique senectus et netus et malesuada fames. Urna cursus eget nunc scelerisque viverra mauris in aliquam. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Interdum varius sit amet mattis vulputate enim. In ante metus dictum at tempor commodo ullamcorper a lacus. Ac auctor augue mauris augue neque gravida in.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

NoticePost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoticePost);