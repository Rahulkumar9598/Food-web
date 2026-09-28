"use client"
import React, { useEffect, useState } from 'react'
import DeliveryHeader from '../deliveryHeader'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const page = () => {
    const router = useRouter()
    const [restaurants, setRestaurants] = useState()

    useEffect(() => {
        let delivery = JSON.parse(localStorage.getItem("DeliveryPartner"))
console.log(delivery)
       let id = delivery?._id 
  

        if (!delivery) {
            router.push("/deliveryPartner")
        }
        getRestaurant(id )

    }, [])


    const getRestaurant = async (id) => {
        try {

            const response = await axios.get(`http://localhost:3000/api/deliveryPartner/orders/${id}`)
            console.log(response, " this is response of delivery ")

            if (response.data.success) {
                setRestaurants(response.data.result)
            }
        } catch (error) {
            console.log(error)

        }
    }


    return (
        <div>
            <DeliveryHeader />
            <h2>My Order List</h2>
            <div>
                {
                    restaurants?.map((item) => {
                        return <div key={item.id} className='restaurant-list-wrapper'>
                            <h2>Name : {item.restaurant.name}</h2>
                            <div>Amonut : {item.amount}</div>
                            <div>City : {item.restaurant.city}</div>
                            <div>Address : {item.restaurant.address}</div>
                            <div>Update Status :
                                <select>
                                    <option>confrim</option>
                                    <option>On The Way</option>
                                    <option>Delivered</option>
                                    <option>Failed Delivery</option>
                                </select>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

    )
}

export default page