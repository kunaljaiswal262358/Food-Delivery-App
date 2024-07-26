"use client"
import AddFoodItem from "@/components/AddFoodItem"
import RastaurantNavbar from "@/components/RastaurantNavbar"
import FoodItemList from "@/components/FoodItemList"
import { useState } from "react"

const dashboard = () => {
  const [isDashboard , setisDashboard] = useState(true)
  return (
    <div>
      <RastaurantNavbar/>
      <button className="border rounded-lg border-black px-1 mx-2" onClick={()=>setisDashboard(false)}>Add Food Item</button>
      <button className="border rounded-lg border-black px-1 mx-2" onClick={()=>setisDashboard(true)}>Dashboard</button>
      {isDashboard ? <div><FoodItemList/></div> : <AddFoodItem setisDashboard={setisDashboard}/>}
    </div>
  )
}

export default dashboard
