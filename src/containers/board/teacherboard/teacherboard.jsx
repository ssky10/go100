//node_modules
import React, { Component } from 'react';
import { fromJS, List } from 'immutable';
import PropTypes from "prop-types";
import { withStyles, Paper, Typography, Divider, SvgIcon, TextField, Button } from "@material-ui/core";

import {
    ClassroomAbout,
    SearchedStudentList,
    StudentTable
} from 'components/class/board-contents/teacherboard';

import { Clear } from "@material-ui/icons"

import * as axios from "services/classroom";
import * as auth from "services/users"

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
        transform: "translateX(-50%)"
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
        backgroundColor: "#DBDBDB"
    },
    btnregister:{
        position:"relative",
        left: "50%",
        transform: "translateX(-50%)",
        margin:theme.spacing.unit,
        marginTop:theme.spacing.unit * 4,
        backgroundColor: "#4CAF50",
        color: "#FFFFFF"
    },
    body:{
        padding: theme.spacing.unit * 2
    },
    studenttable:{
        minWidth: "452px"
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
    btndelete:{
        cursor: "pointer"
    },
    classconfig:{
        marginLeft: theme.spacing.unit * 2,
        '&> div + div': {
            marginTop: theme.spacing.unit * 1
        }
    },
    btnclassdelete:{
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
            password: '',
            studentList: List(),
            BeforeApplyStudentList: List(),
            open: false,
            isAbout: '',
            isDelete: true,
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        
        console.log(name);
        if(name==='student_id'){
            auth
                .findStudent(this.props.token, value)
                .then(res => {
                    if(res.data.list){
                        this.setState({
                            BeforeApplyStudentList: fromJS(res.data.list)
                        })
                    }
                })
        }
        this.setState({
            [name]: value
        })
    }

    handleAboutOpen = (e) => {
        console.log(e);
        this.setState({
            open: !this.state.open,
            isAbout: "About"
        })
    }

    handleStudentOpen = (e) => {
        this.setState({
            open: !this.state.open,
            isAbout: "Student"
        })
    }

    handleRegisterOpen = () => {
        this.setState({
            open: !this.state.open,
            isAbout: "Register"
        })
    }
    handleClose = (e) => {
        this.setState({
            open: !this.state.open,
            student_id: '',
            isAbout: ''
        })
    }

    handleApplyStudent = (class_id, user_id, user_token) => {
        if(window.confirm(user_id+"학생을 등록하시겠습니까?")){
            axios
                .applyStudent(class_id, user_id, user_token)
                .then(res => {
                    if(res.data.status){
                        axios
                            .getStudentList(class_id, user_token)
                            .then(r => {
                                if(r.data){
                                    console.log("추가 후 리스트 갱신");
                                    this.setState({
                                        studentList: fromJS(r.data.list)
                                    })
                                }
                            })
                    }
                })
        }
        else
            return null;
    }

    handleDeleteStudent = (class_id, user_id, user_token) => {
        if(window.confirm(user_id+"학생을 삭제하시겠습니까?")){
            axios
                .deleteStudent(class_id, user_id, user_token)
                .then(res => {
                    if(res.data.status){
                        axios
                            .getStudentList(class_id, user_token)
                            .then(r => {
                                if(r.data){
                                    console.log("삭제 후 리스트 갱신");
                                    this.setState({
                                        studentList: fromJS(r.data.list)
                                    })
                                }
                            })
                    }
                })
        }
        else
            return null;
    }

    handleDeleteClass = (token, classIdx) => {
        if(window.confirm("학급 삭제를 정말로 하시겠습니까?")){
            axios.deleteClass(token, classIdx)
        }
    }

    componentDidMount(){
        const { classIdx, token } = this.props;
        axios
            .getStudentList(classIdx, token)
            .then(res=>{
                if(res.data){
                    this.setState({
                        studentList: fromJS(res.data.list)
                    })
                }
            })
    }

    shouldComponentUpdate(nextProps, nextState){
        const vitalPropsChange = this.props !== nextProps;
        const vitalStateChange = this.state !== nextState;    
        return vitalPropsChange || vitalStateChange;
    }

    btnCommit = (isAbout) => {
        const {classes} = this.props;
        console.log("isAbout:"+isAbout);
        return (
            <Button
                className={(isAbout==="About") ? `${classes.btnmodal} ${classes.btncreate}`: classes.btnregister }
                size="large"
                onClick={()=>this.handleClose}
            >
                commit
            </Button>
        )
    }

    render() { 
        const { classes, token, classIdx } = this.props;
        const { about, student_id, studentList, open, isAbout } = this.state;

        console.log(studentList);
        return (
            <div
                className={classes.root}
            >
                { open ?
                    <div
                        className={classes.modalbackground}
                    >
                        <Paper
                            className={(isAbout==="About") ? classes.aboutmodal : classes.studentmodal}
                        >
                            <div
                                className={classes.modalheader}
                            >
                                <Typography
                                    variant="h5"
                                    component="h5"
                                    className={(isAbout==="About") ? null : classes.studentmodalheader}
                                >
                                    { (isAbout==="About") ? "학원 소개글" : (isAbout==="Student") ? "학생 추가" : "학생 가입" }
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
                            {(!(isAbout==="Register"))? 
                            <TextField
                                name={(isAbout==="About") ? "about" : "student_id"}
                                variant="outlined"
                                className={classes.modalinput}
                                value={(isAbout==="About") ? about : student_id}
                                placeholder={( isAbout==="About" ) ? null : "학생 아이디"}
                                fullWidth
                                onChange={this.handleChange}
                            /> : 
                            <div>
                                <TextField
                                    name={"student_id"}
                                    variant="outlined"
                                    className={classes.modalinput}
                                    value={(isAbout==="About") ? about : student_id}
                                    placeholder={( isAbout==="About" ) ? null : "학생 아이디"}
                                    fullWidth
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    name={"password"}
                                    variant="outlined"
                                    type="password"
                                    className={classes.modalinput}
                                    value={this.state.password}
                                    placeholder={"Password"}
                                    fullWidth
                                    onChange={this.handleChange}
                                />
                            </div> }
                            <Divider 
                            variant="fullWidth"/>
                            {(isAbout==="Student") ? <SearchedStudentList
                                classIdx={classIdx}
                                token={token}
                                studentList={this.state.BeforeApplyStudentList}
                                handleApplyStudent={this.handleApplyStudent}
                            /> : null}
                            {(isAbout==="About") ? this.btnCommit(isAbout) : (isAbout==="Register") ? this.btnCommit(isAbout) : null}
                        </Paper>
                    </div>
                :
                null}
                <Paper
                    className={classes.body}
                    square
                >
                    <ClassroomAbout
                        classes={this.props.classes}
                        handleAboutOpen={this.handleAboutOpen}
                        about={about}
                    />
                    <div
                        className={classes.bottomcontent}
                    >
                        <StudentTable
                            classes={this.props.classes}
                            studentList={studentList}
                            classIdx={classIdx}
                            token={token}
                            handleStudentOpen={this.handleStudentOpen}
                            handleDeleteStudent={
                                this.handleDeleteStudent
                            }
                        />
                        <div
                            className={classes.classconfig}
                        >
                            <div>
                                <Button
                                    size="large"
                                    style={{backgroundColor:"#75A7E8",
                                    color: "#FFFFFF"
                                    }}
                                    onClick={()=>this.handleRegisterOpen()}
                                >원생 등록
                                </Button>
                            </div>
                            <div>
                                <Button
                                    size="large"
                                    style={{backgroundColor:"#DBDBDB"}}
                                >학급 수정</Button>
                            </div>
                            <div>
                                <Button
                                    size="large"
                                    className={classes.btnclassdelete}
                                    onClick={()=>this.handleDeleteClass(token, classIdx)}
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