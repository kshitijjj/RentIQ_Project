import Heading from "../Heading";
import Input from "../Input";
import type { SubmitHandler } from "react-hook-form";
import type { Inputs } from "../Input";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { signupFields,loginFields } from "./authProps";

interface formProps {
    email: string,
    password: string,
    confirmPassword: string,
    role: string
}

function Auth() {
    const location=useLocation();
    const tenantToken=location.state?.tenantToken || "";
    const navigate=useNavigate();
    const path=location.pathname.split('/')[2];


    const onsubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response=await axios.post(`http://127.0.0.1:3000/auth/${path}`,data);
            console.log("auth response data",response.data);
            const token=response.data.token;
            localStorage.setItem("token",token);

            console.log("Auth Tennat token",tenantToken)
            if((response.status===200 || response.status === 201) && tenantToken!==""){
                navigate('/auth/user/profile',{state:{"tenantToken":tenantToken,role:response.data.role}})
            }
            else if(path==="signup" && tenantToken===""){
                navigate('/auth/user/profile',{state:{role:response.data.role}});
            }
            else if(path==="login" && tenantToken===""){
                navigate('/',{state:{role:response.data.role}})
            }
            const token1 = localStorage.getItem("token")
            const decoded = JSON.parse(atob(token1!.split('.')[1]))
            console.log("token userId:", decoded)
        } catch (error) {
            console.log(error);
        }

    }
    const buttonList = [
        {
            css: "text-white my-8 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xs text-sm px-6 py-3 focus:outline-none",
            text: `${path==="signup"?"Sign Up":"Login"}`
        }
    ]

    


    return (
        <>
            <div className="bg-gradient-to-b from-blue-50 to-transparent h-screen w-full flex flex-col md:flex-row items-center justify-center flex-nowrap  ">
                <div className="w-1/2 my-4 md:ml-24">
                    <Heading heading="RentIQ" subHeadingOne="Start managing your rental properties smarter and more efficiently" subHeadingTwo="Add properties, track tenants, and monitor rent payments without the hassle of spreadsheets or paperwork." />
                </div>
                <hr className="h-px my-8 md:w-px md:h-100 bg-gray-300 border-0"></hr>
                <div className="w-1/2 my-4 md:mr-12">
                    <Input onsubmit={onsubmit} onchange={onchange} inputs={path==="signup"?signupFields:loginFields} role={path==="signup"?true:false} buttonList={buttonList} />
                </div>
            </div>
        </>
    )
}

export default Auth;