"use client"
import CustomerNavbar from '@/components/CustomerNavbar'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { DELIVERY_CHARGE, TAX } from '../lib/constant/extras'
import { useRouter } from 'next/navigation'

const page = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cart"))
    const [carts, setCarts] = useState(cartStorage?cartStorage:undefined) 
    const [totalPrice, settotalPrice] = useState(0)
    const router = useRouter()
    useEffect(()=>{
        let totPrice = 0
        carts.forEach(e => {
            totPrice= totPrice+e.price
        });
        settotalPrice(totPrice)
    } ,[])
    const handleClick = ()=>{
        let userDetails = JSON.parse(localStorage.getItem("user"))
        router.push(userDetails?"/order":"/user-auth?order=true")
    }
  return (
    <div>
      <CustomerNavbar/>
      <h2 className='text-xl text-center my-3 '>Foods Details</h2>
      <div className="carts border border-black rounded-lg p-2 px-5  mx-8">
        {carts && carts.map(item=>{
            return <div key={item.name} className=' flex justify-between'>
                <div>{item.name}</div>
                <div>{item.price}₹</div>
            </div>
        })}
      </div>
      <h2 className='text-lg text-center my-3 '>Other Details</h2>
      <div className="carts border border-black rounded-lg p-2 px-5  mx-8">
        <div className='flex justify-between'>
            <span>Total Foods Amount</span>
            <span>{totalPrice}₹</span>
        </div>
        <div className='flex justify-between'>
            <span>Tax</span>
            <span>{(totalPrice*TAX)/100}₹</span>
        </div>
        <div className='flex justify-between'>
            <span>Delivery Charge</span>
            <span>{DELIVERY_CHARGE}₹</span>
        </div>
        <div className='flex justify-between'>
            <span>Total Amount</span>
            <span>{totalPrice + DELIVERY_CHARGE + (totalPrice*TAX)/100}₹</span>
        </div>
      </div>
        <div className='text-center my-2'>
            <button onClick={handleClick} className='p-1 px-2 bg-yellow-200 rounded-md hover:bg-yellow-300'>Order Now</button>
        </div>
    </div>
  )
}

export default page
