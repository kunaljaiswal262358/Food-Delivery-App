import React, { useState } from 'react'

const AddFoodItem = (props) => {
    const [food , setfood] = useState({name:"",price:null,imagePath:"",description:""})
    const handleSubmit = async ()=>{
      let userInfo = localStorage.getItem("rastaurantUser")
      userInfo = JSON.parse(userInfo)
      let rasto_id = userInfo._id
        let result = await fetch('http://localhost:3000/api/rastaurant/food' , {
          method:"POST",
          body:JSON.stringify({...food , rasto_id:rasto_id})
        }) 
        if(result){
          result = await result.json()
        }
        if(result.success){
          props.setisDashboard(true)
        }
    }
  return (
    <>
    <h1 className='text-center text-xl mt-8'>Add Food Item</h1>
    <div className='w-[400px] mx-auto p-1 rounded-lg border border-black my-8'>
      <div className='border-purple-500 m-2 border-b-2'>
        <input className='placeholder:text-slate-500 w-full outline-none' type="text" placeholder='Enter Food Name' name='name' value={food.name} onChange={(e)=>setfood({...food , [e.target.name] : e.target.value})}/>
      </div>
      <div className=' border-purple-500 m-2 border-b-2'>
        <input className='placeholder:text-slate-500 w-full outline-none' type="text" placeholder='Enter Price' name='price' value={food.price} onChange={(e)=>setfood({...food , [e.target.name] : e.target.value})}/>
      </div>
      <div className='border-purple-500 m-2 border-b-2'>
        <input className='placeholder:text-slate-500 w-full outline-none' type="text" placeholder='Enter Image Path' name='imagePath' value={food.imagePath} onChange={(e)=>setfood({...food , [e.target.name] : e.target.value})}/>
      </div>
      <div className='border-purple-500 m-2 border-b-2'>
        <input className='placeholder:text-slate-500 w-full outline-none' type="text" placeholder='Enter Description' name='description' value={food.description} onChange={(e)=>setfood({...food , [e.target.name] : e.target.value})}/>
      </div>
      <div className='text-center'>
        <button className='bg-purple-500 rounded-xl px-2 p-1 m-1' onClick={()=>handleSubmit()}>Add Item</button>
      </div>
    </div>
    </>
  )
}

export default AddFoodItem
