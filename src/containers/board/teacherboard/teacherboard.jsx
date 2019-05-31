//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles, Grid, Paper, Typography, Divier, SvgIcon, TextField } from "@material-ui/core";

import { Create, Clear } from "@material-ui/icons"

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 10,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 10,
        flexGrow: 1
    },
    modalbackground:{
        position: "absolute",
        top:"0px",
        left:"0px",
        width:"100%",
        height:"100%",
        padding: "0px",
        margin: "0px",
        zIndex: 9999,
        backgroundColor:"#00000077"
    },
    modal:{
        position:"relative",
        top:"110px",
        left:"50%",
        width:"700px",
        height:"180px",
        transform: "translateX(-50%)",
        padding: theme.spacing.unit,
    },
    modalheader:{
        display:"flex",
    },
    modalinput:{
        marginTop:theme.spacing.unit,
        marginBottom:theme.spacing.unit
    },
    modalbtn:{
        marginTop:theme.spacing.unit * 4,
        float: "right"
    },
    body:{
        padding: theme.spacing.unit * 2
    },
    aboutheader:{
        display: "flex"
    },
    aboutcontents:{
        margin:theme.spacing.unit * 2,
        padding:theme.spacing.unit * 1
    },
    btncreate:{
        cursor: 'pointer',
    },
    btncancel:{
        float:"right"
    }
})

class TeacherBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: '소개글',
            open: false,
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
            [name]: value
        })
    }

    handleOpen = (e) => {
        this.setState({
            open: !this.state.open
        })
    }

    render() { 
        const { classes } = this.props;
        const about = this.state.about;
        const open = this.state.open;

        console.log(open);
        return (
            <div
                className={classes.root}
            >
                { open ?
                <div
                    className={classes.modalbackground}
                >
                    <Paper
                        className={classes.modal}
                    >
                        <div
                            className={classes.modalheader}
                        >
                            <Typography
                                variant="h5"
                                component="h5"
                            >
                                학급 소개글 적기
                            </Typography>
                            <SvgIcon
                                className={`${classes.btncreate} ${classes.btncancel}`}
                                onClick={this.handleOpen}
                            >
                                <Clear/>
                            </SvgIcon>
                        </div>
                        <TextField
                            name="about"
                            variant="outlined"
                            className={classes.modalinput}
                            placeholder={about}
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <Typography
                            className={`${classes.modalbtn} ${classes.btncreate}`}
                            variant="button"
                            onClick={this.handleOpen}
                        >
                            commit
                        </Typography>
                    </Paper>
                </div>
                :
                null}
                <Paper
                    className={classes.body}
                    square
                >
                    <div>
                        <div
                            className={classes.aboutheader}
                        >
                            <Typography
                                variant="h5"
                                component="h5"
                            >
                                학원 소개글
                            </Typography>
                            <SvgIcon
                                className={classes.btncreate}
                                onClick={
                                    this.handleOpen
                                }
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
                </Paper>
            </div>
        );
    }
}

TeacherBoard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TeacherBoard);