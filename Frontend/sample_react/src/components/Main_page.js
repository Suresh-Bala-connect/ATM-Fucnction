import React from "react";
import atm from './atm.png';
import { useState } from "react";
import './Main_page.css';
import axios from "axios";
import Cont from "./Cont";

function Main_page() {
    const [getPin, setPin] = useState() // Stored Pin in Here 
    const [isLogin,setLogin]=useState(true)
    const [userData,setuserData]=useState(null) // PIN object store

    function handlePin(e) {
        setPin(e.target.value)
        console.log(e.target.value)
    }

    const checkPass = async () => {
        // console.log("WelCome")
        if (!getPin || getPin.trim() === '') {
            alert("Please Enter Your Pin");
            return;
        }
        try {
            const pass_res = await axios.get(`http://localhost:5018/find_pass/${getPin}`);
            console.log(pass_res.data);
            
            if (pass_res.data.success) {
                // alert("Welcome")
               setLogin(false)
               console.log(pass_res.data.data);
               
               setuserData(pass_res.data.data)
            }
            else {
                alert("Wrong Pin")
                console.log(pass_res.data)
            }
        }
        catch (err) {
            console.log("Error Come From Pin Code", err)
        }
    }
    return (
        <div>
            { isLogin ? (
                 <div className="main_contaier">
                <img src={atm}></img>
                <input type="password" placeholder="Enter Your Four Digi Pin"
                    value={getPin} onChange={handlePin} maxLength={4} pattern="\d{4}"></input>
                <button onClick={() => checkPass()}>Check Here</button>
            </div>
            ) :
            (<Cont user={userData}/>)  /* Pass data to Cont as props */
            } 
            
            
        </div>
    )
}
export default Main_page;