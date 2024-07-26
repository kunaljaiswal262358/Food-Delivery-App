"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState , useEffect} from 'react'

const RastaurantNavbar = () => {
  const router = useRouter()
  const [details , setDetails] = useState()

  useEffect(() => {
    const userInfo = localStorage.getItem("rastaurantUser")
    if(!userInfo){
      router.push("/rastaurant")
    } else {
      router.push("/rastaurant/dashboard")
      setDetails(JSON.parse(userInfo))
    }
  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem("rastaurantUser")
    setDetails()
    router.push("/rastaurant")
  }
  

  return (
    <div className='flex justify-between p-2 px-10 items-center'>
      <div className="logo ">
        <img width={70} src="http://localhost:3000/foodLogo.jpg" alt="" />
      </div>
      <ul className='flex gap-3'>
        <li>
            <Link className='hover:font-bold' href={"/"}>Home</Link>
        </li>
        <li>
          {details && details.name 
          ? <button onClick={()=>handleLogout()}>Logout</button>  
          :<Link className='hover:font-bold' href={"/"}>Login/SignUp</Link>}
            
        </li>
        <li>
            <Link className='hover:font-bold' href={"/"}>Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default RastaurantNavbar
