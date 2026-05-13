// import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Reception from "../pages/Reception"
import PrivateRoutes from "./PrivateRoutes"
import GuestAdmin from "../pages/GuestAdmin"
import Dashboard from "../pages/Dashboard"

function AppRoutes() {
  return (
    <BrowserRouter >
      <Routes >

        <Route path="/" element={<Login />}/>

        <Route path="/reception" element={
          <PrivateRoutes roleCompare={["admin", "recepcionista"]}>
            <Reception />
          </PrivateRoutes>
        }/>

        <Route path="/dashboard" element={
          <PrivateRoutes roleCompare={["admin"]}>
            <Dashboard />
          </PrivateRoutes>
        }/>

        <Route path="/guestadmin" element={
          <PrivateRoutes roleCompare={["admin"]}>
            <GuestAdmin />
          </PrivateRoutes>
        }/>


      </Routes> 
    </BrowserRouter>
  )
}

export default AppRoutes