import React, { useState } from 'react';
import axios from 'axios'
import {
    Button, Paper, TextField, Typography
} from '@mui/material';

import { Link } from 'react-router-dom';
import { url_main } from '../components/env';

const stylePaper: React.CSSProperties = {
    padding: "10px 20px 50px 20px",
    position: "relative"
}

const styleTextfields: React.CSSProperties = {
    margin: "10px 0px"
}
const styleLoadingButton: React.CSSProperties = {
    position: "absolute",
    right: "20px",
    width: "80px"
}

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [err, setErr] = useState(false);

    const login = async () => {
        try {
            const response = await axios.post(url_main+'auth/login', {
                username: username,
                password: password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            window.location.href = "/dashboard";
        } catch (err) {
            console.log('Invalid email or password.');
            setErr(true)
        }
    }

    const passwordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    }
    const ifEnterPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == "Enter")
            login()
    }

    return (
        <div className='container'>
            <div className='login'>
                <Paper style={stylePaper} variant="outlined">
                    <Typography variant='h5'>Login</Typography>

                    <TextField label="Username"
                        style={styleTextfields} fullWidth
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <TextField label="Password"
                        style={styleTextfields}
                        variant="outlined"
                        fullWidth
                        type={"password"}
                        onChange={passwordChange}
                        onKeyDown={ifEnterPressed}
                    />
                    <br />

                    {err ?
                        <Typography color="red">Password or username wrong!</Typography>
                        :
                        <></>
                    }
                    <Link to="/register" style={{ color: "green" }}>
                        <Typography style={{
                            position: "absolute",
                            left: "20px",
                            width: "80px"
                        }} variant="subtitle2">Register</Typography>
                    </Link>

                    <Button
                        style={styleLoadingButton}
                        variant="contained"
                        onClick={login}
                    >
                        Login
                    </Button>
                </Paper>
            </div>
        </div>
    );
}

export default Login;
