import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const myContext = createContext({});

export default function Context(props : any) {

    const [userObject, setUserObject] = useState<any>()
    
    useEffect(() => {
        axios.get("http://localhost:5000/getuser", { withCredentials: true }).then((res) => {
            if(res.data){
                console.log('context res:', res.data)
                setUserObject(res.data)
            }
        })
    },[])
    return(
        <myContext.Provider value={userObject}>
        {props.children}
        </myContext.Provider>
    )
}