"use client"
import { ReactNode } from "react"

interface ButtonType{
    children:ReactNode,
    onClick?: ()=>void,
    tailwindClasses? :string
}

export default function Button({children,onClick,tailwindClasses}:ButtonType){
    return(
        <button onClick={onClick} className={`${tailwindClasses==undefined ? "bg-green-300 border-2 rounded-md px-4 py-0.5 mt-5 cursor-pointer hover:bg-green-500 text-lg font-semibold min-w-8 max-w-fit" : `${tailwindClasses}` } `}>
                    {children}
        </button>

        
    )
}