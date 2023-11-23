import React, { useState} from 'react';
import {handleLogin} from "../../services/Auth";
import Signup from "./Signup"

// Assets
import '../../assets/css/Login.css'
import user from "../../assets/img/user.png";
import pass from "../../assets/img/lock.png";

const Login = ( { setUser, setLoggedIn } ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [onRegister, setOnRegister] = useState(false);

    const onLoginClick = async () => {
        await handleLogin(username, password, setLoggedIn);
        setUser([username]);
    };

    const handleOnSignup = async () =>{
        setOnRegister(true);
    }

    return(
        <div id="auth" className="auth-container">
            {onRegister ? (
                <Signup setOnSignup={setOnRegister} />
            ) : (
                <div className="wrapper">
                <form action="src/components/main/page">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text"
                               placeholder="Username"
                               onChange={(e) => setUsername(e.target.value)} required
                        />
                        <img src={user} alt="Username"/>
                    </div>
                    <div className="input-box">
                        <input type="password"
                               placeholder="Password"
                               autoComplete="off"
                               onChange={(e) => setPassword(e.target.value)} required
                        />
                        <img src={pass} alt="Password"/>
                    </div>

                    <button type="button"
                            className="btn"
                            onClick={onLoginClick}>
                        Login
                    </button>
                    <div className="register-link">
                        <p>Don't have an account? <button className="btnRegister"
                            onClick={handleOnSignup}>
                            Register
                        </button>
                        </p>
                    </div>
                </form>
                </div>
            )
            }
        </div>
    );
};

export default Login;