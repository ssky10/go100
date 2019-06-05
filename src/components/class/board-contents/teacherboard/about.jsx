import React from 'react';
import { Paper, Typography,  SvgIcon } from "@material-ui/core";

import { Create } from "@material-ui/icons"

const ClassroomAbout = ({classes, handleAboutOpen, about}) => {
    return ( 
        <div>
            <div
                className={classes.contentheader}
            >
                <Typography
                    variant="h5"
                    component="h5"
                >
                    학원 소개글
                </Typography>
                <SvgIcon
                    className={classes.btncreate}
                    onClick={handleAboutOpen}
                >
                    <Create/>
                </SvgIcon>
            </div>
            <Paper
                className={classes.aboutcontents}
                elevation={0}
                square
            >
                {about}
            </Paper>
        </div>
    );
}
 

export default ClassroomAbout;