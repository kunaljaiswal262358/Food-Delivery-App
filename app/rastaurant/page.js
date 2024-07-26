"use client"
import LoginRastaurant from "@/components/LoginRastaurant";
import RastaurantNavbar from "@/components/RastaurantNavbar";
import SignUpRastaurant from "@/components/SignUpRastaurant";
import { useState } from "react";

const rastaurant = () => {
    const [login, setlogin] = useState(true)
    return (
        <>
            <RastaurantNavbar />
            <div className="">
                <h3 className="text-xl m-2 text-center">Rastaurant</h3>
                {login ? <LoginRastaurant /> : <SignUpRastaurant />}
                <div className="text-center">
                    <button className="text-lg text-blue-500 " onClick={() => setlogin(!login)}>{login ? "Do not have Account ? SignUp" : "Already have Account ? Login"}</button>
                </div>
            </div>
        </>
    )
}

export default rastaurant;