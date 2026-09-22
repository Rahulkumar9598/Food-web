"use client"
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditFoodItem = () => {
      const params = useParams();
    console.log(params.id, " Food id mmmmmmmmmmmm")
    const foodId= params.id
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [path, setPath] = useState()
    const [description, setDescritpion] = useState()
    const [error , setError] = useState(false)
    const router = useRouter()

useEffect(()=>{
    LoadfoodItem()
},[])

const LoadfoodItem = async()=>{
    const response = await axios.get("http://localhost:3000/api/restaurant/foods/edit/"+foodId)
    console.log( response , " this is my response")
    if(response.data.success){
        setName(response.data.result.name)
        setPrice(response.data.result.price)
        setPath(response.data.result.path)
        setDescritpion(response.data.result.description)   
    }
}

const handleEditFoodItem = async()=>{
        if(!name || !price || !path || !description || !foodId){
            setError(true)
            return false   
        }
        else{
            setError(false)
        }
        const res= await axios.put("http://localhost:3000/api/restaurant/foods/edit/"+foodId ,{name ,price ,path ,description})

        console.log(res , " this is response from the backend mmmmmmmmmmmmmmmmmmmmmmm")
        if(res.data.success){
            LoadfoodItem()
            alert("Food Item Update Successfully")
            router.push("../dashboard")
        }
}
    return (
        <>
            <div className='container'>

                <h1>Update Food Item</h1>
                <div className='input-wrapper'>
                    <input className='input-field' type='text' placeholder='Enter Food Name'
                        value={name} onChange={(e) => setName(e.target.value)} />
                        {error && !name && <span className='input-error'>Please Enter valid name</span>}
                </div>
                <div className='input-wrapper'>
                    <input className='input-field' type='Number' placeholder='Enter Price Name'
                        value={price} onChange={(e) => setPrice(e.target.value)} />
                        {error && !price && <span className='input-error'>Please Enter valid price</span>}

                </div>
                <div className='input-wrapper'>
                    <input className='input-field' type='text' placeholder='Enter Path Name'
                        value={path} onChange={(e) => setPath(e.target.value)} />
                        {error && !path && <span className='input-error'>Please Enter valid path</span>}

                </div>
                <div className='input-wrapper'>
                    <input className='input-field' type='text' placeholder='Enter Description Name'
                        value={description} onChange={(e) => setDescritpion(e.target.value)} />
                        {error && !description && <span className='input-error'>Please Enter valid description</span>}

                </div>
                <button type='button' className='button' onClick={(e) => handleEditFoodItem(e)}>Update Food Item</button><br></br>
                <br></br>
                <button type='button' className='button' onClick={(e) => router.push(`../dashboard`)}>Back to Food Item List</button>

            </div>
        </>
    )
}

export default EditFoodItem