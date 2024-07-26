"use client"
import CustomerNavbar from '@/components/CustomerNavbar'
import React, { useEffect, useState } from 'react'

const Details = (props) => {
  const [rastoDetails, setrastoDetails] = useState([])
  const [rastoFoods, setrastoFoods] = useState([])
  const [addedCart, setaddedCart] = useState([])
  const [addedCartIds, setaddedCartIds] = useState([])
  useEffect(() => {
    loadRastoDetails()
    // addCart()
  }, [])

  useEffect(() => {
    let cartData = JSON.parse(localStorage.getItem("cart"))
    if(cartData){
      let ids = cartData.map(item=>{
        return item._id
      })
      setaddedCart(cartData)
      setaddedCartIds(ids)
    }
  }, [])
  

  const addCart = (item)=>{
    let carts = JSON.parse(localStorage.getItem("cart"))
    let currRastoId;
    if(carts){
      currRastoId=carts[0].rasto_id
    }
    if(item.rasto_id === currRastoId || !currRastoId){
      setaddedCart([...addedCart , item])
      setaddedCartIds([...addedCartIds , item._id])
      localStorage.setItem("cart",JSON.stringify([...addedCart , item]))
    } else {
      setaddedCart([item])
      setaddedCartIds([item._id])
      localStorage.setItem("cart",JSON.stringify([item]))
    }
  }

  const removeCart = (item)=>{
    let newCarts = addedCart.filter(e=>{
      return e._id !==item._id
    })
    let newIds = addedCartIds.filter(id=>{
      return id !== item._id
    })
    setaddedCart(newCarts)
    setaddedCartIds(newIds)
    localStorage.setItem("cart",JSON.stringify(newCarts))
    if(newCarts.length === 0){
      localStorage.removeItem("cart")
    }
  }

  const loadRastoDetails = async () => {
    let _id = props.searchParams._id
    let response = await fetch('http://localhost:3000/api/customer/details/' + _id)
    if (response.ok) {
      response = await response.json()
      setrastoDetails(response.rastoInfo)
      setrastoFoods(response.rastoFoods)
    }
  }

  return (
    <div>
      <CustomerNavbar addedCart = {addedCart} />
      <div className="banner h-40 border w-[95vw] mx-auto rounded-lg relative bg-yellow-200 ">
        <h1 className="text-center text-2xl my-8 text-sky-950"> {decodeURI(props.params.name)}</h1>
        <div className='flex justify-between px-6 absolute bottom-2 w-full text-cyan-800'>
          <div>
            <p>Contact : {rastoDetails.contact}</p>
            <p>email : {rastoDetails.email}</p>
          </div>
          <div>
            <span>{rastoDetails.address}</span>
            <span > , {rastoDetails.city}</span>
          </div>
        </div>
      </div>
      <div className="rastoListBox flex justify-center flex-wrap w-[90vw] mx-auto gap-5 my-8">
        {rastoFoods.length > 0 ? rastoFoods.map(item => {
          return <div key={item.name} onClick={() => { }} className='rastoCard border border-black rounded-lg p-1 px-2 w-60 h-32 bg-yellow-200 hover:cursor-pointer'>
            <div className=" flex justify-between items-center">
              <div>
                <h2 className="text-xl">{item.name}</h2>
                <div className="">
                  <div>Price : {item.price}₹</div>
                  <div>{item.description}</div>
                </div>
              </div>
              <div>
                <img width={70} src={item.imagePath} alt="" />
              </div>
            </div>
            <div className='text-center'>
              {addedCartIds.includes(item._id) ? <button onClick={()=>{removeCart(item)}} className='bg-yellow-600 text-yellow-100 p-1 px-2 rounded-full my-2'>Remove to Cart</button> 
              : <button onClick={()=>addCart(item)} className='bg-yellow-600 text-yellow-100 p-1 px-2 rounded-full my-2'>Add to Cart</button>
              }
              
            </div>
          </div>

        })
          : <span>No Result Found</span>
        }
      </div>
    </div>
  )
}

export default Details
