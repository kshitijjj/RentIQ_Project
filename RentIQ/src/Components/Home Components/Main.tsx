interface MainProps{
    titleOne:string,
    titleTwo:string,
    HeadingOne:string,
    HeadingTwo:string,
    subHeading:string,
    buttonList:{
        css:string,
        text:string,
        handleClick:(index:number)=>void
    }[]
}

function Main({titleOne,titleTwo,HeadingOne,HeadingTwo,subHeading,buttonList}:MainProps) {
    return (
        <>
            <section className="bg-neutral-primary h-screen flex flex-col md:my-32">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                    <div className="w-auto inline-flex items-center p-1 pe-2 mb-7 text-sm text-fg-brand-strong rounded-full bg-brand-softer border border-brand-subtle" role="alert">
                        <span className="bg-brand-soft font-bold text-fg-brand-strong py-0.5 px-2 rounded-full">{titleOne}</span>
                        <div className="ms-2 text-sm font-bold">
                            {titleTwo}
                        </div>
                        <svg className="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" /></svg>
                    </div>
                    <h1 className="mb-2 text-4xl font-bold tracking-tighter text-heading md:text-5xl lg:text-6xl">{HeadingOne}</h1>
                    <h3 className="mb-6 text-4xl font-bold tracking-tighter text-heading md:text-5xl lg:text-6xl">{HeadingTwo}</h3>
                    <p className="mb-10 text-base font-normal text-body md:text-xl">{subHeading}</p>
                    <div className="flex gap-8 items-center justify-center">
                        {buttonList.map((btn,index)=>(
                            <button key={index} onClick={()=>btn.handleClick(index)} type="button" className={btn.css}>{btn.text}</button>
                        ))}
                    </div>
                </div>
                <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
            </section>

        </>
    )
}

export default Main;