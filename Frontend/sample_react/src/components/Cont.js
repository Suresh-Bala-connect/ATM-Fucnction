import React, { use, useState } from "react";
import Main_page from "./Main_page";
import { useEffect } from "react";
import './Cont.css';
import axios from "axios";

function Cont({ user }) {
    // console.log({user})
    const [isLogin, setLogin] = useState(false);
    const [showContent, setContent] = useState()
    const [getAmount, setAmount] = useState(0)
    const [getDepositAmount, setDepositAmount] = useState()
    const [history, setHistory] = useState([]);

    function handleBalance() {
        setContent("balance")
    }
    function handleWithdraw(e) {
        setContent("withdraw")
    }
    function handleDeposit() {
        setContent("deposit")
    }
    async function handleHistory() {
        setContent("history")
        //     try {
        //   const res = await axios.get(`http://localhost:5018/find_pass/${user.password}`);
        //   setHistory(res.data.data); 
        //   console.log(res.data.data)
        // } catch (err) {
        //   console.log("Failed to fetch history", err);
        // }
    }
    // function handlewi_Amount(e) {
    //     const amount = Number(e.target.value)
    //     setAmount(amount)
    //     console.log(e.target.value)
    // }
    function handleDepositAmount(e) {
        const des_amount = Number(e.target.value)
        setDepositAmount(des_amount);
        console.log(des_amount)
    }
    function handleLogout() {
        setLogin(true)
    }
    function handleConfirm() {
        var new_balance = 0;
        if (!getAmount) {
            alert("Enter the Amount")
        }
        else if (getAmount < 100) {
            alert("Please Enter above Rs.100")
        }
        else if (getAmount > user.balance) {
            alert("Less Balance & Check U r Balance")
        }
        else {
            new_balance = user.balance - getAmount;
            alert(`New Balance:${new_balance}`)
        }
      
        const his = user.history || [];

        const history = [...his, { amount: getAmount, type: 'withdraw', balance: new_balance, date: new Date() }]
       
        with_update(user._id, { balance: new_balance, withdraw: getAmount, history: history });
        setAmount(0)
    }

    function handleDepositConfrim() {
        var new_deposit = 0;
        if (!getDepositAmount) {
            alert("Enter the Amount")
        }
        else if (getDepositAmount < 100) {
            alert("Please Enter above Rs.100")
        }
        else {
            new_deposit = getDepositAmount;
            alert(`Deposit Amount:${new_deposit}`)
        }
        const bal_update = user.balance + new_deposit;


        
        const his = user.history || [];

        const history = [...his, { amount: getDepositAmount, type: 'deposit', balance: bal_update, date: new Date() }]
    
        with_update(user._id, { balance: bal_update, deposit: getDepositAmount, history: history });

    }


    const with_update = async (_id, data) => {
        try {
            const result = await axios.put(`http://localhost:5018/update_Withdraw/${_id}`, data);
            if (result.data.success) {
                alert("Updated Successfully");

            } else {
                alert("Updated Failed");
            }
        }
        catch (err) {
            console.log("Failed to update form", err);
        }
    }


    return (
        <div>
            {!isLogin ? (
                <div className="main_con">
                    <h3>"Your trusted partner for seamless banking - anytime, anywhere."</h3>
                    <div className="container">
                        <div className="dep_his">
                            <button onClick={handleDeposit}>Make Deposit</button>
                            <button onClick={handleHistory}>History</button>
                        </div>
                        <div className="Data">
                            <h2>WelCome Mr.{user.name}</h2>
                            {
                                showContent === "balance" &&
                                <div>
                                    <h2>Your Balance is {user.balance}</h2>
                                </div>
                            }
                            {
                                showContent === "withdraw" &&
                                <div>
                                    {/* <h2>Welcome Mr.{user.name}</h2> */}
                                    <input type="number" placeholder="Enter Your Amount"
                                        value={getAmount}
                                        onChange={(e) => setAmount(e.target.value)}></input>
                                    <button onClick={handleConfirm}>  Conform</button>
                                </div>
                            }
                            {
                                showContent === "deposit" &&
                                <div>
                                    {/* <h2>Welcome Mr.{user.name}</h2> */}
                                    <input type="number" placeholder="Enter Your Deposit Amunt"
                                        value={getDepositAmount}
                                        onChange={handleDepositAmount}></input>
                                    <button onClick={handleDepositConfrim}>Deposit Conform </button>

                                </div>
                            }
                            {
                                showContent === "history" && (
                                    <div>
                                        <h2>Transaction History</h2>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Type</th>
                                                    <th>Amount (₹)</th>
                                                    <th>Balance (₹)</th>
                                                    <th>Date & Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    user.history.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.type}</td>
                                                            <td>{item.amount}</td>
                                                            <td>{item.balance}</td>
                                                            <td>{new Date(item.date).toLocaleString()}</td>
                                                        </tr>
                                                    ) ) 
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )

                            }



                        </div>
                        <div className="bal_draw">
                            <button onClick={handleBalance}>Check Balance</button>
                            <button onClick={handleWithdraw}>Withdraw</button>
                        </div>
                    </div>
                    <button onClick={handleLogout}>LogOut</button>
                </div>
            ) :
                (<Main_page />)}
        </div>
    )
}
export default Cont;