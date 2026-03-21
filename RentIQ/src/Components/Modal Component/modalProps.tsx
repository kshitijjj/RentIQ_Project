import type { SubmitHandler } from "react-hook-form"
import type { Inputs } from "../Input"

export const modalFields = [
        {
            type: "email", name: "email", placeholder: "Email Address", label: "Email Address", validation: {
                required: "Email is Required",
                pattern: {
                    value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please Enter Valid Email Address"
                }
            }, errorMsg: "Email Address is required"
        }
    ]

     export const modalbuttonList = [
        {
            css: "text-white my-8 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xs text-sm px-6 py-3 focus:outline-none",
            text: "Add email",
            type:"submit"
        },
        {
            css: "text-white my-8 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xs text-sm px-6 py-3 focus:outline-none",
            text: "Sent Invite",
            type:"submit"
        }
    ]
