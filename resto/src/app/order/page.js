"use client"
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader.js';
import Footer from '../_components/Footer';
import { Delivery_Charges, TAX } from '../lib/constant/DelieveryChargers.js';
import axios from 'axios';
import { useRouter } from 'next/navigation.js';

const page = () => {
    const [user, setUser] = useState()
    const [removeCart, setRemoveCart] = useState(false)
    const router = useRouter()




    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        user = user?.data?.result
        setUser(user)
    }, [])


    const [foodItems, setFoodItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    console.log(foodItems, "cart food items")
    const [total] = useState(() => foodItems?.length === 1 ? foodItems[0].price : foodItems?.reduce((total, item) => {
        return total + item.price;
    }, 0))
    console.log(total, "total price")

    useEffect(() => {
        if (!total) {
            router.push("/")
        }
    }, [total])

    const handleRemoveFromCart = (item) => {
        const oldCart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const newCart = oldCart.filter(
            (cartItem) => cartItem._id !== item._id
        );

        // Update localStorage
        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );


    };
    const orderNow = async () => {
        let user_id = JSON.parse(localStorage.getItem("user"))?.data?.result?._id
        let user_city = JSON.parse(localStorage.getItem("user"))?.data?.result?.city


        let cart = JSON.parse(localStorage.getItem("cart"))
        let restaurantId = cart[0].restaurantId
        let foodsItemsIds = cart?.map((item) => item._id)

        const DeliveryBoyResponse = await axios.get("http://localhost:3000/api/deliveryPartner/" + user_city)
        let deliveryBoy_ids = DeliveryBoyResponse?.data?.result?.map((item) => item._id)
        let deliveryBoy_id = deliveryBoy_ids[Math.floor(Math.random() * deliveryBoy_ids.length)]
        if (!deliveryBoy_id) {
            alert("Delivery Partner is Not Availble ")
            return false
        }
        let collection = {
            user_id,
            restaurantId,
            foodsItemsIds,
            deliveryBoy_id: deliveryBoy_id,
            status: "confrim",
            amount: total + (total * TAX / 100) + Delivery_Charges


        }
        console.log(collection, " this is collection")

        const response = await axios.post("http://localhost:3000/api/order", { collection })
        console.log(response, "this is response")

        if (response.data.success) {
            alert("Order Confrimed Succesfully")
            setRemoveCart(true)
            router.push("/userProfile")


        }
    }


    return (
        <div >

            {/* Header */}
            <CustomerHeader removeCart={removeCart} />




            <div className='total-price-wrapper'>

                <div className='total-price-wrapper-block-1'>


                    <h3>User  Details  </h3>

                    <div className='row'>
                        <span>Username : </span>
                        <span>{user?.name}</span>
                    </div>
                    <div className='row'>
                        <span>email: </span>
                        <span>{user?.email}</span>
                    </div>
                    <div className='row'>
                        <span>Phone: </span>
                        <span>{user?.phone || 9098979695}</span>
                    </div>

                    <h3>Amount Details  </h3>

                    <div className='row'>
                        <span>Food Charges : </span>
                        <span>{total}</span>
                    </div>

                    <div className='row'>
                        <span>Tax : </span>
                        <span>{total * TAX / 100}</span>
                    </div>

                    <div className='row'>
                        <span> Delivery Charges : </span>
                        <span> {Delivery_Charges}</span>
                    </div>

                    <div className='row'>
                        <span>Total Amount : </span>
                        <span>{total + (total * TAX / 100) + Delivery_Charges}</span>
                    </div>

                    <h3>Payment Method </h3>
                    <div className='row'>
                        <span> Cash on Delivery  : </span>
                        <span> {total + (total * TAX / 100) + Delivery_Charges}</span>
                    </div>
                </div>


                <div className='total-price-wrapper-block-2'>
                    <button onClick={orderNow}> Place Your Order Order Now</button>
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default page