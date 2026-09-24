"use client"
import React, { useEffect } from 'react'
import DeliveryHeader from '../deliveryHeader'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    
    useEffect(() => {
        let delivery = JSON.parse(localStorage.getItem("DeliveryPartner"))
        if (!delivery) {
            router.push("/deliveryPartner")
        }
    }, [])

    return (
        <div>
            <DeliveryHeader />
            <h2>Delivery Dashboard</h2>
        </div>

    )
}

export default page