import React from 'react'

function Card({ guest, children }) {
    const role = localStorage.getItem("role")

  return (
    <div className='w-full h-auto flex justify-between'>
        {
            role != "admin"?
            <div>
                <p>{guest.name} - {guest.email}</p>
                <p>{guest.phone}</p>
            </div>
            : <div>
                <p>{guest.name} - {guest.email}</p>
                <p>{guest.cpf} - {guest.phone}</p>
            </div>
        }
        {children}
    </div>
  )
}

export default Card