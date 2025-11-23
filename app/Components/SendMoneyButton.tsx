"use client"

interface ButtonType{
    onClick?: ()=>void,
    tailwindClasses? :string
}

export default function SendMoneyButton({onClick,tailwindClasses}:ButtonType){
    return(
        <button onClick={onClick} className={`${tailwindClasses==undefined ? "bg-black text-white border rounded-md px-3 py-1.5 cursor-pointer hover:bg-[#5654a8] text-base font-semibold " : `${tailwindClasses} bg-black text-white border rounded-md px-3 py-1.5 cursor-pointer hover:bg-[#5654a8] text-base font-semibold ` } `}>
            Send Money
        </button>
    )
}