'use client'
import CustomerNavbar from '@/components/CustomerNavbar'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [foodDetails , setfoodDetails] = useState([])
  useEffect(()=>{
    getdetails()
  },[])

  const getdetails = async ()=>{
    let id;
    if(JSON.parse(localStorage.getItem("user"))){
      id = JSON.parse(localStorage.getItem("user"))._id
    }
    let response = await fetch('http://localhost:3000/api/order?id='+id)
    if(response.ok){
      response = await response.json()
      if(response.success){
        setfoodDetails(response.result)
      } 
    }
  }

  return (
    <div>
      <CustomerNavbar/>
      <div>
      {foodDetails.map((item ,idx)=>{
        return <div key={idx} className='border border-gray-500 rounded-lg p-2 m-2'>
          <h2 className='text-lg'>{item.data.rastoName}</h2>
          <p>{item.data.address} , {item.data.city}</p>
          <p>Amount : {item.amount}₹</p>
          <p>Status : {item.status}</p>
        </div>
      })}
      </div>
    </div>
  )
}

export default page
