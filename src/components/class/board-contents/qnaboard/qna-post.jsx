//node_modules
import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { QuestionAnswer } from '@material-ui/icons';

//services
const PostItem = ({classes, title, isAnswered, writer_id, date, q_contents}) => {
    return (
        <Paper
            className={classes.root}
            elevation={1}
            square={true}
        >
            <Grid
                container
                spacing={0}
            >
                <Grid
                    className={classes.title}
                    item
                    xs={12}
                >
                    <Typography
                        variant="h6"
                    >
                        {title}
                    </Typography>
                </Grid>
                <Grid
                    className={ classes.answericon}
                    item
                    xs={1}
                >
                    {(isAnswered==='1') &&
                    <QuestionAnswer
                        className={classes.contentsicon}
                    />}
                </Grid>
                <Grid
                    className={classes.grid}
                    item
                    xs={8}
                >
                    <Typography
                        variant="body1"
                    >
                        {writer_id}
                    </Typography>
                </Grid>
                <Grid
                    className={classes.grid}
                    item
                    xs={3}
                >
                    <Typography
                        variant="body1"
                    >
                        {date}
                    </Typography>
                </Grid>        
                <Grid
                    className={classes.body}
                    item
                    xs={12}
                >
                    <div
                        dangerouslySetInnerHTML={{__html: q_contents}}
                    > 
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default PostItem;