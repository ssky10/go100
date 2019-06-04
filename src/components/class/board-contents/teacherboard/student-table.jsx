//node_modules
import React from 'react';
import { Typography, SvgIcon } from "@material-ui/core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";

import { Clear, PersonAdd } from "@material-ui/icons"

const StudentTable = ({ classes, studentList, classIdx, token, handleStudentOpen, handleDeleteStudent}) => {
    return (
        <div>
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
                    onClick={handleStudentOpen}
                >
                    <PersonAdd/>
                </SvgIcon>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>학번</TableCell>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">이름</TableCell>
                        <TableCell align="center">삭제</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((post, index) => {
                        const { user_id, name } = post.toJS();

                        return(
                            <TableRow key={index}>
                                <TableCell align="right">
                                    {index}
                                </TableCell>
                                <TableCell align="right">
                                    {user_id}
                                </TableCell>
                                <TableCell align="right">
                                    {name}
                                </TableCell>
                                <TableCell align="right">
                                    <SvgIcon
                                        onClick={handleDeleteStudent(classIdx, user_id, token)}
                                    >
                                        <Clear/>
                                    </SvgIcon>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
 
export default StudentTable;