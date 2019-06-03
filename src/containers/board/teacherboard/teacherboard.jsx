//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles, Paper, Typography, Divider, SvgIcon, TextField, Button } from "@material-ui/core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";

import { Create, Clear, PersonAdd } from "@material-ui/icons"

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
    aboutmodal:{
        position:"absolute",
        top:"110px",
        left:"60%",
        width:"700px",
        height:"230px",
        transform: "translateX(-50%)",
        padding: theme.spacing.unit,
    },
    studentmodal:{
        position:"absolute",
        top: "50%",
        left: "60%",
        width: "400px",
        height: "500px",
        transform: "translate(-50%, -50%)",
        padding: theme.spacing.unit,

    },
    modalheader:{
        display:"flex",
        marginTop: theme.spacing.unit * 2
    },
    divider:{
        marginTop: theme.spacing.unit * 2
    },
    studentmodalheader:{
        position: "relative",
        left: "50%",
        transform: "translate(-50%)"
    },
    modalinput:{
        marginTop:theme.spacing.unit * 3,
        marginBottom:theme.spacing.unit
    },
    btnmodal:{
        position:"fixed",
        right:"0px",
        bottom:"0px",
        margin:theme.spacing.unit,
        marginTop:theme.spacing.unit * 4,
    },
    body:{
        padding: theme.spacing.unit * 2
    },
    contentheader:{
        display: "flex",
        '& h5': {
            marginRight: theme.spacing.unit
        }
    },
    aboutcontents:{
        margin:theme.spacing.unit * 2,
        padding:theme.spacing.unit * 1
    },
    btncreate:{
        cursor: 'pointer',
        color: `${theme.palette.grey[600]}`,
    },
    btncancel:{
        marginRight: theme.spacing.unit * 2,
        position: 'fixed',
        right: "0px",
        color: `${theme.palette.grey[600]}`,
    },
    bottomcontent:{
        marginTop:theme.spacing.unit * 8,
        display: "flex"
    },
    studentcontents:{
        margin:theme.spacing.unit * 2,
        padding: theme.spacing.unit * 1
    },
    studenttable:{
        minWidth: 650
    },
    classconfig:{
    },
    btndelete:{
        backgroundColor: "#E81D35",
        color: "#FFFFFF"
    }
})

class TeacherBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: '소개글',
            student_id: '',
            open: false,
            type: '',
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        
        console.log(name);

        this.setState({
            [name]: value
        })
    }

    handleAboutOpen = (e) => {
        console.log(e);
        this.setState({
            open: !this.state.open,
            type: "About"
        })
    }

    handleStudentOpen = (e) => {
        this.setState({
            open: !this.state.open,
            type: "Student"
        })
    }

    handleClose = (e) => {
        this.setState({
            open: !this.state.open,
            type: ''
        })
    }

    render() { 
        const { classes } = this.props;
        const { about, student_id, open, type } = this.state;

        return (
            <div
                className={classes.root}
            >
                { open ?
                    <div
                        className={classes.modalbackground}
                    >
                        <Paper
                            className={(type==='About') ? classes.aboutmodal : classes.studentmodal}
                        >
                            <div
                                className={classes.modalheader}
                            >
                                <Typography
                                    variant="h5"
                                    component="h5"
                                    className={(type==='Student') ? classes.studentmodalheader : null}
                                >
                                    { (type==='About') ? "학원 소개글" : "학생 추가" }
                                </Typography>
                                <SvgIcon
                                    className={`${classes.btncreate} ${classes.btncancel}`}
                                    onClick={this.handleClose}
                                >
                                    <Clear/>
                                </SvgIcon>
                            </div>
                            <Divider
                                className={classes.divider}
                            />
                            <TextField
                                name={(type==='About') ? "about" : "student_id"}
                                variant="outlined"
                                className={classes.modalinput}
                                value={(type==='About') ? about : student_id}
                                placeholder={(type==='About') ? null : "학생 아이디"}
                                fullWidth
                                onChange={this.handleChange}
                            />
                            <Typography
                                className={`${classes.btnmodal} ${classes.btncreate}`}
                                variant="button"
                                onClick={this.handleClose}
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
                                onClick={this.handleAboutOpen}
                            >
                                <Create/>
                            </SvgIcon>
                        </div>
                        <Paper
                            className={classes.aboutcontents}
                            elevation={0}
                            square
                        >
                            {this.state.about}
                        </Paper>
                    </div>
                    <div
                        className={classes.bottomcontent}
                    >
                        <div
                            className={classes.student}
                        >
                            <div
                                className={classes.contentheader}
                            >
                                <Typography
                                    variant="h5"
                                    component="h5"
                                >
                                    학생
                                </Typography>
                                <SvgIcon
                                    className={classes.btncreate}
                                    onClick={this.handleStudentOpen}
                                >
                                    <PersonAdd/>
                                </SvgIcon>
                            </div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>학번</TableCell>
                                        <TableCell align="right">ID</TableCell>
                                        <TableCell align="right">이름</TableCell>
                                        <TableCell align="right">삭제</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </div>
                        <div
                            className={classes.classconfig}
                        >
                            <div>
                                <Button>학급 수정</Button>
                            </div>
                            <div>                                                        
                                <Button
                                    size="large"
                                    className={classes.btndelete}
                                >
                                학급 삭제
                                </Button>
                            </div>
                        </div>
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