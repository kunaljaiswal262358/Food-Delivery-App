import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const userSignUp = (props) => {
    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [mobile, setmobile] = useState("")
    const [error, setError] = useState(false)
    const [passMismatch, setpassMismatch] = useState(false)
    const router = useRouter()

    const handleClick = async () => {
        if(!name || !email || !password || !confirmPassword || !address || !city || !mobile ){
            setError(true)
        } else if(password !== confirmPassword){
            setpassMismatch(true)
        }else {
            let response = await fetch("http://localhost:3000/api/user" ,{
                method:"post",
                body:JSON.stringify({name , email , password , address , city , mobile})
            })
            if(response.ok){
                response = await response.json()
                if(response.success){
                    localStorage.setItem("user",JSON.stringify(response.result))
                    router.push(props.redirect ? "/order" : "/")
                }
            }
        }
    }

  return (
    <div>

      <h1 className='text-center my-2 text-lg'>Sign Up </h1>
      <div className='text-center my-1 relative' >
        <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="text" onChange={(e) => setname(e.target.value)} value={name} placeholder='Enter Name' />
        {error && !name && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid Name</span> }
      </div>
      <div className='text-center my-1 relative'>
        <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
        {error && !email && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid Email</span> }
      </div>
      <div className='text-center my-1 relative'>
        <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="password" onChange={(e) =>{
            setPassword(e.target.value)
            setpassMismatch(false)
            }} value={password} placeholder='Enter Password' />
        {error && !password && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid Password</span> }
        {passMismatch && <span className='absolute mx-2 text-base top-1 text-red-600'>Password Mismatch</span> }
      </div>
      <div className='text-center my-1 relative'>
        <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="password" onChange={(e) =>{
            setConfirmPassword(e.target.value)
            setpassMismatch(false)
        }} value={confirmPassword} placeholder='Confirm Password' />
        {error && !confirmPassword && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid Confirm Password</span> }
        {passMismatch && <span className='absolute mx-2 text-base top-1 text-red-600'>Password Mismatch</span> }
      </div>
      <div className='text-center my-1 relative'>
        <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="text" onChange={(e) => setAddress(e.target.value)} value={address} placeholder='Enter Address' />
        {error && !address && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid Address</span> }
      </div>
      <div className='text-center my-1 relative'>
        <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder='Enter City' />
        {error && !city && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid City Name</span> }
      </div>
      <div className='text-center my-1 relative'>
        <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="text" onChange={(e) => setmobile(e.target.value)} value={mobile} placeholder='Enter Mobile' />
        {error && !mobile && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid Mobile No</span> }
      </div>
      <div className='text-center'>
        <button className=' p-1 px-3 my-2 rounded-xl bg-gray-400' onClick={() => handleClick()}>Submit</button>
      </div>

    </div>
  )
}

export default userSignUp
