import React, {useState, createContext} from 'react'

// initiate the context 
export const LoginContext = createContext();

function LoginContextProvider(props) {
    //set context api state for our user
    const [user, setUser ] = useState('false');

    return (
        <LoginContext.Provider value={[user,setUser]}>
            {props.children}
            {/* <Login /> */}
        </LoginContext.Provider>    
    );
}

export default LoginContextProvider;
