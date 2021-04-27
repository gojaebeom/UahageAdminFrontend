import React from "react";

export default function SignLayout( props ){
    return (
    <React.Fragment>
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <div className="inset-0 bg-black opacity-25 absolute">
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
            <div className="w-full flex flex-col items-center relative z-10">
                <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                    { props.title }
                </h1>
                <div className="font-extrabold text-8xl mt-10 text-white">
                    { props.children }
                </div>
            </div>
        </div>
    </div>
    </React.Fragment>
    )
}