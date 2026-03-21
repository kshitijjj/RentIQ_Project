interface buttonProp{
    buttonList:{
        handleClick:()=>void,
        text:string,
    }[]
}
function Button({buttonList}:buttonProp){
    return(
        <>
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
            {buttonList.map((btn,index)=>(
                <button onClick={btn.handleClick} key={index} type="button" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xs text-sm px-6 py-3 focus:outline-none">{btn.text}</button>
            ))}
        </div>
        </>
    )
}

export default Button;