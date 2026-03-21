import axios from "axios";
import PropertyCard from "./PropertyCard";
import {type propertyProp} from './PropertyCard';
import { propbuttonList } from "./propertyProps";
import { useEffect, useState } from "react";
import Modal from "../../Modal Component/Modal";
import type { SubmitHandler } from "react-hook-form";
import type { Inputs } from "../Input";
import { buttonList } from "../homeProps";
import { useNavigate } from "react-router-dom";
import Button from "../../button";
import {button} from './propertyProps';

function Properties({handleLogout}:{handleLogout:()=>void}){
    const [istoken,setistoken]=useState<string | null>(localStorage.getItem("token"));
    const [propertyData,setPropertyData]=useState<propertyProp[]>([]);
    const [showModal,setshowmodal]=useState<boolean>(false);
    const [propertyId,setpropertyId]=useState<string>("");

    const fetchData=async()=>{
        const res=await axios.get('http://127.0.0.1:3000/property/details',{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
        console.log(res.data.message);
        const compiledData=res.data.message.map((prop)=>({
            ...prop,
            location:prop.address+ " " + prop.city + " " + prop.pincode,
        }))
        setPropertyData(compiledData);
    }

    button[0].handleClick=()=>navigate('/add/property');
    button[1].handleClick=()=>handleLogout();

    useEffect(()=>{
        fetchData()
    },[istoken])

    const navigate=useNavigate();

    return(
        <>
            <div className="bg-gradient-to-b from-blue-50 to-transparent">
            {showModal?(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <Modal propertyId={propertyId} showModal={showModal} handleSubmit={()=>setshowmodal(false)}/>
                </div>
            ):null}

            <div className="flex flex-row justify-center items-center py-10">
                <Button buttonList={button} />
            </div>

            <div className="grid grid-cols-1 gap-10 md:p-4 md:grid-cols-2 justify-center items-center">
                {propertyData.map((prop,index)=>{
                    const buttonList=[...propbuttonList];
                    buttonList[0]={
                        ...buttonList[0],
                        handleClick:()=>{
                            setpropertyId(prop._id);
                            setshowmodal(true);
                        }
                    }
                    buttonList[1]={
                        ...buttonList[1],
                        handleClick:async ()=>{
                            setpropertyId(prop._id);
                            const tenantId=prop.tenant[0];
                            await axios.get(`http://127.0.0.1:3000/Tenant/rent/${tenantId}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
                            navigate(`/property/${prop._id}/detail`)
                        }
                    }
                    return(
                        <>
                    <PropertyCard key={index} image='../images.jpeg'  property={[prop]} buttonList={buttonList}/>
                    </>
                    )
            })}
            </div>
        </div>
        </>
    )
}
export default Properties;