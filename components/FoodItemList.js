import { useRouter } from 'next/navigation'
import React from 'react'
import { useState , useEffect} from 'react'

const FoodItemList = () => {
    const [items, setitems] = useState([])
    const [rastoName , setrastoName] = useState("")
    const router = useRouter()

    useEffect(() => {
      getFoodItems()
      let rastoUserInfo = localStorage.getItem("rastaurantUser")
      rastoUserInfo = JSON.parse(rastoUserInfo)
      let rastoName = rastoUserInfo.rastoName
        setrastoName(rastoName)
    }, [])
    

    const getFoodItems = async () => {
        let rastoUserInfo = localStorage.getItem("rastaurantUser")
        rastoUserInfo = JSON.parse(rastoUserInfo)
        let _id = rastoUserInfo._id
        let response = await fetch("http://localhost:3000/api/rastaurant/food/"+_id)
        if(response){
            response = await response.json()
        }
        if(response.success){
            setitems(response.result)
        }
    }

    const handleEdit = async (_id) =>{
        router.push("./../rastaurant/dashboard/"+_id)
    }

    const handleDelete = async (_id) =>{
        let response = await fetch("http://localhost:3000/api/rastaurant/food/"+_id , {
            method:"DELETE",
        })
        if(response.ok){
            response = await response.json()
        }
        if(response.success){
            getFoodItems()
        }
    }

    return (
        <div className='my-8'>
            <h1 className='text-center text-2xl my-2 font-bold text-gray-500'>{rastoName}</h1>
            <table className="table-fixed mx-auto p-2 w-[800px] border border-black rounded-xl text-center"  border={0}>
                <thead>
                    <tr className='h-[60px] bg-gray-400 text-white'>
                        <th>No.</th>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {items.map((item, idx) => {
                        return <tr className='h-[60px] border border-slate-500' key={idx}>
                            <td>{idx+1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><img className='mx-auto rounded-lg' width={50} src={item.imagePath} alt="error" /> </td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={()=>handleEdit(item._id)} className='bg-gray-300 rounded-xl px-2 p-1 m-1 hover:bg-gray-400'>Edit</button>
                                <button onClick={()=>handleDelete(item._id)} className='bg-gray-300 rounded-xl px-2 p-1 m-1 hover:bg-gray-400'>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemList
