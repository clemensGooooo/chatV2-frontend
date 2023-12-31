import {
    Button, Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Paper, TextField,
    Typography
} from "@mui/material"

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { urls } from "../../env";

const stylePaper: React.CSSProperties = {
    padding: "10px 20px 50px 20px",
    position: "relative"
}
const styleCheckbox: React.CSSProperties = {
    margin: "6px -10px"
}

const styleLogin: React.CSSProperties = {
    margin: "5px 0px",
    position: "absolute",
    left: "20px",
    width: "80px",
}

const styleLink: React.CSSProperties = {
    color: "green"
}

const defaultValues = {
    username: '',
    password: '',
    cookies: false
}

export const Register = () => {
    const [err, setErr] = useState(false);
    const [formData, setFormData] = useState(defaultValues);
    const [errors, setErrors] = useState(defaultValues);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleChangeCheckbox = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            cookies: true,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            cookies: false,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            username: "",
            password: "",
            cookies: false
        };
        if (formData.username.trim() === '') {
            newErrors.username = 'Username is required';
        }
        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters long';
        }
        if (!formData.cookies) {
            newErrors.cookies = true;
        }

        if (newErrors.username !== "" ||
            newErrors.password !== "" ||
            newErrors.cookies !== false) {
            setErrors(newErrors);
        } else {
            console.log('Registration Data:', formData);
            register();
        }
    };

    const register = async () => {
        try {
            const response = await axios.post(urls.auth_register, {
                username: formData.username,
                password: formData.password
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            window.location.href = "/dashboard";
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    const errorCode: number = err.response.status;
                    if (errorCode === 409) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            username: "This username already exists!",
                        }));
                    } else {
                        setErr(true)
                    }
                }
            }
        }
    }


    return (
        <div className='container'>
            <div className='login'>
                <Paper style={stylePaper} variant="outlined">

                    <Typography variant="h4" align="left" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                type="text"
                                name="username"
                                label="Username"
                                value={formData.username}
                                onChange={handleChange}
                                error={Boolean(errors.username)}
                                helperText={errors.username}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                value={formData.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            />
                        </FormControl>

                        <FormGroup>
                            <FormControlLabel
                                style={styleCheckbox}
                                checked={formData.cookies}
                                onChange={handleChangeCheckbox}
                                control={<Checkbox color="warning" name="cookies" />}
                                label="Accept some cookies!"
                            />
                        </FormGroup>

                        {errors.cookies && (
                            <FormHelperText error>Please accept the cookies!</FormHelperText>
                        )}
                        {err ?
                            <FormHelperText error>Something went wrong!</FormHelperText>
                            : <></>
                        }
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                        <Link to="/login" style={styleLink}>
                            <Typography
                                style={styleLogin}
                                variant="subtitle2"
                            >
                                Login
                            </Typography>
                        </Link>
                    </form>
                </Paper>
            </div>
        </div>
    )
}
