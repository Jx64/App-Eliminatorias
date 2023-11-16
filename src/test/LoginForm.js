import React, { useState  } from 'react';
import { AuthContext } from '../context/AuthContext';
import EquipoList from './EquipoList';
import { handleLogin } from './authLogin';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const onLoginClick = () => {
        handleLogin(username, password, setAccessToken, setLoggedIn);
    }

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            <div>
                {loggedIn ? (
                    <EquipoList />
                ) : (
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <button type="button" onClick={onLoginClick}>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </AuthContext.Provider>
    );
};

export default LoginForm;