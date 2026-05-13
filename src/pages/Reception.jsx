import React, { useEffect, useState } from 'react'
import { api } from '../service/api'
import Card from '../componesnts/Card';

function Reception() {
  const [ guests, setGuests ] = useState([]);
  const [ search, setSearch ] = useState("")

  useEffect(()=>{
    load()
  }, [])

  async function load(name = null) {
    try{
      const res = await api.get(`/guests${ name? `?name=${name}` : ""}`)
      console.log(res)
      setGuests(res);
    } catch(e) {
      console.log("Erro ao carregar clientes: " + e.message)
    }

      
  }

  async function checkin(id) {
    try{
      const res = await api.get(`/guests/${id}/checkin`)
      console.log(res)
      load();
    } catch(e) {
      console.log("Erro fazer check-in: " + e.message)
    }
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">

      <div className='bg-neutral-100 w-2/4 h-120 p-5 overflow-hidden rounded-2xl'>
        <div className='w-full flex flex-col h-24 gap-2'>
          <h2>Wedding pass</h2>
          <input type="search" className='w-full p-2 bg-neutral-200 rounded-2xl border-2 border-neutral-600' onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {e.key === "Enter"? load(search) : ''}}/>
        </div>
        <div className=' flex flex-col grow gap-2 overflow-y-scroll scrollbar-none'>
          {
            guests.map((guest, key) => {
              return (
                <Card key={key} guest={guest}>
                  <button className='bg-green-300 p-2 rounded-2xl' onClick={() => checkin(guest.id)}>{guest.checked_in? "Checked" : "Check-in"}</button>
                </Card>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Reception