import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Input, Button, SvgIcon } from '@material-ui/core';

import QnAEditor from "components/class/board-contents/qnaboard/qna-write";

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 5,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 10,
        flexGrow: 1
    },
    boardheader:{
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
    },
    header:{
        display: "flex"
    },
    typotitle:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        color: "#FFFFFF",
        fontSize: "1.25rem"
    },
    paperinput:{
        width: "100%"
    },
    editor:{
        display: 'flex',
        marginTop: theme.spacing.unit * 1,
    },
    editorbuttons:{
        width:"269px",//
        display: "flex",
        '& + &':{
            marginLeft: theme.spacing.unit * 2,
            width: "288px"
        }
    },
    button:{
        margin: theme.spacing.unit / 2
    },
    fontsizepicker:{
        margin: theme.spacing.unit / 2,
        display: "flex"
    },
    contents:{
        marginTop: theme.spacing.unit * 2,
        width: "100%"
    },
    papercontents:{
        marginTop: theme.spacing.unit * 1,
        paddingRight: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit / 2,
        paddingLeft: theme.spacing.unit / 2,
    },
    inputcontents:{
        height: "435px"
    },
    footer:{
        marginTop: theme.spacing.unit * 2,
    },
    csbuttons:{
        float: "right",
        '& + &':{
            marginRight: theme.spacing.unit * 2
        }
    }
})

class QnAWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
        }
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    excuteEditButton = (e, exc) => {
        const found = document.getElementById('contents')

        if( found && e.target.id === "fontSize" ){
            document.execCommand(exc, false, e.target.value);
        }

        if(found){
            document.execCommand(exc, false, "");
        }
    };

    
    render() { 
        const { classes } = this.props;
        return (
            <div
                className={classes.root}
            >
                <Paper
                    className={classes.boardheader}
                >
                    <Typography
                        variant="h5"
                        component="h5"
                    >
                        글쓰기
                    </Typography>
                </Paper>
                <QnAEditor
                    classes={this.props.classes}
                    handleInputChange={this.handleInputChange}
                    excuteEditButton={this.excuteEditButton}
                />
            </div>
        );
    }
}

QnAWrite.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QnAWrite);