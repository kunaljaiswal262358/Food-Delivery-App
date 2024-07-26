import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CustomerNavbar = (props) => {
    const [addedCart, setaddedCart] = useState([])
    const [userData, setuserData] = useState()
    const router = useRouter()
    useEffect(() => {
        let carts = JSON.parse(localStorage.getItem('cart'))
        let user = JSON.parse(localStorage.getItem("user"))
        if (carts) {
            setaddedCart(carts)
        } else {
            setaddedCart([])
        }
        if (user) {
            setuserData(user)
        } 
    }, [props.addedCart])

    const handleLogout = () =>{
        localStorage.removeItem("user")
        setuserData()
        router.push("/user-auth")
    }

    return (
        <nav className='flex  items-center justify-between w-[80vw] mx-auto p-2 '>
            <div className="logo">
                <img width={70} src="http://localhost:3000/royal food.jpeg" alt="" />
            </div>
            <ul className='flex gap-3'>
                <li>
                    <Link className='cursor-pointer hover:font-bold' href={"/"}>Home</Link>
                </li>
                {userData ?
                    <li>
                        <button onClick={()=>handleLogout()} className='cursor-pointer hover:font-bold'>Logout</button>
                    </li>
                    : <>
                        <li>
                            <Link className='cursor-pointer hover:font-bold' href={"/user-auth?login=true"}>Login</Link>
                        </li>
                        <li>
                            <Link className='cursor-pointer hover:font-bold' href={"/user-auth?login=false"}>Sign Up</Link>
                        </li>
                    </>
                }
                <li>
                    <Link className='cursor-pointer hover:font-bold' href={addedCart.length > 0 ? "/cart" : "#"}>Cart({addedCart.length})</Link>
                </li>
                <li>
                    <Link className='cursor-pointer hover:font-bold' href={"/deliveryPartner"}>Delivery Partner</Link>
                </li>
                <li>
                    <Link className='cursor-pointer hover:font-bold' href={"/rastaurant"}>Rastaurant</Link>
                </li>
                {userData && <li>
                    <Link className='cursor-pointer hover:font-bold' href={"/profile"}>{userData.name}</Link>
                </li> }
            </ul>
        </nav>
    )
}

export default CustomerNavbar
