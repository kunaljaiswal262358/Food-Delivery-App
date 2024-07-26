"use client"
import CustomerNavbar from '@/components/CustomerNavbar'
import UserSignUp from '@/components/UserSignUp'
import UserLogin from '@/components/UserLogin'
import React, { useEffect, useState } from 'react'

const page = (props) => {
    const [login , setlogin] = useState(true)
    useEffect(()=>{
      if(props.searchParams.login){
        let toboolean = (val)=>{
          return val === "true"
        }
        setlogin(toboolean(props.searchParams.login))
      }
    } , [props.searchParams])
  return (
    <>
      <CustomerNavbar/>
      {login ? <UserLogin redirect={props.searchParams?.order ? true : false} /> : <UserSignUp redirect={props.searchParams?.order ? true : false}/> }
      <div className='text-center'>
        <button className=' p-1 px-3 text-blue-600' onClick={()=>setlogin(!login)}>{login ? "Do not have account ? Sign Up" : "Already have an  account ? Login"}</button>
      </div>
    </>
  )
}

export default page
