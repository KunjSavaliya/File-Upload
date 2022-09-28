import * as React from 'react';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {TableHead, TableBody} from "@mui/material";
import {TableCell} from "@mui/material";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Table1() {
    const navigate = useNavigate();
    const [imge, setimge] = useState('');

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/products/user").then((response) => {
            setData(response.data)
        });
    }, []);

    const handleFormDelete = id => {
        axios.delete(`http://localhost:3000/api/products/user/${id}`,
        ).then((response) => {
            const sd = data.filter(item => item._id !== response.data._id);
            setData(sd)
        }).catch((err) => {
            console.log(err)
        });
    };

    const handleFormEdit = id => {
        navigate(`/AddUser/${id}`);
    };


    return (
        <>
            <TableContainer>
                <Table sx={{minWidth: 650, mt: "65px"}} size="small" aria-label="a dense table">
                    <TableHead className="col-3">
                        <TableRow>
                            <TableCell className="col-1" align="center">#</TableCell>
                            <TableCell className="col-1" align="center">profilePic</TableCell>
                            <TableCell className="col-1" align="center">FullName</TableCell>
                            <TableCell className="col-1" align="center">MobileNo</TableCell>
                            <TableCell className="col-1" align="center">Email</TableCell>
                            <TableCell className="col-1" align="center">Password</TableCell>
                            <TableCell className="col-1" align="center">Gender</TableCell>
                            <TableCell className="col-1" align="center">Hobby</TableCell>
                            <TableCell className="col-1" align="center">City</TableCell>
                            <TableCell className="col-1" align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((element, index,)  => (

                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell className="col-1" align="center">{index + 1 }</TableCell>
                                <TableCell align="center">{<img className="box" src={`http://localhost:3000/public/img/${element.profilePic}`}/>}</TableCell>
                                <TableCell align="center">{element?.FullName}</TableCell>
                                <TableCell className="col-1" align="center">{element.MobileNo}</TableCell>
                                <TableCell className="col-1" align="center">{element.Email}</TableCell>
                                <TableCell className="col-1" align="center">{element.Password}</TableCell>
                                <TableCell className="col-1" align="center">{element.Gender}</TableCell>
                                <TableCell className="col-1" align="center">{element.Hobby}</TableCell>
                                <TableCell className="col-1" align="center">{element.City}</TableCell>
                                <TableCell  align="center" sx={{width:"50%"}}>
                                    <Button sx={{mr: '5px'}} variant="contained" color="success"
                                            onClick={() => handleFormEdit(element._id)}>Edit</Button>
                                    <Button sx={{ml: '5px'}} variant="contained" color="error"
                                            onClick={() => handleFormDelete(element._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Table1