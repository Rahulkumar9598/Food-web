"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [userOrders, setUserOrders] = useState([])
  const userId = JSON.parse(localStorage.getItem("user"))?.data?.result?._id

  const getData = async () => {
    const response = await axios.get(`http://localhost:3000/api/order?id=${userId}`)
    if (response.data.success) {
      setUserOrders(response.data.result)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div>page
      {
        userOrders.map((item) => {
          return <div key={item.id} className='restaurant-list-wrapper'>
            <h2>{item.name}</h2>
            <div>{item.email}</div>
            <div>{item.contact}</div>
            <div>{item.city}</div>
            <div>{item.address}</div>
          </div>
        })
      }
    </div>
  )
}

export default page