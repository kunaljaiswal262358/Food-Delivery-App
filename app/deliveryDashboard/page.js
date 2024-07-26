"use client"
import DeliveryPartnerNavbar from '@/components/DeliveryPartnerNavbar'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const deliveryDashboard = () => {
    const [foodDetails, setfoodDetails] = useState()
    const [deliveryPartnerDetails, setdeliveryPartnerDetails] = useState([])
    const router = useRouter()
    useEffect(() => {
        let delParData = JSON.parse(localStorage.getItem("deliveryPartner"))
        if (!delParData) {
            router.push("/deliveryPartner")
        }
        getFooddetails()
        getDeliverypartDetails()
    }, [])

    const getFooddetails = async () => {
        let id;
        if (JSON.parse(localStorage.getItem("deliveryPartner"))) {
            id = JSON.parse(localStorage.getItem("deliveryPartner"))._id
        }
        let response = await fetch('http://localhost:3000/api/deliveryPartner/order/' + id )
        if (response.ok) {
            response = await response.json()
            if (response.success) {
                setfoodDetails(response.result)
            }
        }
    }

    const getDeliverypartDetails = () => {
        if (JSON.parse(localStorage.getItem("deliveryPartner"))) {
            let deliveryPartner = JSON.parse(localStorage.getItem("deliveryPartner"))
            setdeliveryPartnerDetails(deliveryPartner)
        }
    }

    const handleChange = async (e, id) => {
        let order_id = id;
        let response = await fetch('http://localhost:3000/api/deliveryPartner/updateStatus/' + order_id, {
            method: "PUT",
            body: JSON.stringify(e.target.value)
        })
        if (response.ok) {
            response = await response.json()
            if (response.success) {
                getFooddetails()
            }
        }
    }

    const handleClick = async (status, id) => {
        if (status === "Delivered" || status === "Failed") {
            // let response = await fetch('http://localhost:3000/api/deliveryPartner/order/' + id, {
            //     method: "Delete"
            // })
            // if (response.ok) {
            //     response = response.json()
            //     if (response.success) {
            //         getFooddetails()
            //     }
            // }
            let newDetails = foodDetails.filter(item=>{
                return item.order_id !== id
            })
            setfoodDetails(newDetails)
        }
    }

    return (
        <>
            <DeliveryPartnerNavbar />
            <h2 className='text-xl text-center mx-4 my-2'>Delivery Partner Dashboard</h2>
            <div className='mx-4 my-2'>
                <div className='text-lg'>Delivery Partner : {deliveryPartnerDetails.name}</div>
                <div className='text-lg'>Mobile : +91 {deliveryPartnerDetails.mobile}</div>

            </div>
            <div className="divider h-[1px] mx-2 bg-slate-500"></div>
            <h2 className='text-xl mx-4 my-2'>Orders Details</h2>
            <div>
                {foodDetails && foodDetails.map((item, idx) => {
                    return <div key={idx} className='border border-gray-500 rounded-lg p-2 m-2 flex justify-between'>
                        <div>
                            <h2 className='text-lg'>{item.data.rastoName}</h2>
                            <p>{item.data.address} , {item.data.city}</p>
                            <p>Amount : {item.amount}₹</p>
                            <p>Status : {item.status}</p>
                            <div>
                                <span>Update Status</span>
                                <select className='border border-gray-400 mx-3 rounded-md outline-none' name="" id="" onChange={(e) => handleChange(e, item.order_id)}>
                                    <option value="confirm">Confirm</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-lg'>Customer Name : {item.userData.name}</h2>
                            <p>Address : {item.userData.address} , {item.userData.city}</p>
                            <p>Mobile : {item.userData.mobile}₹</p>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default deliveryDashboard