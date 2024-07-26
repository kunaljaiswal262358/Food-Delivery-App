import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeliveryPartnerLogin = (props) => {
    const [mobile, setmobile] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState(false)
    const router = useRouter()
    const handleClick = async () => {
        
        if(!mobile || !password){
            seterror(true)
        } else {
            let response = await fetch("http://localhost:3000/api/deliveryPartner/login" ,{
                method:"post",
                body:JSON.stringify({mobile , password})
            })
            if(response.ok){
                response = await response.json()
                if(response.success){
                    localStorage.setItem("deliveryPartner",JSON.stringify(response.result))
                    router.push("/deliveryDashboard")
                }else {
                    alert('password or Mobile is wrong')
                }
            }
        }
    }
    return (
        <div>
            <h1 className='text-center my-2 text-lg'>Login</h1>
            <div className='text-center my-1 relative'>
                <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="text" onChange={(e) => setmobile(e.target.value)} value={mobile} placeholder='Enter Mobile' />
                {error && !mobile && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid Mobile</span> }
            </div>
            <div className='text-center my-1 relative'>
                <input className='outline-none border border-gray-400 rounded-lg p-1 px-3' type="password" onChange={(e) => setpassword(e.target.value)} value={password} placeholder='Enter Password' />
                {error && !password && <span className='absolute mx-2 text-base top-1 text-red-600'>Invalid Password</span> }
            </div>
            <div className='text-center'>
                <button className=' p-1 px-3 my-2 rounded-xl bg-gray-400' onClick={() => handleClick()}>Submit</button>
            </div>
        </div>
    )
}

export default DeliveryPartnerLogin

