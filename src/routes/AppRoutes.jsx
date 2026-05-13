// import React from 'react'
import { Routes } from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import Login from "../pages/Login"
import PrivateRoutes from "./PrivateRoutes"
import Reception from "../pages/Reception"
import Dashboard from "../pages/DashBoard"
import GuestAdmin from "../pages/GuestAdmin"

function AppRoutes() {
  return (
    <BrowserRouter >
      <Routes >

        <Route path="/" element={<Login />}/>


      </Routes> 
    </BrowserRouter>
  )
}

export default AppRoutes