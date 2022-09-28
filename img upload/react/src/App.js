import * as React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AddUser from './AddUser';
import Table1 from './Table';
import Home from "./Home";
import Login from "./Login";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/SvgIcon/SvgIcon";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Nav from "./Nav";

function App() {
    let localData = localStorage.getItem("token");

    return (
        <>
            <Router>
                <Box sx={{flexGrow: 1, position: "fixed", width: "100%", zIndex: "1"}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                {/*<Sidebar/>*/}
                            </Typography>
                            <Nav/>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Routes>
                    <Route>
                        <Route exact path="/" element={<Home/>}/>
                    </Route>
                </Routes>
                <Routes>
                    <Route>
                        {/*<Route exact path="/Login" element={<Login/>}/>*/}
                        <Route
                            exect path="/Login"
                            element={localData ? <Navigate to="/Table"/> : <Login/>}
                        />
                    </Route>
                </Routes>
                <Routes>
                    <Route exect path="/AddUser"
                        // element={<AddUser/>}
                           element={localData ? <Navigate to="/"/> : <AddUser/>}
                    />
                    <Route exect path="/AddUser/:id"
                           element={<AddUser/>}
                    />
                </Routes>
                <Routes>
                    <Route exect path="/Table"
                        // element={<Table1/>}
                           element={localData ? <Table1/> : <Navigate to="/"/>}
                    />
                </Routes>
            </Router>
        </>

    );
}

export default App;
