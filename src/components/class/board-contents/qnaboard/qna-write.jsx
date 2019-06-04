import React, { Component } from 'react';
import { Paper, Input, Button, SvgIcon } from '@material-ui/core';

import { FormatBold, FormatUnderlined, FormatItalic, FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight } from '@material-ui/icons'

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

class QnAEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return (
            <form>
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
                        onClick={handleInputChange}
                    >
                        Cancle
                    </Button>
                </div>
            </form>
        );
    }
}
 
export default QnAEditor;