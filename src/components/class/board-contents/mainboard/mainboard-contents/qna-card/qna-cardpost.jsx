//node_module
import React from 'react';
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

const QnaCardPost = (props) => {
    const { classes } = props;

    return ( 
        <div className={classes.layout}>
            <Grid
                container
                spacing={24}
            >
                <Grid
                    item
                    xs={1}                    
                >
                    <Typography                    >
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
            <Divider/>
        </div>
    );
}

QnaCardPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QnaCardPost);