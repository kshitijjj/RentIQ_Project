import { OwnerProfileFields,TenantProfileFields,buttonList } from "./profileProps";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../Heading";
import Input from "../Input";
import type { SubmitHandler } from "react-hook-form";
import type { Inputs } from "../Input";
import axios from "axios";

function Profile(){
    const location=useLocation();
    const navigate=useNavigate();
    let role=location.state?.role;
    const tenantToken=location.state?.tenantToken;
    console.log(tenantToken);
    
    const handleSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
        console.log("Profile Tennat token",tenantToken)

            if(role === "Tenant" && !tenantToken){
            navigate('/tenant'); 
            return;
        }

        const apiUrl = role === "Owner" 
            ? `http://127.0.0.1:3000/Owner/profile`
            : `http://127.0.0.1:3000/Tenant/profile?token=${tenantToken}`;
        
        const response = await axios.post(apiUrl, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
            console.log(response.status);
            if(response.status===200){
                if(tenantToken?.length > 0){
                    navigate('/tenant',{state: {tenantToken: tenantToken}})
                }else{
                    navigate('/',{state:{role:role}});
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        <div className="bg-gradient-to-b from-blue-50 to-transparent h-screen w-full flex flex-col md:flex-row items-center justify-center flex-nowrap  ">
                <div className="w-1/2 my-4 md:ml-24">
                    <Heading heading="RentIQ" subHeadingOne="Start managing your rental properties smarter and more efficiently" subHeadingTwo="Add properties, track tenants, and monitor rent payments without the hassle of spreadsheets or paperwork." />
                </div>
                <hr className="h-px my-8 md:w-px md:h-100 bg-gray-300 border-0"></hr>
                <div className="w-1/2 my-4 md:mr-12">
                    <Input buttonList={buttonList} inputs={role==="Owner"?OwnerProfileFields:TenantProfileFields} onsubmit={handleSubmit}/>
                </div>
        </div>
        </>
    )
}

export default Profile;




