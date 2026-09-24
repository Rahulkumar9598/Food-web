"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DeliveryHeader from '../deliveryHeader'

const page = () => {

    const [loginPassword, setLoginPassword] = useState("")
    const [loginPhone, setLoginPhone] = useState("")

    const [name, setName] = useState("");
    const [phone, setphone] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const router = useRouter()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            console.log(name, phone, email, password, city, address, "hit handleSignup function")

            if (password !== confirmPassword) {
                alert("Please enter same password")
                return false
            }
            const response = await axios.post("http://localhost:3000/api/deliveryPartner/signup", { name, phone, email, password, city, address })
            console.log(response, " this is response of api")

            if (response?.data?.success) {
                delete response?.data?.result?.password
                localStorage.setItem("DeliveryPartner", JSON.stringify(response.data.result))
                alert("Delivery Partner Registerd Successfully")
                router.push("/deliveryDashboard")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            console.log(loginPhone, loginPassword, " phone and password")
            const response = await axios.post("http://localhost:3000/api/deliveryPartner/login", { phone: loginPhone, password: loginPassword })
            console.log(response, " this is response of sign in ")
            if (response.data.success) {
                delete response?.data?.result?.password
                localStorage.setItem("DeliveryPartner", JSON.stringify(response.data.result))
                alert("Delivery Partner login Successfully")
                router.push("/deliveryDashboard")
            }

        } catch (error) {
            console.log(error, " this is error from login")
        }

    }


     useEffect(()=>{
            let delivery = JSON.parse(localStorage.getItem("DeliveryPartner"))
            if(delivery){
              router.push("/deliveryDashboard")
            }
        },[])
    return (
        <div>
            <DeliveryHeader />
            <div className='auth-container'>

                <div className='login-wrapper'>
                    <h2>Login</h2>
                    <form>

                        <div className='input-wrapper'>
                            <input type='text' className='input-field' value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} placeholder='enter your phone'></input>
                        </div>
                        <div className='input-wrapper'>
                            <input type='password' className='input-field' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder='enter your password'></input>
                        </div>
                        <div className='input-wrapper'>
                            <button className='button' onClick={(e) => handleSignIn(e)}>SignIn</button>
                        </div>
                    </form>
                </div>

                <div className='signup-wrapper'>
                    <h2>SignUP</h2>

                    <form>
                        <div className='input-wrapper'>
                            <input type='text' className='input-field' value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your name'></input>
                        </div>

                        <div className='input-wrapper'>
                            <input type='text' className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email'></input>
                        </div>

                        <div className='input-wrapper'>
                            <input type='text' className='input-field' value={phone} onChange={(e) => setphone(e.target.value)} placeholder='enter your phone'></input>
                        </div>

                        <div className='input-wrapper'>
                            <input type='password' className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password'></input>
                        </div>

                        <div className='input-wrapper'>
                            <input type='password' className='input-field' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirm password'></input>
                        </div>

                        <div className='input-wrapper'>
                            <input type='text' className='input-field' value={city} onChange={(e) => setCity(e.target.value)} placeholder='enter your city'></input>
                        </div>
                        <div className='input-wrapper'>
                            <input type='text' className='input-field' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='enter your address'></input>
                        </div>
                        <div className='input-wrapper'>
                            <button className='button' onClick={(e) => handleSignup(e)}>SignUP</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>

    )
}

export default page