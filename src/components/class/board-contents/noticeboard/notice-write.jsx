//node_modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, Grid, Avatar, Typography, Button, Divider, TextField } from '@material-ui/core';

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
    buttons:{
        '&':{
            marginLeft: theme.spacing.unit * 4,
        },
        '& + &': {
            marginLeft: theme.spacing.unit * 2,
        }
    },
    checkbox:{
        position: "absolute",
        visibility: "hidden",
        zIndex: -1111,
    },
})

class NoticeWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }
    handleChange = (e) => {
        if(!(e.target.id))
            this.setState({checked: !this.state.checked})
    };

    render() { 
        const { classes, contents, onChange, onSubmit } = this.props;
        
        const DefalutCard = () => {
            return (
                <Typography
                    className={classes.text}
                    variant="subtitle2"
                    onClick={this.handleChange}
                >   
                    Click for writing something that sharing in your class....
                </Typography>
            )
        }

        return (
            <form
                onSubmit={onSubmit}
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
                            {!this.state.checked && <Grid
                                className={classes.defaultbox}
                                item
                                xs={10}
                            >
                                <DefalutCard/>
                            </Grid>}
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
                                        className={classes.inputbox}
                                        value={contents}
                                        onChange={onChange}
                                        multiline
                                        rows="6"
                                        rowsMax="6"
                                        margin="none"
                                        variant="outlined"
                                        placeholder="Writing something that sharing in your class...."
                                    />
                                </Grid>  
                            </Grid>
                        }
                        
                        {this.state.checked ?
                            <Grid
                                className={
                                    classes.footer
                                }
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
                                <Grid
                                    item
                                    xs={10}
                                />
                                <Grid
                                    item
                                    xs={2}
                                >
                                    <Button
                                        className={classes.buttons}
                                        variant="contained"
                                        onClick={this.handleChange}
                                    >
                                        Cancle
                                    </Button>
                                    <Button
                                        className={classes.buttons}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Post
                                    </Button>
                                </Grid>
                            </Grid>                          
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

                            

NoticeWrite.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(NoticeWrite);