import * as React from 'react';
import axios from "axios";
import {clear} from "@testing-library/user-event/dist/clear";


function Home() {
    let localData = localStorage.getItem("token");
    // debugger
    if (localData) {
        axios.post(`http://localhost:3000/api/products/api`, {token: localData}
        ).then((response) => {
            console.log("response", response.data)
            // localStorage.clear();
            if (response.data === false) {
                return localStorage.clear()
            }
        }).catch((err) => {
            console.log("response", err.response.status)
            if (err.response.status === 401) {
                return localStorage.clear()
            }
        });
    }

}

export default Home