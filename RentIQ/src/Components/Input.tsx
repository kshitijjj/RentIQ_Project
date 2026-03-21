import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { RegisterOptions } from "react-hook-form"

export type Inputs = {
    [key:string]:string
}

interface InputRequiredProps{
    inputs:{
        type:string,
        placeholder:string,
        name:string,
        label:string,
        validation?:RegisterOptions,
        errorMsg?:string,
    }[],
    buttonList:{
        css:string,
        text:string
        handleClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void,
        type?:"submit" | "button"
    }[],
    onsubmit:SubmitHandler<Inputs>,
    role?:boolean,
}

function Input({inputs,buttonList,onsubmit,role,handleClick}:InputRequiredProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<Inputs>()

    return (
        <>
            <form className="max-w-md mx-auto flex flex-col justify-center" onSubmit={handleSubmit(onsubmit)} >
                {inputs.map((inp,index)=>(
                    <>
                    <div key={index} className="relative z-0 w-full mb-5 group">
                    <input type={inp.type} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " {...register(inp.name,inp.validation)}/>
                    <label for="floating_email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{inp.label}</label>
                    </div>
                    {errors[inp.name] && <span className="text-sm text-red-700 mb-5">{inp.errorMsg}</span>}
                    </>
                ))}
                {role && (
                    <select className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xs focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" {...register("role",{required:"Role is required"})}>
                    <option value="">Select Role</option>
                    <option value="Owner">Owner</option>
                    <option value="Tenant">Tenant</option>
                    </select>
                )}
                
                {errors.role && <span className="text-sm text-red-700">Role is required</span>}
                <div className="flex flex-col md:flex-row md:justify-between">
                {buttonList.map((btn,index)=>(
                    <button onClick={()=>btn.handleClick?.(getValues())} key={index} type={btn.type} className={btn.css}>{btn.text}</button>
                ))}
                </div>
            </form>
        </>
    )
}
export default Input;
