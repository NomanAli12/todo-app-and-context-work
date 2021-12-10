import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin:()=>{}
})

export const AuthContextprovider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const userInfo = localStorage.getItem("loggedIn");
        if (userInfo === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("loggedIn", "1");
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("loggedIn");
        setIsLoggedIn(false);
    };


    return <AuthContext.Provider value={{ isLoggedIn : isLoggedIn , onLogout: logoutHandler , onLogin:loginHandler }} >{props.children}</AuthContext.Provider>
}



export default AuthContext
