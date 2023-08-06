import { Box, Button, MenuItem, Paper, Select, Snackbar, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { headers, urls, url_main } from "../../env";
import { checkPrivileges } from "../../providers/useFunctions";

interface User {
    username: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string
}

export const WriteNews = () => {
    const [users, setUsers] = useState([] as User[]);
    const [message, setMessage] = useState('');
    const [toUser, setToUser] = useState('all');
    const [formError, setFormError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() === '' || toUser.trim() === '') {
            setFormError(true);
            return;
        }
        try {
            await axios.post(urls.admin_news_write, {
                message: message,
                to: toUser === "all" ? undefined : toUser
            }, { headers });

            setIsSuccess(true);
            setMessage('');
            setToUser('all');
            setFormError(false);

        } catch (err) {
            setIsError(true);
        }
    };

    useEffect(() => {
        getUsers();
        checkPrivileges().then(setIsAdmin);
    }, [])
    const getUsers = async () => {
        try {
            const users_recived = await (await axios.get(urls.admin_users, { headers })).data;
            setUsers(users_recived);

        } catch (err) {

        }
    }

    const handleSnackbarClose = () => {
        setIsSuccess(false);
    };
    
    if (isAdmin)
        return (
            <Box sx={{ margin: "20px" }}>
                <Paper sx={{ padding: "40px" }}>
                    <Typography variant="h4">Write news!</Typography>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Info"
                            multiline
                            rows={4}
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            error={formError && message.trim() === ''}
                            helperText={formError && message.trim() === '' ? 'Text is required' : ''}
                        />
                        <br />
                        <br />
                        <Select
                            label="To user"
                            value={toUser}
                            onChange={(e) => setToUser(e.target.value)}
                            fullWidth
                            error={formError && toUser.trim() === ''}
                        >
                            <MenuItem value="all">All</MenuItem>
                            {users.map((user) => (
                                <MenuItem key={user.username} value={user.username}>
                                    {user.username}
                                </MenuItem>
                            ))}
                        </Select>
                        {formError && toUser.trim() === '' && (
                            <Typography variant="caption" color="error">
                                To user is required
                            </Typography>
                        )}
                        <br />
                        <br />
                        <Button variant="contained" type="submit">
                            Send news
                        </Button>
                    </form>
                    <Snackbar
                        open={isSuccess}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        message="News sent successfully!"
                    />
                    <Snackbar
                        open={isError}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        message="Error sending news. Please try again later."
                    />
                </Paper>
            </Box>
        )
    else
        return (<div>
        </div>
        )
}