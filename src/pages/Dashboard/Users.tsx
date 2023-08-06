import {
    Box, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { headers, urls } from "../../env";
import { checkPrivileges } from "../../providers/useFunctions";

interface User {
    username: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string
}

export const Users = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([] as User[]);

    useEffect(() => {
        getUsers();
        checkPrivileges().then(setIsAdmin);
    }, []);

    const getUsers = async () => {
        try {
            const users_recived = await (await axios.get(urls.admin_users, { headers })).data;
            setUsers(users_recived);

        } catch (err) {

        }
    }

    if (isAdmin)
        return (
            <Box sx={{ margin: "20px" }}>
                <Paper sx={{ padding: "40px" }}>
                    <Typography variant="h5">Users</Typography>
                    <br />

                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{
                                minWidth: 650,
                                textAlign: "left"
                            }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell align="right">Admin</TableCell>
                                        <TableCell align="right">Created</TableCell>
                                        <TableCell align="right">Updated</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((row) => (
                                        <TableRow
                                            key={row.username}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.username}
                                            </TableCell>
                                            <TableCell align="right">{row.admin ? "Yes" : "No"}</TableCell>
                                            <TableCell align="right">{row.createdAt}</TableCell>
                                            <TableCell align="right">{row.updatedAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Paper>
            </Box>
        )
    else return (<div></div>)
}