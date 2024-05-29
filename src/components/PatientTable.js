'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import TablePagination from '@mui/material/TablePagination';

const TableExample = ({ type, search, facility }) => {
    const [data, setData] = useState([]);

    // console.log(type, search)
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (search.length > 1) {
                    let uri = ''
                    if (type === 'patients') {
                        uri = `http://localhost:8080/patient/autocomplete/${search}/${facility}`
                    } else {
                        uri = `http://localhost:8080/prescriber/autocomplete/${search}/${facility}`
                    }

                    const response = await fetch(uri, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [type, search, facility]);

    const getCustomStyle = (valueToCheck, highlights) => {
        let isBold = highlights.some(highlight => highlight.path === valueToCheck);

        // console.log(highlights, valueToCheck, isBold)
        return {
            fontWeight: isBold ? 'bold' : 'normal',
            fontSize: isBold ? '0.975rem' : '0.875rem'
        };
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Container maxWidth="lg">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            {/* Add more table headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow key={row._id}>
                                    {/* <TableCell>{row._id}</TableCell> */}
                                    <TableCell style={getCustomStyle('first_name', row.searchHighlights)}>{row.first_name}</TableCell>
                                    <TableCell style={getCustomStyle('last_name', row.searchHighlights)}>{row.last_name}</TableCell>
                                    {/* Add more table cells for additional data */}
                                </TableRow>
                            );
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Container>
    );
};

export default TableExample;
