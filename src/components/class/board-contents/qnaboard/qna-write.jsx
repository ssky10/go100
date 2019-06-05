import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Input, Button, SvgIcon } from '@material-ui/core';

import { FormatBold, FormatUnderlined, FormatItalic, FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight } from '@material-ui/icons'

const styles = theme => ({
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
    }
})

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

class QnAEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        const { classes, handleInputChange, excuteEditButton } = this.props;

        const Buttons = ({ theme, name, idx, icons}) => {
            return(
                <Button
                    className={theme.button}
                    name={`${name}`}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e)=>excuteEditButton(e, `${name}`)}
                >
                    <SvgIcon>{btnIcons[icons][idx]}</SvgIcon>
                </Button>
            )
        }
        
        const font = btnsFontList.map((btn, index)=>{
            const { classes } = this.props;
            const name = btn.name;
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
            if (type==='font') {return (font)} 
            else if (type === 'align') {return (align)}
        }
        
        return (
            <div>
                <div
                    className={classes.header}
                >
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
                            onChange={handleInputChange}
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
                            id="fontSize"
                            width="50px"
                            onChange={(e)=>excuteEditButton(e, "fontSize")}
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
                        onChange={handleInputChange}
                    />
                </Paper>                
            </div>
        );
    }
}

QnAEditor.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QnAEditor);