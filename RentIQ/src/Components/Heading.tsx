interface HeadingProps{
    heading:string,
    subHeadingOne:string,
    subHeadingTwo:string
}

function Heading({heading,subHeadingOne,subHeadingTwo}:HeadingProps){
    return(
        <>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl"><mark className="px-2 pb-0.5 text-white bg-brand rounded-xs">{heading}</mark></h1>
            <p className="text-lg font-normal text-body lg:text-xl">{subHeadingOne}</p>
            <p className="text-lg font-normal text-body lg:text-xl">{subHeadingTwo}</p>
        </>
    )
}

export default Heading;