import '../../assets/css/Login.css'
import user from "../../assets/img/user.png";
import pass from "../../assets/img/lock.png";


import React, { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {handleLogin} from "../../test/authLogin";

const Login = ( {setUser} ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState(null);

    const onLoginClick = () => {
        handleLogin(username, password, setAccessToken);
        setUser([username]);
    };

    return(
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
                <div>
                    <div className="wrapper">
                    <form action="src/components/main/page">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                            <img src={user} alt="Username"/>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                            <img src={pass} alt="Password"/>
                        </div>

                        <button type="button" className="btn" onClick={onLoginClick}>Login</button>

                        <div className="register-link">
                            <p>Don't have an account? <a href="./Signup">Register</a></p>
                        </div>
                    </form>
                    </div>
                </div>
        </AuthContext.Provider>
    );
};

export default Login;