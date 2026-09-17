"use client"
import RestaurantHeader from "@/app/_components/RestaurantHeader"
import "../style.css"
import AddFoodItem from "@/app/_components/AddFoodItem"
import { useState } from "react"
import FoodItemList from "@/app/_components/FoodItemList"

const Dashboard = () => {
    const [addItem, setItem] = useState(false)
    return <>
        <div>
            <RestaurantHeader />
            <button onClick={()=>setItem(true)}>Add Food</button>
            <button onClick={()=>setItem(false)}>Dashboard</button>
            {addItem ?
                <AddFoodItem setItem={setItem}/> : <FoodItemList/>
            }


        </div>
    </>
}

export default Dashboard