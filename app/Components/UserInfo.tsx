interface userType{
    user: {
        userInfo: {
            firstName: string,
            lastName: string,
            email: string
        }
    }
}

const userInfo : React.FC<userType> = ({user}) => {

    let name = user.userInfo.firstName;
    name = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    
    return(
        <div className="flex gap-2 items-center">
            <span className="text-base">Hello,{name}</span>
            {name && <span className="bg-gray-300 rounded-full border px-2 py-1 text-xs uppercase">{name[0]}</span>}
        </div>
    )
    
}

export default userInfo;
