"use client"
import React, { useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader.js';
import Footer from '../_components/Footer';
import { Delivery_Charges, TAX } from '../lib/constant/DelieveryChargers.js';

const page = () => {
    const [foodItems, setFoodItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    console.log(foodItems , "cart food items")
    const [total] = useState(() => foodItems.length === 1 ? foodItems[0].price : foodItems.reduce((total, item) => {
        return total + item.price;
    }, 0))
    console.log(total, "total price")

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

    return (
        <div >

            {/* Header */}
            <CustomerHeader />



            {/* Food Items */}
            <div>
                {foodItems.length > 0 ? (

                    foodItems.map((item) => {



                        return (
                            <div key={item._id}>

                                <div className='cart-list'>

                                    <div className='cart-list-box-1'>
                                        <img
                                            src={item.path}
                                            alt={item.name}
                                        />

                                    </div>
                                    <div className='cart-list-box-2'>

                                        <div>
                                            Name: {item?.name}
                                        </div>

                                        <div>
                                            Description:{" "}
                                            {item?.description}
                                        </div>


                                        <button
                                            onClick={() =>
                                                handleRemoveFromCart(item)
                                            }
                                        >
                                            Remove Item
                                        </button>

                                    </div>


                                    <div className='cart-list-box-3'>
                                        Price: {item?.price}
                                    </div>
                                </div>

                                <hr
                                    style={{
                                        border: "1px solid black",
                                    }}
                                />

                            </div>
                        );
                    })

                ) : (

                    <h1>
                        No Food Item Added for Now
                    </h1>

                )}

            </div>

            <div className='total-price-wrapper'>
                <div className='total-price-wrapper-block-1'>

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
                </div>

                <div className='total-price-wrapper-block-2'>
                    <button>Order Now</button>
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default page