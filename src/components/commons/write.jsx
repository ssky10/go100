//node_modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, Grid, Avatar, Typography, Button, Divider, TextField } from '@material-ui/core';

//stylesheet
import './write.css'
import { CalendarToday } from '@material-ui/icons';

const styles = theme => ({
    layout:{
        
    },
    header:{
        backgroundColor: '#f0f0f0',
        
    },
    avatar:{
        margin: theme.spacing.unit * 2
    },
    contents:{

    },
    defaultbox:{
        paddingTop: theme.spacing.unit * 3 ,
        paddingRight: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 3,
        paddingLeft: theme.spacing.unit * 4,
    },
    writablebox:{
        paddingTop: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 3,
        paddingLeft: theme.spacing.unit * 3,
        height: '200px',
        overflow: 'hidden'
    },

    text:{        
        color: `${theme.palette.grey[600]}`,
        userSelect: 'none'
    },
    inputbox:{
        width: '100%',
        height: '100%'
    },
    footer:{
        marginBottom: theme.spacing.unit * 2
    },
    footerdivider:{
        marginBottom: theme.spacing.unit * 2
    },
    checkbox:{
        position: "absolute",
        visibility: "hidden",
        zIndex: -1111,
    },
    calendar:{
        paddingTop: theme.spacing.unit * 1,
        paddingLeft: theme.spacing.unit * 2,
    },
})

class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }

    handleChange = (e) => {
        console.log(e.target.id);
        if(!(e.target.id))
            this.setState({checked: !this.state.checked})
    };

    render() { 
        const { classes, isCard, title, contents, handleChange, handleSubmit } = this.props;
        const { deadline } = (isCard==="Homework") ? this.props : '';

        console.log(deadline);

        const cardTitle =
        (isCard==="Notice") ? "Click for writing something that sharing in your class...." : 
        (isCard==="Homework") ? "Click for writing homework that sharing in your class...." : 
        "Click for writing answer"

        const placeholder =
        (isCard==="Notice") ? "Writing something that sharing in your class...." :
        (isCard==="Homework") ? "Writing homework that sharing in your class...." : "Writing answer for Question...."
        

        const DefalutCard = () => {
            return (
                <Typography
                    className={classes.text}
                    variant="subtitle2"
                    onClick={this.handleChange}
                >   
                    {cardTitle}
                </Typography>
            )
        }
        
        const btnClose = () => {
            return(
                <Button
                    className="buttons"
                    variant="contained"
                    onClick={this.handleChange}
                >
                    Cancle
                </Button>
            )
        }
        
        const btnSubmit = () => {
            return(
                <Button
                    className="buttons"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Post
                </Button>
            )
        }

        const cardWrite = () => {
            const { handleChange } = this.props
            return(
                <Grid
                    className={classes.footer}
                    container
                    item
                    spacing={0}
                    xs={12}
                >
                    <Grid
                        className={classes.footerdivider}
                        item
                        xs={12}    
                    >
                        <Divider/>
                    </Grid>
                    {(isCard==="Homework") ? <Grid
                        className={classes.calendar}
                        item
                        xs={6}
                    >
                         <TextField
                            id="datetime-local"
                            name="deadline"
                            label="DeadLine"
                            type="datetime-local"
                            value={deadline}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(e)=>handleChange}
                        />
                    </Grid> : <Grid
                    item
                    xs={6} />                    
                    }

                    <Grid
                        item
                        xs={6}
                    >
                        {btnSubmit()}
                        {btnClose()}
                    </Grid>
                </Grid>
            )
        }

        return (
            <form
                onSubmit={handleSubmit}
                name="post"
                autoComplete="off"
            >
                <Card
                >
                    <Grid
                        className={classes.layout}
                        container
                        spacing={0}
                    >
                        <Grid
                            className={classes.header}
                            container
                            item
                            xs={12}
                        >
                            <Grid
                                item
                                xs={false}
                            >
                                <Avatar
                                    className={classes.avatar}
                                >
                                    T
                                </Avatar>
                            </Grid>
                            <Grid
                                className={(!(this.state.checked)&&(!(isCard==="Answer")))? classes.defaultbox : classes.posttitle}
                                item
                                xs={10}
                            >
                            {(!(this.state.checked)) ? 
                                <DefalutCard/> :
                                (!(isCard==="Answer")) ? 
                                <TextField
                                    id="title-textarea"
                                    name="posttitle"
                                    className={classes.inputbox}
                                    value={title}
                                    onChange={handleChange}
                                    rows="1"
                                    rowsMax="1"
                                    margin="none"
                                    variant="outlined"
                                    placeholder="Writing Table"
                                />:null
                            }
                            </Grid>
                        </Grid>
                        {this.state.checked &&
                            <Grid
                                className={classes.contents}
                                container
                                item
                                xs={12}
                            >
                                <Grid
                                    className={classes.writablebox}
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        id="contents-textarea"
                                        name="textfield"
                                        className={classes.inputbox}
                                        value={contents}
                                        onChange={handleChange}
                                        multiline
                                        rows="6"
                                        rowsMax="6"
                                        margin="none"
                                        variant="outlined"
                                        placeholder={placeholder}
                                    />
                                </Grid>  
                            </Grid>
                        }
                        
                        {this.state.checked ?
                            cardWrite()
                            :
                            <Grid
                                item
                                xs={false}
                            />
                        }
                    </Grid>
                </Card>
            </form>
        );
    }
}

                            

Write.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Write);