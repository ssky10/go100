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

const NoticeCardPost = (props) => {
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
                    ㅎㅇ
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

NoticeCardPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoticeCardPost);