import React, { useState,useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom"
import { LandingPage } from "./components/LandingPage";
import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/LogIn";
import { RoomChat } from "./components/RoomChat";
export const MainRouter =() =>{
    const [userId, setUserId] = useState(null);
    return(
        <>
        {/* <UserContext.Provider value={{ userId, setUserId }}> */}
        <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/room-chat' element={<RoomChat />}></Route>
        </Routes>
        {/* </UserContext.Provider> */}
        </>
    )
}