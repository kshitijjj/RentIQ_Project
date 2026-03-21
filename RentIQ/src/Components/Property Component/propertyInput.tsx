import Input from "../Input";
import type { SubmitHandler } from "react-hook-form";
import type { Inputs } from "../Input";
import axios from "axios";
import { propertyButtonList,PropertyFields } from "./propertyProp";
import type React from "react";
import Heading from "../Heading";
import { useNavigate } from "react-router-dom";


function PropertyInput(){
    const navigate=useNavigate();
    const handleSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response=await axios.post(`http://127.0.0.1:3000/property/add-details`,data,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
            console.log(response.data.message);
            if(response.status===200 || response.status === 201){
                navigate('/property');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        navigate('/');
    }
    propertyButtonList[0].handleClick=handleClick;
    return(
        <>
        <div className="bg-gradient-to-b from-blue-50 to-transparent h-screen w-full flex flex-col md:flex-row items-center justify-center flex-nowrap  ">
                <div className="w-1/2 my-4 md:ml-24">
                    <Heading heading="RentIQ" subHeadingOne="Start managing your rental properties smarter and more efficiently" subHeadingTwo="Add properties, track tenants, and monitor rent payments without the hassle of spreadsheets or paperwork." />
                </div>
                <hr className="h-px my-8 md:w-px md:h-100 bg-gray-300 border-0"></hr>
                <div className="w-1/2 my-4 md:mr-12">
                    <Input inputs={PropertyFields} onsubmit={handleSubmit} buttonList={propertyButtonList} />
                </div>
        </div>
        </>
    )
}

export default PropertyInput;