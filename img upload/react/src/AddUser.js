import * as React from 'react';
import {useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {TextField, Radio, Checkbox, InputLabel, FormGroup, FormControlLabel} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import "./App.css"
import {useNavigate, useParams} from "react-router-dom";
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    white:{
        display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop:'80px'
    },
    item: {
        width:'100%',
        zIndex:'0',
    },
    font:{
        marginBottom:'20px',
    },
    font1:{
        marginBottom:'20px',
        marginTop:'20px'
    },
    force:{
        display: 'flex',
        justifyContent: "space-between"
    }
}));

function AddUser() {
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState([]);
    const [Data, setFormData] = useState({
        _id: "",
        FullName: "",
        MobileNo: "",
        Email: "",
        Password: "",
        Gender: "",
        Hobby: [],
        City: "",
        token: "",
        profilePic: ""
    });
    console.log("data", Data)
    useEffect(() => {
        if (params.id) {
            axios.get(`http://localhost:3000/api/products/adduase${params.id}`).then((response) => {
                console.log("res", response.data);
                setFormData(response.data);
            });
        }
    }, []);

    function handleFormSubmit(id) {
        if (params.id) {
            const formData = new FormData();
            formData.append('myFile', Data.profilePic, Data.profilePic.name);
            formData.append('FullName', Data.FullName);
            formData.append('MobileNo', Data.MobileNo);
            formData.append('Email', Data.Email);
            formData.append('Password', Data.Password);
            formData.append('Gender', Data.Gender);
            formData.append('Hobby', Data.Hobby);
            formData.append('City', Data.City);
            axios.put(`http://localhost:3000/api/products/data/${params.id}`, formData
            ).then((response) => {
                console.log("response", response);
                setFormData(response.data);
                setFormData({
                    FullName: "",
                    MobileNo: "",
                    Email: "",
                    Password: "",
                    Gender: "",
                    Hobby: [],
                    City: "",
                    profilePic: ""
                })
                navigate('/Table')
            }).catch((err) => {
                console.log(err)
            });
        } else {
            const formData = new FormData();
            formData.append('myFile', Data.profilePic, Data.profilePic.name);
            formData.append('FullName', Data.FullName);
            formData.append('MobileNo', Data.MobileNo);
            formData.append('Email', Data.Email);
            formData.append('Password', Data.Password);
            formData.append('Gender', Data.Gender);
            formData.append('Hobby', Data.Hobby);
            formData.append('City', Data.City);
            // formData.append('profilePic', Data.profilePic);
            // console.log("formData", formData)
            axios.post(`http://localhost:3000/api/products/`, formData
            ).then((response) => {
                setData([...data, response.data]);
                setFormData({
                    FullName: "",
                    MobileNo: "",
                    Email: "",
                    Password: "",
                    Gender: "",
                    Hobby: [],
                    City: "",
                    profilePic: ""
                })
            }).catch((err) => {
                console.log(err)
            });
        }
    }


    function onAddingItem(e) {
        const value = e.target.value;
        if (e.target.name === "Hobby") {
            if (Data.Hobby.includes(value)) {
                const data = Data.Hobby.filter(val => val !== value);
                setFormData({...Data, Hobby: data});
            } else {
                setFormData({...Data, Hobby: [...Data.Hobby, value]})
            }
        }
    }
    const classes = useStyles()
    return (
        <>
            <Grid className={classes.white}>
                <Grid method='POST' action='http://localhost:3000/api/products'>
                    <Grid className={classes.font}>
                        <TextField  xs={12} className={classes.item} label="FullName" value={Data.FullName}
                                   onChange={(e) => setFormData({...Data, FullName: e.target.value})}/><br/>
                    </Grid>
                    <Grid className={classes.font}>
                        <TextField xs={12} sx={{width: '50ch', zIndex: "0"}} label="MobileNo" value={Data.MobileNo}
                                   onChange={(e) => setFormData({...Data, MobileNo: e.target.value})}/><br/>
                    </Grid>
                    <Grid className={classes.font}>
                        <TextField sx={{width: '50ch', zIndex: "0"}} label="Email" value={Data.Email}
                                   onChange={(e) => setFormData({...Data, Email: e.target.value})}/><br/>
                    </Grid>
                    <Grid className={classes.font}>
                        <TextField sx={{width: '50ch', zIndex: "0"}} type='Password' name='Password' label="Password"
                                   value={Data.Password}
                                   onChange={(e) => setFormData({...Data, Password: e.target.value})}/><br/>
                    </Grid>
                    <Grid className={classes.force} >
                        <label className={classes.font}>Gender <br/>
                            <Radio checked={Data.Gender === 'Male'} value="Male"
                                   onChange={(e) => setFormData({...Data, Gender: e.target.value})}/>Male<br/>
                            <Radio checked={Data.Gender === 'Female'} value="Female"
                                   onChange={(e) => setFormData({...Data, Gender: e.target.value})}/>Female<br/>
                            <Radio checked={Data.Gender === 'Other'} value="Other"
                                   onChange={(e) => setFormData({...Data, Gender: e.target.value})}/>Other
                        </label>
                        <FormGroup>Hobby:
                            <FormControlLabel name="Hobby" control={<Checkbox/>} value="Reading"
                                              checked={Data.Hobby.includes("Reading")}
                                              onChange={(e => onAddingItem(e))}
                                              label="Reading"/>
                            <FormControlLabel name='Hobby' control={<Checkbox/>} value="Yoga"
                                              checked={Data.Hobby.includes("Yoga")}
                                              onChange={(e => onAddingItem(e))}
                                              label="Yoga"/>
                            <FormControlLabel name='Hobby' control={<Checkbox/>} value="Writing"
                                              checked={Data.Hobby.includes("Writing")}
                                              onChange={(e => onAddingItem(e))}
                                              label="Writing"/>
                        </FormGroup>
                    </Grid>
                    <Grid>
                        <FormControl  className={classes.item}>
                            <InputLabel>City</InputLabel>
                            <Select
                                label="City"
                                name="City"
                                value={Data.City}
                                onChange={(e) => setFormData({...Data, City: e.target.value})}>
                                {/*<option label="None" value="" />*/}
                                <MenuItem selected={Data.City === 'Mumnai'} value="Mumnai">Mumnai</MenuItem>
                                <MenuItem selected={Data.City === 'Delhi'} value="Delhi">Delhi</MenuItem>
                                <MenuItem selected={Data.City === 'Hyderabad'}
                                          value="Hyderabad">Hyderabad</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid className={classes.font1} >
                        <TextField
                            name="my-file"
                            autoComplete="off"
                            id="textArea"
                            // value={Data.profilePic.find}
                            onChange={(e) => setFormData({...Data, profilePic: e.target.files[0]})}
                            type="file"
                        />
                    </Grid>
                    <Grid sx={{mt: 2, boxShadow: '10px'}}>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={handleFormSubmit}>submit</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}


export default AddUser;




