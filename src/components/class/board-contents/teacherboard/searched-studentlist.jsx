//node_modules
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles, Paper, Typography } from '@material-ui/core';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit,
        border: "1px solid #e5e5e5",
        height: "300px",
        overflow: "auto"
    },
    contents: {
        cursor: "pointer"
    }
    
})

class SearchedStudentList extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const { classes, classIdx, token, studentList, handleApplyStudent } = this.props;

        return (
            <Paper
                elevation={0}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>이름</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            studentList.map(
                                (student, index) => {
                                    const {user_id, user_name} = student.toJS();
                                    console.log("학생추가리스트 row 생성")
                                    return (
                                        <TableRow
                                            key={index}
                                            className={classes.contents}
                                            onClick={()=>handleApplyStudent(classIdx, user_id, token)}
                                        >
                                            <TableCell>
                                                {user_id}
                                            </TableCell>
                                            <TableCell>
                                                {user_name}
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            )
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

SearchedStudentList.propsTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(SearchedStudentList);