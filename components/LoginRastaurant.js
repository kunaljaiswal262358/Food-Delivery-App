import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

const LoginRastaurant = () => {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const router = useRouter()
  const [error , seterror] = useState(false)
  const [wrongUser , setwrongUser] = useState(false)

  const handleClick = async ()=>{
    if(!email || !password){
      seterror(true)
    } else {
      let response = await fetch('http://localhost:3000/api/rastaurant',{
          method:"POST",
          body:JSON.stringify({email , password , login:true})
      })
      if(response.status === 200){
        response = await response.json()
        console.log(response)
      }
      if(response.success){
        router.push("/rastaurant/dashboard")
        const {result} = response
        delete result.password
        delete result.varifPass
        localStorage.setItem("rastaurantUser",JSON.stringify(result))
      }else{
        setwrongUser(true)
      }
    }

  }
  return (
    <>
    <div className="w-[400px] mx-auto p-2  rounded-xl mt-5 bg-indigo-50 flex flex-col gap-2">
      <div>
        <input className='bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' value={email} onChange={(e)=>setemail(e.target.value) }type="text" placeholder='Enter Your Email'/>
        {error && !email ? <span className='mx-2 text-red-600'>Invalid Email</span> : ''}
      </div>
      <div>
        <input className='bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' value={password} onChange={(e)=>setpassword(e.target.value)} type="text" placeholder='Enter Your Password'/>
        {error && !password ? <span className='mx-2 text-red-600'>Invalid Password</span> : ''}
      </div>
      <div>
        <button className='w-full text-center p-1 bg-indigo-500 text-white rounded-lg my-2' onClick={handleClick}>Login</button>
      </div>
      <div>
        {wrongUser && <span className='text-red-600 mx-2'>Email or Password is wrong</span>}
      </div>
    </div>
    </>
  )
}

export default LoginRastaurant
