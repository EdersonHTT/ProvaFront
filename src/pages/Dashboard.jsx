import React, { useEffect, useState } from 'react'
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import { api } from '../service/api';

function Dashboard() {
  const [ data, setData ] = useState({});

  useEffect(() => {
    handleDashboard()
  }, [])

  async function handleDashboard() {
    const res = await api.get("/guests/dashboard")

    console.log(res)
  }

  const chartData = [
    {name: "Total", value: data.total},
    {name: "Confirmados", value: data.total},
    {name: "Pendentes", value: data.total}
  ];


  return (
    <div>

      <BarChart width={600} height={300} data={chartData} >
        <XAxis
          dataKey="name"
          label={{ position: 'insideBottomRight' }}
        />
        <YAxis label={{ position: 'insideTopLeft', value: 'YAxis title', angle: -90, dy: 60 }} />
        <Bar dataKey="value" fill="#8884d8" />
        <Tooltip />
      </BarChart>
    </div>
  )
}

export default Dashboard