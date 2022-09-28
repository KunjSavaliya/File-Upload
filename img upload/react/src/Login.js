import React from 'react';
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import {useNavigate} from "react-router";
// import {useNavigate, } from "react-router-dom";

const Login = () => {
    // let localData = localStorage.getItem("token")
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleLogin = () => {
        axios.post(`http://localhost:3000/api/products/login`,state).then((response) => {
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log("data", response.data)
        });
    };


    const handleClickShowPassword = () => {
        setState({
            ...state,
            showPassword: !state.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>

            <form>
                <Card sx={{textAlign: "center",pt:"65px"}} className="img" >
                    <CardHeader title="Login App"/>
                    <CardContent>
                        <Stack sx={{alignItems:"center"}} spacing={2}>
                            <Avatar
                                alt=" "
                                src="img/1.jpg"
                                className="imgg"
                                sx={{ width: 56, height: 56}}
                            />
                            {/*<Avatar  className="img"  />*/}
                        </Stack>
                        <TextField
                            id="username"
                            type="email"
                            label="Username"
                            margin="normal"
                            onChange={(e) => setState({...state, email: e.target.value})}
                            sx={{zIndex:"0",color:"red"}}
                        /><br/>
                        <FormControl  sx={{m: 1, width: "26ch",zIndex:"0"}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={state.showPassword ? "text" : "password"}
                                value={state.password}
                                onChange={(e) => setState({...state, password: e.target.value})}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {state.showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions sx={{justifyContent: "center"}}>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            onClick={handleLogin}>
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </>
    );
};

export default Login;