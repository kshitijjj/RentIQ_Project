import { useState } from "react";
import { buttonList, LoginButtonList } from "./homeProps";
import Main from "./Main";
import { useNavigate, useSearchParams } from "react-router-dom";
import Properties from "./Property Components/Properties";
import { useEffect } from "react";
import axios from "axios";

function Home() {
    const [token1,settoken1]=useState<string | null>(localStorage.getItem("token"));
    const [properties,setproperties]=useState<boolean>(false);
    const fetchData=async()=>{
        const res=await axios.get('http://127.0.0.1:3000/property/details',{headers:{Authorization:`Bearer ${token1}`}});
        if(res.data.message.length > 0){
            setproperties(true)
        }
    }
    useEffect(()=>{
        fetchData()
    },[token1])

    const navigate = useNavigate();
    const handleSubmit = async (index) => {
        if (index == 0) navigate('/auth/signup');
        else if (index == 1) navigate('/auth/login');
    }
    const button=buttonList.map((btn)=>({
        ...btn,
        handleClick:handleSubmit
    }))

    
    const loginButton=LoginButtonList.map((btn,index:number)=>{
        if(index===0){
            return{
                ...btn,
                handleClick:()=>navigate('/add/property')
            }
        }
        else if(index===1){
            return{
                ...btn,
                handleClick:()=>{
                    localStorage.removeItem("token")
                    settoken1(null);
                }
            }
        }
    })
    return (
        <>
        {token1 && !properties && <Main titleOne="Add" titleTwo="New Property" HeadingOne="Get Started with RentIQ" HeadingTwo="Enter Property Details to Continue" subHeading="Add your property information to RentIQ to begin organizing and managing your rental operations in a simple and structured way. Once your property is added, you will be able to manage tenants, keep track of rental details, and maintain important property records from one centralized dashboard. RentIQ helps streamline everyday property management tasks so that landlords can stay organized, save time, and handle their rental properties more efficiently." buttonList={loginButton} />}

        {!token1 && !properties && <Main titleOne="Introducing" titleTwo="Smart Property Management" HeadingOne="RentIQ" HeadingTwo="Smarter Way to Manage Rental Properties" subHeading="RentIQ is a modern property management platform that helps landlords organize properties, manage tenants, 
            and track rental information in one centralized dashboard. Built with simplicity and efficiency in mind,it streamlines everyday rental operations and keeps everything structured and easy to manage." buttonList={button} />}

        {token1 && properties && <Properties handleLogout={()=>{
            localStorage.removeItem("token");
            settoken1(null)
            setproperties(false);
        }} />}
        </>
    )
}

export default Home;