"use client"
import { useRouter } from 'next/navigation'
import React, { useState , useEffect} from 'react'

const updateFood = (props) => {
  const [food , setfood] = useState({name:"",price:null,imagePath:"",description:""})
  const router = useRouter()

  const fillDetails = async (_id)=>{
    let foodInfo = await fetch('http://localhost:3000/api/rastaurant/food/edit/'+_id)
    foodInfo = await foodInfo.json()
    const result = foodInfo.result
    setfood({...food , name:result.name , price:result.price , imagePath:result.imagePath , description:result.description})
  }
  useEffect(() => {
    fillDetails(props.params.id)
  }, [])
  

    const handleSubmit = async ()=>{
      let _id = props.params.id
        let result = await fetch('http://localhost:3000/api/rastaurant/food/edit/'+_id , {
          method:"PUT",
          body:JSON.stringify(food)
        }) 
        console.log(food)
        if(result){
          result = await result.json()
        }
        console.log(result)
        if(result.success){
          router.push("/rastaurant/dashboard")
        }
    }
  return (
    <>
    <h1 className='text-center text-xl mt-8'>Update Food Item</h1>
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
        <button className='bg-purple-500 rounded-xl px-2 p-1 m-1' onClick={()=>handleSubmit()}>Update Food</button>
      </div>
      <div className='text-center'>
        <button className='border border-black rounded-xl px-2 p-1 m-1' onClick={()=>router.push("/rastaurant/dashboard")}>Back to Dashboard Food</button>
      </div>
    </div>
    </>
  )
}

export default updateFood
