import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserSignIn = (props) => {
console.log(props , " this is props")
// let redirect  =  props.redirect

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()


    let user = JSON.parse(localStorage.getItem("user"))
    user = user?.data?.result?.email

 
 useEffect(() => {
        if(user){
            router.push('/')
        }
    }, [user])

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            console.log(password, email, " this is name and email form the login page")

            const response = await axios.post("http://localhost:3000/api/user/login", { email, password })

            console.log(response, " this is response of login")

            if (response.data.success) {
                alert("User SignIn successfully")
                delete response?.data?.result?.password
                delete response?.data?.result?.confirmPassword
                localStorage.setItem('user', JSON.stringify(response))

                if(props?.redirect){
                router.push("/order")

                }
                else{
                    router.push('/')
                }

            }
            else {
                alert("Failed to login")
            }
        } catch (error) {
            console.log(error, " this is error from the login page")
        }

    }
  

    return (
        <form>

            <div className='input-wrapper'>
                <input type='text' className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email'></input>
            </div>

            <div className='input-wrapper'>
                <input type='text' className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your name'></input>
            </div>

            <div className='input-wrapper'>
                <button className='button' onClick={(e) => handleSignIn(e)}>SignUP</button>
            </div>
        </form>
    )
}

export default UserSignIn