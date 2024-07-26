"use client"
import CustomerNavbar from '@/components/CustomerNavbar'
import React from 'react'
import { DELIVERY_CHARGE, TAX } from '../lib/constant/extras'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [userDetails, setuserDetails] = useState(user ? user : undefined)
    const foods = JSON.parse(localStorage.getItem("cart"))
    const [carts, setcarts] = useState(foods ? foods : undefined)
    const [totalPrice, settotalPrice] = useState(0)
    const router = useRouter()

    useEffect(() => {
        let totPrice = 0
        if(carts){
            carts.forEach(e => {
                totPrice = totPrice + e.price
            });
            settotalPrice(totPrice)
        }
    }, [])
    const handleClick = async () => {
        let user_id = JSON.parse(localStorage.getItem("user"))._id
        let cart = JSON.parse(localStorage.getItem("cart"))
        let user_city = JSON.parse(localStorage.getItem("user")).city
        let delivery_ids = await fetch("http://localhost:3000/api/deliveryPartner/"+user_city)
        if(delivery_ids.ok){
            delivery_ids = await delivery_ids.json()
            delivery_ids = delivery_ids.ids
        }
        let deliveryBoy_id = delivery_ids[Math.floor(Math.random()*delivery_ids.length)]
        let rasto_id = cart[0].rasto_id
        let foodIds = cart.map(item=>item._id).toString()
        let status = "confirm"
        let amount = totalPrice + DELIVERY_CHARGE + (totalPrice * TAX) / 100
        let response = await fetch('http://localhost:3000/api/order',{
            method:"Post",
            body:JSON.stringify({user_id , rasto_id , foodIds , deliveryBoy_id , status , amount})
        })
        if(response.ok){
            response = await response.json()
            if(response.success){
                localStorage.removeItem("cart")
                router.push("/")
            }else {
                alert("failed")
            }
        }
    }
    return (
        <>
            <CustomerNavbar/>
            <h2 className='text-lg text-center my-2'>User Details</h2>
            {userDetails && <div className="foods border border-gray-400 rounded-lg mx-8 my-3 px-8 p-2">
                <div className='flex justify-between'>
                    <span>Name :</span>
                    <span>{userDetails.name}</span>
                </div>
                <div className='flex justify-between'>
                    <span>Address :</span>
                    <span>{userDetails.address}</span>
                </div>
                <div className='flex justify-between'>
                    <span>Mobile :</span>
                    <span>{userDetails.mobile}</span>
                </div>
            </div>
            }
            <h2 className='text-lg text-center my-2'>Amount Details</h2>
            <div className="foods border border-gray-400 rounded-lg mx-8 my-3 px-8 p-2">
                <div>
                    <div className='flex justify-between'>
                        <span>Total Food Amount :</span>
                        <span>{totalPrice}₹</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Tax :</span>
                        <span>{(totalPrice * TAX) / 100}₹</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Delivery Charges :</span>
                        <span>{DELIVERY_CHARGE}₹</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Total Amount :</span>
                        <span>{totalPrice + DELIVERY_CHARGE + (totalPrice * TAX) / 100}₹</span>
                    </div>
                </div>
            </div>
            <h2 className='text-lg  my-2 mx-10'>payment Methods</h2>
            <div className=" border border-gray-400 rounded-lg mx-8 my-3 px-8 p-2">
                <div className='flex justify-between'>
                    <span>Cash On Delivery</span>
                    <span>{totalPrice + DELIVERY_CHARGE + (totalPrice * TAX) / 100}₹</span>
                </div>
            </div>
            <div className=" text-center m-2">
                <button onClick={handleClick} className='bg-gray-300 rounded-lg p-1 px-3'>Place Your Order Now</button>
            </div>
        </>
    )
}

export default page
