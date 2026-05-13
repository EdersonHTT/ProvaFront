import React, { useEffect, useState } from 'react'
import { api } from '../service/api'

function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    async function handleLogin() {
        const res = await api.post("/users/login", { email, password});
        console.log(res)
        const token = res.token;
        const role = res.user.role;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if(role === "admin") {
            alert(role === "admin")
            window.location.href = "/dashboard";
        } else {
            window.location.href = "/reception";
        }

    }

  return (
    <div className='min-w-screen min-h-screen '>
        <div className='w-2/5 h-80 flex flex-col gap-2'>
            <h1>Wedding pass</h1>
            <input type="text" className='bg-neutral-300' onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" className='bg-neutral-300' onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => handleLogin()} >Logar</button>
        </div>
    </div>
  )
}

export default Login