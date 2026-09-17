"use client";
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation";

const RestaurantSignUp = () => {

    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [c_password, setC_password] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSignup = async () => {

        if (!email || !password || !name || !city || !address || !contact || !c_password) {
            setError(true)
            return false
        }else{
            setError(false)
        }

        if(password != c_password){
            setPasswordError(true)
            return false
        }else{
            setPasswordError(false)
        }


        console.log(email, password, c_password, name, address, contact)

        const response = await axios.post("http://localhost:3000/api/restaurant", { email, password, name, city, address, contact })
        console.log(response, " this is response form the backend")


        if (response.data.success) {
            alert("Restaurant Registared Successfully")
            delete response.data.result.password
            const result = response.data

            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard")

        }
    }

    return (
        <>
            < h3>
                SignUp
            </h3>
            <div>

                <div className="input-wrapper">

                    <input className="input-field" type="text" placeholder="Enter Email id"
                        value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        {error && !email && <span className="input-error">Plaes enter valid email</span>}
                </div>

                <div className="input-wrapper">

                    <input className="input-field" type="password" placeholder="Enter password"
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        {error && !password && <span className="input-error">Plaes enter valid password</span>}

                </div>
                <div className="input-wrapper">

                    <input className="input-field" type="password" placeholder="Confirm password"
                        value={c_password} onChange={(e) => setC_password(e.target.value)}></input>
                        {error && !c_password && <span className="input-error">Plaes enter valid c_password</span>}
                        {passwordError && <span className="input-error"> Confirm passowrd not match</span>}

                </div>
                <div className="input-wrapper">

                    <input className="input-field" type="text" placeholder="Enter Restaurant name"
                        value={name} onChange={(e) => setName(e.target.value)}></input>
                        {error && !name && <span className="input-error"> Plaes enter valid name</span>}

                </div>
                <div className="input-wrapper">

                    <input className="input-field" type="text" placeholder="Enter City"
                        value={city} onChange={(e) => setCity(e.target.value)}></input>
                        {error && !city && <span className="input-error">Plaes enter valid city</span>}

                </div>
                <div className="input-wrapper">

                    <input className="input-field" type="text" placeholder="Enter Full Address"
                        value={address} onChange={(e) => setAddress(e.target.value)}></input>
                        {error && !address && <span className="input-error">Plaes enter valid address</span>}

                </div>
                <div className="input-wrapper">

                    <input className="input-field" type="text" placeholder="Enter Contact No."
                        value={contact} onChange={(e) => setContact(e.target.value)}></input>
                        {error && !contact && <span className="input-error">Plaes enter valid contact</span>}

                </div>
                <div className="input-wrapper">
                    <button onClick={()=>handleSignup()} className="button">Sign Up</button>

                </div>

            </div>
        </>
    )
}

export default RestaurantSignUp