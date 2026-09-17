import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const FoodItemList = () => {

    const [fooditems, setFooditem] = useState()
    const router = useRouter()


    useEffect(() => {
        fooditem()
    }, [])

    const fooditem = async () => {

        const restaurant = JSON.parse(localStorage.getItem("restaurantUser"))
        console.log(restaurant, " this is restaurant")

        const restaurantId = restaurant?.result._id
        const response = await axios.get(`http://localhost:3000/api/restaurant/foods/${restaurantId}`);
        console.log(response, " this is response form the backend")
        if (response.data.success) {
            setFooditem(response.data.result)
        }
    }

    const handleDelete = async (index) => {
        const response = await axios.delete(`http://localhost:3000/api/restaurant/foods/${index}`)
        console.log(response, "gggggggggggggggg")

        if (response.data.success) {
            fooditem()
            alert("Food item deleted successfully")
        }
        else {
            alert("Food item is not delete")
        }
    }

    return (
        <>

            <div>
                <h1>Food Items</h1>
                <table>
                    <thead>
                        <tr>
                            <td>S.NO</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Description</td>
                            <td>Image</td>
                            <td>Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                        {fooditems?.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td ><img src={item?.path}></img></td>
                                <td><button onClick={() => handleDelete(item._id)}>Delete</button>
                                    <button onClick={() => router.push(`dashboard/${item._id}`)}>Edit</button></td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FoodItemList