import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

const App = ()=>{
    const [curAcc, setcurAcc] = useState("");
    const walletcheck = async ()=>{
        try {
            const {ethereum} = window;
            if(!ethereum){
                console.log("Please add Metamask wallet");
                return;
            }
            else{
                console.log("Ethereum object detected");
            }
            const accounts = await ethereum.request({method:"eth_accounts"});
            if(accounts.length!==0){
                const account = accounts[0];
                console.log("Found an account: ", account);
                setcurAcc(account);
            }
            else{
                console.log("No account found");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        walletcheck();
    }, [])

    return(
        <h1>App</h1>
    )
}

export default App;