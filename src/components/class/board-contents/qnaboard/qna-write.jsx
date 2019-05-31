import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Input, Button, SvgIcon } from '@material-ui/core';

import { FormatColorText, FormatBold, FormatUnderlined, FormatItalic, FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight } from '@material-ui/icons'

const styles = theme => ({
    root:{
        paddingTop: theme.spacing.unit * 5,
        paddingBottom : theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 10,
        paddingRight: theme.spacing.unit * 10,
        flexGrow: 1
    },
    boardname:{
        marginBottom: theme.spacing.unit * 4
    },
    header:{
        display: "flex"
    },
    papertitle:{
        width:"4%",
        backgroundColor: "#7cb6f3",
    },
    typotitle:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        color: "#FFFFFF",
        fontSize: "1.25rem"
    },
    paperinput:{
        marginLeft: theme.spacing.unit/4*7,
        width:"95%"
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

        const btnsFontList = [
            {name: "bold"},
            {name: "underLine"},
            {name: "italic"}
        ]

        const btnsAlignList =[            
            {name: "justifyLeft"},
            {name: "justifyFull"},
            {name: "justifyCenter"},
            {name: "justifyRight"}
        ]
        const btnIcons =[
            [<FormatBold/>, <FormatUnderlined/>, <FormatItalic/>],
            [<FormatAlignLeft/>,<FormatAlignJustify/>,<FormatAlignCenter/>,<FormatAlignRight/>]
        ]

        const Buttons = ({ theme, name, idx, icons}) => {
            console.log("Buttons Start");
            return(
                <Button
                    className={theme.button}
                    name={`${name}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e)=>this.excuteEditButton(e, `${name}`)}
                >
                    <SvgIcon>{btnIcons[icons][idx]}</SvgIcon>
                </Button>
            )
        }

        const font = btnsFontList.map((btn, index)=>{
            const { classes } = this.props;
            const name = btn.name;
            console.log("fontButton");
            return (
                <Buttons
                    key={index}
                    theme={classes}
                    name={name}
                    idx={index}
                    icons={0}
                />
            )
        })
        const align = btnsAlignList.map((btn, index)=>{
            const { classes } = this.props;
            const name = btn.name;
            console.log("fontButton");
            return (
                <Buttons
                    key={index}
                    theme={classes}
                    name={name}
                    idx={index}
                    icons={1}
                />
            )
        })

        const makeButtons = (type) => {
            console.log(type);
            console.log("makeButtons Start");
            if (type==='font') {return (font)} 
            else if (type === 'align') {return (align)}
        }

        return (
            <div
                className={classes.root}
            >
                <Typography
                    className={classes.boardname}
                    variant="h5"
                    component="h5"
                >
                    글쓰기
                </Typography>
                <form>
                    <div
                        className={classes.header}
                    >
                        <Paper
                            className={classes.papertitle}
                            square
                        >
                            <Typography
                                className={classes.typotitle}
                                variant="subtitle1"
                            >
                                제목
                            </Typography>
                        </Paper>
                        
                        <Paper
                            className={classes.paperinput}
                            square
                        >
                            <Input
                                name="title"
                                placeholder="제목을 입력하세요."
                                fullWidth
                                required
                                disableUnderline
                                onChange={this.handleInputChange}
                            />
                        </Paper>
                    </div>
                    <div
                        className={classes.editor}
                    >
                        <Paper
                            className={classes.editorbuttons}
                            square
                        >
                            <select 
                                className={classes.fontsizepicker}
                                id="fontSize"width="50px"
                                onChange={(e)=>this.excuteEditButton(e, "fontSize")}
                            >
                                <option value="1">4px</option>
                                <option value="2">8px</option>
                                <option value="3">10px</option>
                                <option value="4">12px</option>
                                <option value="5">16px</option>
                                <option value="6">20px</option>
                                <option value="7">30px</option>
                            </select>
                            {makeButtons("font")}
                        </Paper>
                        <Paper
                            className={classes.editorbuttons}
                            square
                        >
                            {makeButtons("align")}
                        </Paper>
                    </div>
                    <Paper
                        className={classes.papercontents}
                        square
                    >
                        <div
                            name="contents"
                            id="contents"
                            className={classes.inputcontents}
                            contentEditable="true"
                            onChange={this.handleInputChange}
                        />
                    </Paper>
                    <div
                        className={classes.footer}
                    >
                        <Button
                            className={classes.csbuttons}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Post
                        </Button>
                        <Button
                            className={classes.csbuttons}
                            variant="contained"
                            onClick={this.handleInputChange}
                        >
                            Cancle
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

QnAWrite.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QnAWrite);