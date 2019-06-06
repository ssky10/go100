//node_modules
import React, {useState} from 'react';
import { Typography, SvgIcon } from "@material-ui/core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination
} from "@material-ui/core";

import { Clear, PersonAdd } from "@material-ui/icons"

const StudentTable = ({ classes, studentList, classIdx, token, handleStudentOpen, handleDeleteStudent}) => {
    const [page, setPage] = useState(0);

    function handleChangePage(e, newPage){
        setPage(newPage);
    }

    const emptyRows = 5 - Math.min(5, studentList.size - page * 5);

    return (
        <div
            className={classes.studenttable}
        >
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
                                    {index+1}
                                </TableCell>
                                <TableCell align="right">
                                    {user_id}
                                </TableCell>
                                <TableCell align="right">
                                    {name}
                                </TableCell>
                                <TableCell align="right">
                                    <SvgIcon
                                        className={
                                            classes.btndelete
                                        }
                                        onClick={()=>handleDeleteStudent(classIdx, user_id, token)}
                                    >
                                        <Clear/>
                                    </SvgIcon>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    {console.log(emptyRows)}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={studentList.size}
                rowsPerPage={5}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
            />
        </div>
    );
}
 
export default StudentTable;