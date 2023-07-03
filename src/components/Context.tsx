import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

// eslint-disable-next-line react-refresh/only-export-components
export const myContext = createContext<UserInterface | undefined>(undefined);

export interface UserInterface {
    _id: string
    email: string
    googleId: string
    name: string
    picture: string
}

export default function Context({children} : { children:JSX.Element}) {

    const [userObject, setUserObject] = useState<UserInterface>()
    
    useEffect(() => {
        axios.get(`${process.env.BACK_END_URI}/getuser`, { withCredentials: true }).then((res) => {
            if(res.data){
                console.log('context res:', res.data)
                setUserObject(res.data)
            }
        })
    },[])
    return(
        <myContext.Provider value={userObject}>
        {children}
        </myContext.Provider>
    )
}