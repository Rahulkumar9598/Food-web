"use client"
import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function Home() {
  const [locations, setLocations] = useState([])
  const [showlocations, setShowLocations] = useState(false)
  const [selectedlocations, setSelectedLocations] = useState()
  const [restaurants, setRestaurant] = useState([])
  const router = useRouter()






  useEffect(() => {
    loadLocations()
    loadRestaurants()
  }, [])

  const loadLocations = async () => {
    const response = await axios.get("http://localhost:3000/api/customer/locations")
    console.log(response, " this is response of locations")
    if (response.data.success) {
      setLocations(response.data.result)

    }
  }

  const loadRestaurants = async (params) => {

    let url = "http://localhost:3000/api/customer";

    if(params?.location){
      url = url+"?location="+params.location
    }else if(params?.restaurant){
      url = url+"?restaurant="+params.restaurant

    }

    const response = await axios.get(url)
    console.log(response, " this is response of restaurant")

    if (response.data.success) {
      setRestaurant(response.data.result)

    }
  }

  const handlelist = async (item) => {

    setSelectedLocations(item)
    setShowLocations(false)
    loadRestaurants({ location: item })


  }

  return (
    <div>
      <CustomerHeader />
      <div className="main-page-banner">
        < h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input type="text" value={selectedlocations} onClick={() => setShowLocations(true)} className="select-input" placeholder="Select Place" />


          <input type="text" className="search-input" onChange={(e)=>loadRestaurants({restaurant:e.target.value})} placeholder="Enter food" or restaurant />

        </div>
        <ul>

          {
            showlocations && locations.map((item) => (
              <li className="location-list" onClick={() => handlelist(item)}>{item}</li>
            ))
          }
        </ul>

      </div>
      <div className="restaurant-list-container">
        {
          restaurants.map((item) => (
            <div onClick={()=>router.push("restaurantDetails/"+item.name+"?id="+item._id)} className="restaurant-list-wrapper">
              <div className="heading-wrapper">
                <h3>{item.name}</h3>
                <h5>{item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <p>{item.address} , Email : {item.email}</p>
              </div>

            </div>
          ))
        }

      </div>
      <Footer />
    </div>
  );
}
