import axios from 'axios'
import React, { useState } from 'react'

const AddFoodItem = (props) => {
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [path, setPath] = useState()
    const [description, setDescritpion] = useState()
    const [error , setError] = useState(false)



    const handleFoodItem = async (e) => {
        console.log("djdjdjdddddddddddddddddddddddddddddddddddddddddddddddddddddddd")

        let restaurantId;
    const resto =JSON.parse(localStorage.getItem("restaurantUser"))
     restaurantId = resto.result._id

     
        if(!name || !price || !path || !description || !restaurantId){
            setError(true)
            return false
            
        }
        else{
            setError(false)
        }
        console.log("djdjdjddddd")
    const response = await axios.post("http://localhost:3000/api/restaurant/foods" , {name , price , path,description , restaurantId})

    if(response.data.success){
        alert("Food Add Successfully")
        props.setItem(false)
    }
    else{
        alert("Food Item Not added")
    }
 }

    return (
        <>
            <div className='container'>

                <h1>Add New Food Item</h1>
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
                <button type='button' className='button' onClick={(e) => handleFoodItem(e)}>Add Food Item</button>
            </div>
        </>
    )
}

export default AddFoodItem