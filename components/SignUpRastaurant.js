
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUpRastaurant = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", varifPass: "", rastoName: "", city: "", address: "", contact: "" })
  const router = useRouter()
  const [error , setError] = useState(false)
  const [passMismatch, setpassMismatch] = useState(false)

  const handleClick = async () => {
    if (!form.name  || !form.email  || !form.password  || !form.varifPass  || !form.rastoName  || !form.city  || !form.address  || !form.contact) {
      setError(true)
    } else {
      if(form.password !== form.varifPass){
        setpassMismatch(true)
      } else {
        let response = await fetch("http://localhost:3000/api/rastaurant", {
          method: "POST",
          body: JSON.stringify(form)
        })
        if(response){
          response = await response.json()
        }
        if (response.success) {
          let result = response.result
          delete result.password
          delete result.varifPass
          localStorage.setItem("rastaurantUser", JSON.stringify(result));
          router.push('/rastaurant/dashboard')
      }
      }
    }
  }
  return (
    <>
      <div className=" w-[400px] mx-auto p-2 rounded-lg mt-5 bg-indigo-50 flex flex-col gap-2">
        <div>
          <input className=' bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' name="name" value={form.name} onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
          }} type="text" placeholder='Enter Your Name' />
          {error && !form.name ? <span className='text-red-500 mx-2'>Invalid Name</span> : ""}
        </div>
        <div>
          <input className=' bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' name="email" value={form.email} onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
          }} type="text" placeholder='Enter Your Email' />
          {error && !form.email ? <span className='text-red-500 mx-2'>Invalid Email</span> : ""}
        </div>
        <div>
          <input className=' bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' name="password" value={form.password} onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
            setpassMismatch(false)
          }} type="text" placeholder='Enter Your Password' />
          {error && !form.password ? <span className='text-red-500 mx-2'>Invalid Password</span> : passMismatch ? <span className='text-red-500 mx-2'>Password Not Matched</span> : ""}
        </div>
        <div>
          <input className=' bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' name="varifPass" value={form.varifPass} onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
            setpassMismatch(false)
          }} type="text" placeholder='Confirm Password' />
          {error && !form.varifPass ? <span className='text-red-500 mx-2'>Invalid Password</span> : passMismatch ? <span className='text-red-500 mx-2'>Password Not Matched</span> : ""}
        </div>
        <div>
          <input className=' bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' name="rastoName" value={form.rastoName} onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
          }} type="text" placeholder='Enter Rastaurant Name' />
          {error && !form.rastoName ? <span className='text-red-500 mx-2'>invalid Rastaurant Name</span> : ""}
        </div>
        <div>
          <input className=' bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' name="city" value={form.city} onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
          }} type="text" placeholder='Enter City' />
          {error && !form.city ? <span className='text-red-500 mx-2'>Invalid City</span> : ""}
        </div>
        <div>
          <input className=' bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' name="address" value={form.address} onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
          }} type="text" placeholder='Enter Full Address' />
          {error && !form.address ? <span className='text-red-500 mx-2'>Invalid Address</span> : ""}
        </div>
        <div>
          <input className=' bg-transparent w-full outline-none  border-b border-slate-500 px-3 p-1' name="contact" value={form.contact} onChange={(e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
          }} type="text" placeholder='Enter Your Phone No' />
          {error && !form.contact ? <span className='text-red-500 mx-2'>Invalid Contact No</span> : ""}
        </div>
        <div>
          <button className='w-full text-center p-1 bg-indigo-500 text-white rounded-lg my-2' onClick={handleClick}>SignUp</button>
        </div>
      </div>
    </>
  )
}

export default SignUpRastaurant


