import { createContext, useContext, useState } from "react";

const authContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);

    const setAuth = authUser=>{
        setUser(authUser)
    }

    const setUserData = userData =>{
        setUser({...userData})
    }

    return(
        <authContext.Provider value={{user, setAuth, setUserData}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth= ()=> useContext(authContext);