import React from 'react';
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
// import {useNavigate,} from "react-router-dom";

function Nav() {
    // let navigator = useNavigate()
    let localData = localStorage.getItem("token");


    const Logout = () => {
        localStorage.removeItem("token");
    };


    return (
        <Grid >
            <Grid >
                <Grid >
                    <Grid sx={{display: "flex"}}>
                        <Grid sx={{mr: "50px"}}>
                            {!localData && <Link to="/" className="click"><HomeIcon/></Link>}
                        </Grid>
                        <Grid sx={{mr: "50px"}}>
                            {localData ? null : <Link to="/Login" className="click"><LoginIcon/></Link>}
                        </Grid>
                        <Grid sx={{mr: "50px"}}>
                            {!localData && <Link to="/AddUser" className="click"><AddIcon/></Link>}
                        </Grid>
                    </Grid>
                    <Grid sx={{display: "flex"}} >
                        <Grid sx={{mr: "50px"}}>
                            {localData && <Link to="/" className="click"><HomeIcon/></Link>}
                        </Grid>
                        <Grid sx={{mr: "50px"}}>
                            {localData && <Link to="/Table" className="click"><TableRowsIcon/></Link>}
                        </Grid>
                        <Grid sx={{mr: "50px"}}>
                            {localData && <Link to="/Logout" onClick={Logout} className="click"><LogoutIcon/></Link>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Nav