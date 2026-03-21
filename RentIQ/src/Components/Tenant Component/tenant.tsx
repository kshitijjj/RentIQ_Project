import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Tenant(){
    const location=useLocation();
    const navigate=useNavigate();
    const token=location.search.split('=')[1]
    console.log(token);
    const fetchTenant=async()=>{
        try {
            const response=await axios.get(`http://127.0.0.1:3000/Tenant/invite/${token}`);
            const message=response.data.message;
            if(message==='auth')navigate('/auth/signup',{state:{"tenantToken":token}});
            if(message==="success")navigate('/tenant',{state:{"tenantToken":token}});
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchTenant()
    },[])
    return(
        <>

        </>
    )
}

export default Tenant;