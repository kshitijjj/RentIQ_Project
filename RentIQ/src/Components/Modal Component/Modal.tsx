import { modalbuttonList, modalFields } from "./modalProps";
import Input from "../Input";
import type { SubmitHandler } from "react-hook-form";
import type { Inputs } from "../Input";
import { useState } from "react";
import axios from 'axios';

interface modalProps{
    showModal:boolean,
    handleSubmit:()=>void,
    propertyId:string
}

function Modal({showModal,handleSubmit,propertyId}:modalProps){

    const [emails,setemail]=useState<string[]>([]);
    const [emailAdd,setemailAdd]=useState<boolean>(false);

    const onsubmit: SubmitHandler<Inputs> = async (data) => {
        if(emailAdd){
            setemail((prev)=>([...prev,data.email]));
            setemailAdd(false);
            return;
        }
        try {
            const response=await axios.post(`http://127.0.0.1:3000/property/${propertyId}/invite`,emails,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})            
            if(response.status===200){
                handleSubmit();
            }
        } catch (error) {
            console.log(error);
        }
    }

    modalbuttonList[0].handleClick=()=>setemailAdd(true);
    return (
        <>
            <div id="authentication-modal" tabindex={-1} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                            <h3 className="text-lg font-medium text-heading">
                                Add Tenants
                            </h3>
                            
                                <button type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                                    <svg onClick={handleSubmit} className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                        </div>
                    
                        <Input inputs={modalFields} buttonList={modalbuttonList} onsubmit={onsubmit}/>
                        <ul className="max-w-md space-y-1 text-body list-inside">
                                {emails.map((email,index)=>(
                                    <li key={index} className="flex items-center">
                                    <svg className="w-4 h-4 text-fg-success me-1.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                    {email}
                                </li>
                                ))}
                            </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;