import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation";


const RestaurantLogin = () => {

    const [email , setEmail] = useState()
    const[password , setPassword] = useState()
    const [error , setError] = useState(false)
    const router = useRouter()
    


    const handleLogin = async()=>{
        try {
            if(!email || !password){
            setError(true)
            return false
        }
        else{
            setError(false)
            
        }
        console.log(email , password , " this is email and password")
        const response = await axios.post("http://localhost:3000/api/restaurant" , {email , password ,login:true })
        console.log( response , " this is response of login")
        
         if(response.data.success){

             const result = response.data
             delete result.password
             localStorage.setItem("restaurantUser", JSON.stringify(result));
             
             console.log("lefeekngjenrgjnegrjnejrn")
             router.push("/restaurant/dashboard")
             alert("Login Successfully")


        }else{
            alert("Login failed")
        }
        } catch (error) {
            console.log(error , " this is error from the handlelogin ")    
        }    
    }

    return (
        <>
            < h1>
                Restaurant Login 
            </h1>
            <div>
                <div className="input-wrapper">

                    <input className="input-field" type="text" placeholder="Enter Email id"
                     value={email} onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                    {error && !email && <span className="input-error">please enter valid email</span>}
                </div>
                <div className="input-wrapper">

                    <input className="input-field" type="password" placeholder="Enter password"
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                    {error && !password && <span className="input-error">please enter valid password</span>}

                </div>
            </div>

           <div className="input-wrapper">
                 <button onClick={()=>handleLogin()} className="button">
                Sign in
            </button> </div>
        </>
    )
}

export default RestaurantLogin