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
    username:{
        display:"flex",
        '&> div + div':{
            marginLeft:theme.spacing.unit,
        }
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
        minWidth: 500
    },
    btndelete:{
        cursor: "pointer"
    },
    classconfig:{
        marginLeft: theme.spacing.unit * 5,
        '&> div + div': {
            marginTop: theme.spacing.unit * 3
        }
    },
    boxbtns:{
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius:"5px",
        minWidth: "300px",
        height: "100px",
        padding: theme.spacing.unit,
        '&:first-child':{
            borderColor: "#75A7E8",
        },
        '&:nth-child(2)':{
            borderColor: "#DBDBDB"
        },
        '&:last-child':{
            borderColor: "#E81D35",
        },
    },
    btnconfig:{
        position: "relative",
        width: '230px',
        left:"50%",
        top:"100%",
        transform: 'translate(-50%, 60%)'
    },
    btnregisterstudent:{
        backgroundColor:"#75A7E8",
        color: "#FFFFFF",
        transition: "background-color 0.3s",
        '&:hover':{
            backgroundColor:"#3271C2"
        }
    },
    btnmodifyclass:{
        backgroundColor:"#DBDBDB",
        transition: "background-color 0.3s",
        '&:hover':{
            backgroundColor:"#828181"
        }
    },
    btnclassdelete:{
        backgroundColor: "#E81D35",
        color: "#FFFFFF",
        transition: "background-color 0.3s",
        '&:hover':{
            backgroundColor:"#950011"
        }
    }
})

class TeacherBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: '소개글',
            studentId: '',
            password: '',
            firstname:'',
            lastname:'',
            studentList: List(),
            BeforeApplyStudentList: List(),
            open: false,
            isAbout: this.props.about,
            isDelete: true,
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        
        if(name==='studentId'){
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
    handleCreateUser = (e, token, userId, firstname, lastname, password) => {
        auth.createUser(token, userId, firstname, lastname, password)
        .then(res=>{
            e.preventDefault()
        })
    }
    handleChangeAbout = (token, classIdx, about) => {
        if(window.confirm("학급 소개글을 정말로 수정하시겠습니까?")){
            axios.modifyClassAbout(token, classIdx, about)
        }
    }
    handleDeleteClass = (token, classIdx) => {
        if(window.confirm("학급 삭제를 정말로 하시겠습니까?")){
            axios.deleteClass(token, classIdx)
        }
    }

    componentDidMount(){
        const { classIdx, token } = this.props;
        console.log(this.props.about);
        axios
            .getStudentList(classIdx, token)
            .then(res=>{
                if(res.data){
                    this.setState({
                        studentList: fromJS(res.data.list),
                    })
                }
            })
        axios
            .getClassInfo(token,classIdx)
            .then(res => {
                if(res.data){
                    this.setState({
                        about: res.data.about
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
                type="submit"
            >
                commit
            </Button>
        )
    }

    render() { 
        const { classes, token, classIdx } = this.props;
        const { about, studentId, firstname, lastname, password, studentList, open, isAbout } = this.state;

        console.log(studentList);
        return (
            <div
                className={classes.root}
            >
                { open ?
                    <form
                        onSubmit={(isAbout==="About") ? (e)=>this.handleClose(e) : (e)=>this.handleCreateUser(e, token, studentId, firstname, lastname, password)}
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
                                name={(isAbout==="About") ? "about" : "studentId"}
                                variant="outlined"
                                className={classes.modalinput}
                                value={(isAbout==="About") ? about : studentId}
                                placeholder={( isAbout==="About" ) ? null : "학생 아이디"}
                                fullWidth
                                onChange={this.handleChange}
                            /> : 
                            <div>
                                <TextField
                                    name={"studentId"}
                                    variant="outlined"
                                    className={classes.modalinput}
                                    value={(isAbout==="About") ? about : studentId}
                                    placeholder={( isAbout==="About" ) ? null : "학생 아이디"}
                                    fullWidth
                                    onChange={this.handleChange}
                                />
                                <div
                                    className={classes.username}
                                >
                                    <TextField
                                        name={"firstname"}
                                        variant="outlined"
                                        type="text"
                                        className={classes.modalinput}
                                        value={this.state.firstname}
                                        placeholder={"First name"}
                                        fullWidth
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        name={"lastname"}
                                        variant="outlined"
                                        type="text"
                                        className={classes.modalinput}
                                        value={this.state.lastname}
                                        placeholder={"Last name"}
                                        fullWidth
                                        onChange={this.handleChange}
                                    />
                                </div>
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
                    </form>
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
                            <div
                                className={classes.boxbtns}
                            >
                                <Typography
                                    variant="subtitle2"
                                    component="h6"
                                >
                                    본 서비스를 이용한 이력이 없는 원생의 경우, 먼저 회원 등록을 해주세요.
                                </Typography>
                                <Button
                                    size="large"
                                    className={`${classes.btnconfig} ${classes.btnregisterstudent}`}
                                    onClick={()=>this.handleRegisterOpen()}
                                    style={{
                                    }}
                                >원생 등록
                                </Button>
                            </div>
                            <div
                                className={classes.boxbtns}
                            >
                                <Typography
                                    variant="subtitle2"
                                    component="h6"
                                >
                                    학원 소개글이 수정되었을 경우, 수정사항을 저장해주세요.
                                </Typography>
                                <form
                                    onSubmit={()=>this.handleChangeAbout(token, classIdx, about)}
                                >
                                    <Button
                                        size="large"
                                        type="submit"
                                        className={`${classes.btnconfig} ${classes.btnmodifyclass}`}
                                    >학급 수정</Button>
                                </form>
                            </div>
                            <div
                                className={classes.boxbtns}
                            >
                                <Typography
                                    variant="subtitle2"
                                    component="h6"
                                >
                                    본 서비스 이용을 끝마치고 학급을 삭제하고 싶으시다면 삭제해주세요.
                                </Typography>
                                <Button
                                    size="large"
                                    className={`${classes.btnconfig} ${classes.btnclassdelete}`}
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