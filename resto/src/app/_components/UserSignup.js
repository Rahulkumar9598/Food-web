import axios from 'axios';
// import { register } from 'next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const UserSignup = (props) => {
    console.log(props, " this is props")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const router = useRouter()


    const handleSignup = async (e) => {
        e.preventDefault()
        console.log(name, email, password, confirmPassword, city, address)

        const response = await axios.post("http://localhost:3000/api/user", { name, email, password, confirmPassword, city, address })

        if (response.data.success) {
            alert("User registerd successfully")
            localStorage.setItem('user', JSON.stringify(response))

            if (props.redirect) {
                router.push('/order')

            }else{
                router.push('/')
            }

        }
        else {
            alert("Failed")
        }

        console.log(response, " this is response of api")
    }
    return (
        <form>
            <div className='input-wrapper'>
                <input type='text' className='input-field' value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your name'></input>
            </div>
            <div className='input-wrapper'>
                <input type='text' className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email'></input>
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
    )
}

export default UserSignup