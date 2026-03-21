import Table from "./table";
import { tableHeading, tableData } from "./props";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {useLocation } from "react-router-dom";
import RentHistory from "./RentHistory";
import { createContext } from "react";
export const dataContext=createContext(null);


function PropertyDetail() {
    const [rentstatus,setrentstatus]=useState<string>("Pending");
    const [eachProperty, setEachProperty] = useState<cardProp[]>([]);
    const [tenantDetail,setTenantDetails]=useState([]);
    const location = useLocation();
    const propertyId = location.pathname.split('/')[2];

    const fetchData = async () => {
        const response = await axios.get(`http://127.0.0.1:3000/property/details/${propertyId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        const data = [response.data.message];
        const tenant=response.data.message.tenant;

        const compiledData = data.map((prop) => ({
            ...prop,
            propertyName: prop.propertyName,
            propertyDesc: prop.propertyDesc,
            location: prop.address + " " + prop.city + " " + prop.pincode
        }))
        const rent=response.data.message.rent.toLocaleString('en-IN');
        console.log(rentstatus)
        const compiledTableData = tenant.map((prop,index) => {

            const date = new Date(prop.joinedAt);
            const presentDate=new Date(Date.now());
            const pmonth=presentDate.toLocaleString('en-US', { month: 'short' });
            const pyear = presentDate.getFullYear();
            const month = date.toLocaleString('en-US', { month: 'short' });
            const year = date.getFullYear();

            return{
            ...prop,
            name: prop.firstName.charAt(0).toUpperCase()+prop.firstName.slice(1) + " " + prop.lastName.charAt(0).toUpperCase()+prop.lastName.slice(1),
            email:prop.tenantId.email,
            age:prop.age,
            occupation:prop.occupation.charAt(0).toUpperCase()+prop.occupation.slice(1),
            joinedAt:`${month}-${year}`,
            rent:rent,
            currentMonth:`${pmonth}-${pyear}`,
            rentstatus: prop.rentDetails.map((data) => {
    if(data.month === `${pmonth}-${pyear}`) return data.rentstatus
}) || "Pending",
            totalAmountPaid:((presentDate.getFullYear()-date.getFullYear())*12+(presentDate.getMonth()-date.getMonth()))*rent
            }
        })
        setTenantDetails(compiledTableData);
        setEachProperty(compiledData);
    }
    const handleSubmit=async(id:any,month:string)=>{
        try {
            const response=await axios.patch(`http://127.0.0.1:3000/Tenant/${id}`,{month},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
            console.log(response);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [propertyId,rentstatus])


    return (
        <>
        <dataContext.Provider value={{tenantDetail,eachProperty}}>
            <div className="flex flex-col gap-4 items-start px-8 y-10">
                <div className="w-full flex flex-col">
                    <h3 className="text-3xl my-12 text-blue-600 my-8 font-bold  text-center md:text-left">Tenant Details</h3>
                    <Table handleClick={handleSubmit} tableHeading={tableHeading} tableData={tenantDetail} />
                </div>
            </div>
        </dataContext.Provider>
        </>
    )
}

export default PropertyDetail;