import React, { useState, useMemo } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button
} from '@mui/material';

function App(props) {
    const data = props.fileList;
    console.log('table', data);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleFileView = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.click();
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    // Sort function to sort the rows by the given column
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Sort the data based on `order` and `orderBy`
    const sortedRows = useMemo(() => {
        const comparator = (a, b) => {
            if (a[orderBy] < b[orderBy]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[orderBy] > b[orderBy]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        };

        return data.slice().sort(comparator);
    }, [data, order, orderBy]);

    // Slice the sorted rows for pagination
    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when rows per page changes
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginInline: '1rem' }}>
                <h2>File List</h2>
            </div>
            <Paper sx={{ width: '95%', alignSelf: 'center' }}>
                {data && data.length ? (
                    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell
                                        sortDirection={orderBy === 'title' ? order : false}
                                        onClick={() => handleRequestSort('title')}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f1f1f1',
                                                cursor: 'pointer'
                                            },
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        File Name
                                    </TableCell>
                                    <TableCell
                                        sortDirection={orderBy === 'uploadedAt' ? order : false}
                                        onClick={() => handleRequestSort('uploadedAt')}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f1f1f1',
                                                cursor: 'pointer'
                                            },
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Creation Time
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedRows.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{formatDate(item.uploadedAt)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleFileView(item.url)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <div>No data available</div>
                )}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
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
