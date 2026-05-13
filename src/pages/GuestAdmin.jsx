import React, { useEffect, useState } from 'react'
import Card from '../componesnts/Card';
import { api } from '../service/api';

function GuestAdmin() {
  const [ guests, setGuests ] = useState([]);

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ cpf, setCpf ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ table, setTable ] = useState("");

  const [ guestId, setGuestId ] = useState(-1);

  useEffect(()=>{
    load()
  }, [])

  async function load() {
    try{
      const res = await api.get(`/guests`)
      setGuests(res);
    } catch(e) {
      console.log("Erro ao carregar clientes: " + e.message)
    }
  }

  async function deleteGuest(id) {
    try {
      const res = await api.delete(`/guests/${id}/delete`)
      load()

    } catch(e) {
      console.log("Erro ao deletar cliente: " + e.message)
    }
  }
  


  async function save() {
    try {
      const body = {
        name: name,
        email: email,
        cpf: cpf,
        phone: phone,
        table_number: table
      }

      if(guestId != -1) {
        await api.put(`/guests/${id}/update`, body)
        setGuestId(-1);
      } else {
        await api.post(`/guests/`, body)
      }

      load()
    } catch(e) {
      console.log("Erro ao salvar cliente: " + e.message)
    }
  }


  function edit(id) {
    setGuestId(id)
    save()
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">

      <div className='bg-neutral-100 w-2/4 h-120 p-5 overflow-hidden rounded-2xl'>
        <div className='w-full flex flex-col h-24 gap-2'>
          <h2>Wedding pass</h2>
        </div>
        <div className=' flex flex-col grow gap-2 overflow-y-scroll scrollbar-none'>
          {
            guests.map((guest, key) => {
              return (
                <Card key={key} guest={guest}>
                  <button className='bg-blue-300 p-2 rounded-2xl ml-auto' onClick={() => setGuestId(guest.id)}>Update</button>
                  <button className='bg-red-300 p-2 rounded-2xl ml-1' onClick={() => confirm("Certeza que deseja deletar?")? deleteGuest(guest.id) : null}>Delete</button>
                </Card>
              )
            })
          }
        </div>
      </div>
      <div className="p-5 w-2/4 h-100 flex flex-col justify-between">
        <h1>{guestId != -1? "Atualizar Cliente" : "Registrar Cliente"}</h1>
        <input type="text" className='bg-neutral-200 rounded-2xl border-1 border-neutral-300 p-2' placeholder="Name"  onChange={(e) => setName(e.target.value)}/>
        <input type="text" className='bg-neutral-200 rounded-2xl border-1 border-neutral-300 p-2' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" className='bg-neutral-200 rounded-2xl border-1 border-neutral-300 p-2' placeholder="CPF" onChange={(e) => setCpf(e.target.value)}/>
        <input type="text" className='bg-neutral-200 rounded-2xl border-1 border-neutral-300 p-2' placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
        <input type="text" className='bg-neutral-200 rounded-2xl border-1 border-neutral-300 p-2' placeholder="Número da Mesa" onChange={(e) => setTable(e.target.value)}/>
        <button className='bg-green-300 p-2 rounded-2xl ml-1' onClick={() => guestId != -1? edit(guest.id) : save}>{guestId != -1? "Update" : "Registrar"}</button>
      
      </div>
    </div>
  )
}

export default GuestAdmin