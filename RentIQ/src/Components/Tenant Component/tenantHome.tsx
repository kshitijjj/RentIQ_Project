import axios from "axios";
import PropertyCard from "../Home Components/Property Components/PropertyCard";
import { useEffect, useState } from "react";
import type {propertyProp} from '../Home Components/Property Components/propertyProps'
import { tenantButtonList } from "./tenantProp";
import { useLocation, useNavigate } from "react-router-dom";
import TenantHomeOne from "./TenantHomeOne";
import Main from "../Home Components/Main";

function TenantHome(){
    const [tenantData,setTenantData]=useState<propertyProp[]>([]);
    const navigate=useNavigate();
    const location=useLocation();   
    const tenantToken=location.state?.tenantToken;
    const fetchData=async()=>{
        const response=await axios.get("http://127.0.0.1:3000/Tenant",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
        console.log(response.data.message);
        const compiledData=response.data.message.map((prop)=>({
            ...prop,
            location:prop.address+ " " + prop.city + " " + prop.pincode,
            propertyName:prop.propertyName,
            propertyDesc:prop.propertyDesc
        }))
        setTenantData(compiledData);
    }
    useEffect(()=>{
        fetchData()
    },[])

    console.log("Tenant Home tenantToken",tenantToken)

    const mainbuttonList=[{
        css: "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xs text-sm px-6 py-3 focus:outline-none",
        text: "Log Out",
        handleClick:()=>{localStorage.removeItem("token");navigate("/auth/login")}
    }]
    return(
        tenantToken!==undefined?(
        <div className="grid grid-cols-1 gap-10 md:p-4 md:grid-cols-2 justify-center items-center">
            {tenantData.map((prop,index)=>(
                <PropertyCard key={index} property={[prop]} buttonList={tenantButtonList} image='../images.jpeg'/>
            ))}
        </div>
        ):<Main 
  titleOne="Add" 
  titleTwo="New Property" 
  HeadingOne="Welcome to RentIQ" 
  HeadingTwo="Tenant Access" 
  subHeading="You are currently logged in as a tenant. This section is designed for landlords and property managers to add and manage their rental properties. Access to property details and lease information will be available once your landlord sends you an invite through email. If you believe you should have landlord access, please use the logout button below to sign in with a different account." 
  buttonList={mainbuttonList} 
/>

    )
}

export default TenantHome;
