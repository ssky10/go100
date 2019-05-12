//node_module
import React from 'react';
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

const WorkCardPost = (props) => {
    const { classes } = props;
    return (
        <div className={classes.layout}>
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
                        Title
                    </Typography>
                    <Typography
                        className={classes.title}
                        variant="subtitle2"
                    >
                        Subtitle
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
                        ~MM.DD
                    </Typography>
                </Grid>             
            </Grid>
        </div>
    );
}

WorkCardPost.propTypes = {
    classes: PropTypes.object.isRequired,
};
WorkCardPost.defaultProps = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(WorkCardPost);