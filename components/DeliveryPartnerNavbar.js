import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DeliveryPartnerNavbar = (props) => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem("deliveryPartner")
        router.push("/deliveryPartner")
    }

    return (
        <nav className='flex  items-center justify-between w-[80vw] mx-auto p-2 '>
            <div className="logo">
                <img width={70} src="http://localhost:3000/royal food.jpeg" alt="" />
            </div>
            <ul className='flex gap-3'>
                <li>
                    <button onClick={()=>handleLogout()} className='cursor-pointer hover:font-bold'>Logout</button>
                </li>
                <li>
                    <Link className='cursor-pointer hover:font-bold' href={"/"}>Home</Link>
                </li>

            </ul>
        </nav>
    )
}

export default DeliveryPartnerNavbar
