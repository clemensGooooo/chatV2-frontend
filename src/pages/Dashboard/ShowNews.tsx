import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { url_main } from "../../components/env";

interface News {
    _id: string;
    message: string;
    readed: string[];
    createdAt: string;
    updatedAt: string;
}

export const ShowNews = () => {
    const [data, setData] = useState([] as News[]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const headers = {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
    };

    const fetchData = () => {
        axios
            .get(url_main + `admin/news?page=${currentPage}&pageSize=${pageSize}`, { headers })
            .then((response) => {
                const { data } = response.data;
                setData(data);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
        setPageSize(event.target.value as number);
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <Box sx={{ margin: "20px" }}>
            <Paper sx={{ padding: "40px" }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Readed</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item._id}</TableCell>
                                    <TableCell>{item.message}</TableCell>
                                    <TableCell>{item.readed.join(', ')}</TableCell>
                                    <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <Table>
                    <TableRow>
                        <div style={{position: "absolute",display: 'flex', justifyContent: 'flex-start' }}>
                            <FormControl>
                                <Select value={pageSize} onChange={handlePageSizeChange}>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <TableCell style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="button" sx={{marginTop: "6px"}}>
                                {`${currentPage} / ${totalPages} page`}
                            </Typography>
                            <Button variant="contained"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                sx={{
                                    margin: "0px 10px"
                                }}
                            >
                                Previous Page
                            </Button>

                            <Button variant="contained" onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                sx={{
                                    margin: "0px 10px"
                                }}>
                                Next Page
                            </Button>
                        </TableCell>
                    </TableRow>
                </Table>
            </Paper>
        </Box>
    )
}