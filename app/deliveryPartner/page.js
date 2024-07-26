"use client"
import DeliveryPartnerLogin from '@/components/DeliveryPartnerLogin'
import DeliveryPartnerNavbar from '@/components/DeliveryPartnerNavbar'
import DeliveryPartnerSignUp from '@/components/deliveryPartnerSignUp'
import { useRouter } from 'next/navigation'
import React, { useState ,useEffect } from 'react'

const page = () => {
    const [login , setlogin] = useState(true)
    const router = useRouter()
    useEffect(()=>{
      let delParData = JSON.parse(localStorage.getItem("deliveryPartner"))
      if(delParData){
          router.push("/deliveryDashboard")
      }
  })
  return (
    <>
    <DeliveryPartnerNavbar/>
      <h2 className='mx-4 text-lg'>Delivery Partners</h2>
      {login ? <DeliveryPartnerLogin/> : <DeliveryPartnerSignUp/>}
      <div className='text-center'>
        <button onClick={()=>setlogin(!login)}>{login ? "Do not have account ? Sign Up" : "Already have account ? Login"}</button>
      </div>
    </>
  )
}

export default page
