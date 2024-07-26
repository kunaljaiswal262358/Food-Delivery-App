"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomerNavbar from "@/components/CustomerNavbar";

export default function Home() {
  const [locations, setlocations] = useState([])
  const [showLocation, setshowLocation] = useState(false)
  const [place, setplace] = useState("")
  const [rastoList, setrastoList] = useState([])
  const router = useRouter()

  useEffect(() => {
    loadLocation()
    loadRastaurant()
  }, [])

  const loadLocation = async () => {
    let response = await fetch('http://localhost:3000/api/customer/location')
    if (response.ok) {
      response = await response.json()
      setlocations(response.locations)
    }
  }

  const fillLocation = (item) => {
    if (item) {
      setplace(item)
    }
    setshowLocation(false)
    loadRastaurant({location:item})
  }

  const loadRastaurant = async (params) => {
    let url = 'http://localhost:3000/api/customer'
    if (params?.location) {
      url = 'http://localhost:3000/api/customer?location=' + params.location
    } else if(place && params?.rastaurant){
      url = 'http://localhost:3000/api/customer?location=' + place + "&rastaurant=" + params.rastaurant
    } else if (params?.rastaurant) {
      url = 'http://localhost:3000/api/customer?rastaurant=' + params.rastaurant
    }
    let response = await fetch(url)
    if (response.ok) {
      response = await response.json()
      setrastoList(response.result)
    }
  }
  return (
    <>  
    <CustomerNavbar/>
      <h1 className="text-3xl my-4 mb-8 text-center text-cyan-950">Royal Food</h1>
      <div className="banner h-80 relative my-4">
        <img className=" -z-10 w-[90vw] h-80 rounded-lg absolute left-[5vw]" src="https://img.freepik.com/premium-photo/photo-closeup-shot-delicious-food_829042-89.jpg" alt="" />
        <div className="input-wrapper h-80 flex justify-center items-center bg-white bg-opacity-10 w-[92vw] mx-auto p-4 relative ">
          <input onFocus={() => {
            setshowLocation(true)
          }} value={place} onChange={(e) =>{ 
            setplace(e.target.value)
          }} className="focus:outline-none h-8 rounded-md p-2 mx-2 w-40" type="text" placeholder="Place" />
          <input className="focus:outline-none h-8 rounded-md p-2 mx-2 w-[60vw]" onChange={(e) => {loadRastaurant({rastaurant: e.target.value})}} type="text" placeholder="Rastaurant" />
          {showLocation && <div className="locations absolute w-40 left-6 top-44 h-30 overflow-auto overflow-x-hidden">
            <ul className="text-white bg-slate-500 rounded-lg p-2">
              {locations?.map(item => {
                return <li key={item} onClick={() => {
                  fillLocation(item)
                }} className="cursor-pointer my-1 hover:font-bold" >{item}</li>
              })
              }
            </ul>
          </div>
          }
        </div>
      </div>
      <div className="rastoListBox flex justify-center flex-wrap w-[90vw] mx-auto gap-5 my-8">
      {rastoList.length>0 ? rastoList.map(item => {
        return <div key={item.name} onClick={()=>router.push("details/"+item.rastoName+"?_id="+item._id)} className="rastoCard border border-black rounded-lg p-1 px-2 w-60 h-28 bg-lime-100 hover:cursor-pointer hover:bg-slate-300">
            <h2 className="text-xl">{item.rastoName}</h2>
            <div className="flex gap-1">
              <span>{item.address}</span>
              <span>, {item.city}</span>
            </div>
            <p>Contact : {item.contact}</p>
          </div>
      
      })
    : <span>No Result Found</span>
    }
      </div>
      
    </>
  );
}
