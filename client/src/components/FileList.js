import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from '@mui/material';

const createData = (name, age, country) => {
    return { name, age, country };
};

const rows = [
    createData('John', 28, 'USA'),
    createData('Alice', 25, 'Canada'),
    createData('Bob', 30, 'Australia'),
    createData('Charlie', 35, 'UK'),
    createData('David', 22, 'Germany'),
];

function App(props) {
    const data = props.fileList
    console.log('table',data)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Handle sorting
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Sort rows based on the order and property
    const sortedRows = [...rows].sort((a, b) => {
        if (orderBy === 'name') {
            return (a.name < b.name ? -1 : 1) * (order === 'asc' ? 1 : -1);
        }
        if (orderBy === 'age') {
            return (a.age - b.age) * (order === 'asc' ? 1 : -1);
        }
        return (a.country < b.country ? -1 : 1) * (order === 'asc' ? 1 : -1);
    });

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Converts to a readable date format like "12/15/2024, 2:03:24 PM"
      };

    // Slice the sorted rows for pagination
    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', margin: '1rem' }}>
                <h1>File List</h1>
            </div>
            <Paper sx={{ width: '95%', my: 2, alignSelf: 'center' }}>
                { data && data.length ?
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>File name</TableCell>
                            <TableCell>Url</TableCell>
                            <TableCell>Creation Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.url}</TableCell>
                                <TableCell>{formatDate(item.uploadedAt) }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                :
                <div>
                    No Files found
                </div>}
                
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default App;
