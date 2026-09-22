
"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

const Page = (props) => {
    const [foodItems, setFoodItems] = useState([]);
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [addedtItem, setAddedItem] = useState([]);

    const params = use(props.params);
    const searchParams = use(props.searchParams);

    const name = params?.name;
    const id = searchParams?.id;


    // Get cart from localStorage
    useEffect(() => {
        const cart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

         setAddedItem(Array.isArray(cart) ? cart : []);

    }, []);


    // Get restaurant details and food items
    useEffect(() => {
        if (!id) return;

        const loadRestaurantsDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/customer/${id}`
                );

                console.log(
                    "loadRestaurantsDetails",
                    response
                );

                if (response.data.success) {
                    setRestaurantDetails(
                        response?.data?.restaurantDetails
                    );

                    setFoodItems(
                        response.data.foodItems
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        loadRestaurantsDetails();
    }, [id]);


    // Add item to cart
    const handleAddToCart = (item) => {
        const oldCart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        console.log("test1")
        if (oldCart[0]?.restaurantId !== item?.restaurantId) {
            localStorage.removeItem("cart")
        console.log("test2")

         const newCart = [item];

            localStorage.setItem(
                "cart",
                JSON.stringify(newCart)
            );

               setAddedItem(newCart);

        } else {
        console.log("test3")

            console.log(item?.restaurantId, "this is item from the details page")
            console.log(oldCart[0]?.restaurantId, "oldcart from the details page")


            // Check if item already exists
            const alreadyAdded = oldCart?.some(
                (cartItem) => cartItem?._id === item?._id
            );

            if (alreadyAdded) {
                return;
            }

            const newCart = [...oldCart, item];

            // Update localStorage
            localStorage.setItem(
                "cart",
                JSON.stringify(newCart)
            );

            // Update React state
               setAddedItem(Array.isArray(newCart) ? newCart : []);


            console.log(
                newCart,
                "updated cart"
            );

        }

    };


    // Remove item from cart
    const handleRemoveFromCart = (item) => {
        const oldCart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const newCart = oldCart?.filter(
            (cartItem) => cartItem?._id !== item?._id
        );

        // Update localStorage
        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );

        // Update React state
                      setAddedItem(Array.isArray(newCart) ? newCart : []);

    };


    return (
        <div>

            {/* Header */}
            <CustomerHeader cartData={addedtItem} />


            {/* Restaurant Banner */}
            <div className="restaurant-page-banner">
                <div>
                    <h1>{name}</h1>
                </div>
            </div>


            {/* Restaurant Details */}
            <div>
                <h3>
                    {restaurantDetails?.contact}
                </h3>

                <h3>
                    {restaurantDetails?.address}
                </h3>

                <h3>
                    {restaurantDetails?.city}
                </h3>

                <h3>
                    {restaurantDetails?.email}
                </h3>
            </div>


            {/* Food Items */}
            <div>
                {foodItems.length > 0 ? (

                    foodItems?.map((item) => {

                        const isAdded = addedtItem?.some(
                            (cartItem) =>
                                cartItem?._id === item?._id
                        );

                        return (
                            <div key={item._id}>

                                <img
                                    src={item?.path}
                                    alt={item?.name}
                                />

                                <div>
                                    Name: {item?.name}
                                </div>

                                <div>
                                    Description:{" "}
                                    {item?.description}
                                </div>


                                {isAdded ? (

                                    <button
                                        onClick={() =>
                                            handleRemoveFromCart(item)
                                        }
                                    >
                                        Remove Item
                                    </button>

                                ) : (

                                    <button
                                        onClick={() =>
                                            handleAddToCart(item)
                                        }
                                    >
                                        Add to Cart
                                    </button>

                                )}


                                <hr
                                    style={{
                                        border: "2px solid black",
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


            <Footer />

        </div>
    );
};

export default Page;

