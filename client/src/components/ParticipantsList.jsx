// import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Api } from "../services/Api";
import moment from 'moment';
import {
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles,
    TablePagination,
    IconButton,
} from '@material-ui/core';
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";



const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        maxWidth: 1200,
        margin: '0 auto',
    },
    tableHeadeCell: {
        fontWeight: 'bold',
    },
    
}));

export const ParticipantsList = () => {
    const { token } = useAuth();
    const {id} = useParams();
    const [reserve, setReserve] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    const classes = useStyles();
    
    const toggleDelete = async (id) => {
        
        try {
            const deleteReserveId = await Api.delete(id, token);
            setReserve((prevState) => prevState.filter((reserve) => reserve.id !== deleteReserveId))
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    } 
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await Api.getAllByEventId(token, id);
            setReserve(res)
        }
        fetchData();
        
    }, [setReserve, id, token]);

    if (!reserve) {
        return <div>Loading</div>
    }





    return (
        <div>
            <h1 className="page-title">Reserve List</h1>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell className={classes.tableHeadeCell}>ID</TableCell>
                            <TableCell className={classes.tableHeadeCell}>Name</TableCell>
                            <TableCell className={classes.tableHeadeCell}>Surname</TableCell>
                            <TableCell className={classes.tableHeadeCell}>Email</TableCell>
                            <TableCell className={classes.tableHeadeCell}>Date Of Birth</TableCell>
                            <TableCell className={classes.tableHeadeCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reserve.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                            <TableRow
                                key={row.id}
                                >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.firstname}</TableCell>
                                <TableCell>{row.surname}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{moment(row.dob).format('YYYY-MM-DD')}</TableCell>
                                <TableCell >
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => navigate(`/update/${row.id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                    aria-label="delete"
                                    onClick={() => toggleDelete(row.id)}
                                    >
                                        <DeleteOutline />
                                </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={reserve.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        componentsProps={{
                        select: {
                            'aria-label': 'rows per page',
                        },
                        actions: {
                            showFirstButton: true,
                            showLastButton: true,
                        },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>
        </div>
    )
}
                