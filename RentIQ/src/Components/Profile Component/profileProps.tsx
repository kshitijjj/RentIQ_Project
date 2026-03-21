export const OwnerProfileFields = [
        {
            type: "text", name: "name", placeholder: "Name", label: "Name", validation: {
                required: "Name is Required",
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name should contain only alphabets"
                }
            }, errorMsg: "Name is required"
        },
        {
            type: "text", name: "address", label: "Address", validation: {
                required: "Address is required",
            }, errorMsg: "Address is required"
        },
        {
            type: "text", name: "city", label: "City", validation: {
                required: "City is required",
            }, errorMsg: "City is required"
        },
        {
            type: "number", name: "pincode", label: "Pincode", validation: {
                required: "Pincode is required",
                Length:{value:6,message:"Pincode should be of 6 digits"}
            }, errorMsg: "Pincode is required"
        },
        {
            type: "number", name: "age", label: "Age", validation: {
                required: "Age is required",
            }, errorMsg: "Age is required"
        },
        {
            type: "text", name: "gender", label: "Gender", validation: {
                required: "Gender is required",
            }, errorMsg: "Gender is required"
        },
        {
            type: "text", name: "occupation", label: "Occupation",validation:{
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name should contain only alphabets"
                }
            }
        },
    ]

export const TenantProfileFields=[
    {
            type: "text", name: "firstName", placeholder: "First Name", label: "First Name", validation: {
                required: "First Name is Required",
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "First Name should contain only alphabets"
                }
            }, errorMsg: "First Name is required"
        },
        {
            type: "text", name: "lastName", placeholder: "Last Name", label: "Last Name", validation: {
                required: "Last Name is Required",
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Last Name should contain only alphabets"
                }
            }, errorMsg: "Last Name is required"
        },
        {
            type: "text", name: "fatherName", placeholder: "Father's Name", label: "Father's Name", validation: {
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Last Name should contain only alphabets"
                }
            }
        },
        {
            type: "text", name: "address", label: "Home Address", validation: {
                required: "Address is required",
            }, errorMsg: "Address is required"
        },
        {
            type: "text", name: "city", label: "Home City", validation: {
                required: "City is required",
            }, errorMsg: "City is required"
        },
        {
            type: "number", name: "pincode", label: "Pincode", validation: {
                required: "Pincode is required",
                Length:{value:6,message:"Pincode should be of 6 digits"}
            }, errorMsg: "Pincode is required"
        },
        {
            type: "number", name: "age", label: "Age", validation: {
                required: "Age is required",
            }, errorMsg: "Age is required"
        },
        {
            type: "text", name: "gender", label: "Gender", validation: {
                required: "Gender is required",
            }, errorMsg: "Gender is required"
        },
        {
            type: "text", name: "occupation", label: "Occupation",validation:{
                pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name should contain only alphabets"
                }
            }
        },
    ]

 export const buttonList = [
        {
            css: "text-white my-8 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xs text-sm px-6 py-3 focus:outline-none",
            text: "Submit"
        }
    ]