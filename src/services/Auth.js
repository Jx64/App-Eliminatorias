const api = "https://eliminatoriasapi.azurewebsites.net"
const handleLogin = async (username, password, setLoggedIn, setUserRole) => {
    try {
        const response = await fetch(`${api}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if(response.status === 200){
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            setLoggedIn(true);
            localStorage.setItem('roles', data.roles)
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleSignup = async (username, email, password, setOnRegister) => {
    try {
        const response = await fetch(`${api}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        if(response.status === 200){
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            setOnRegister(false);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


export { handleLogin, handleSignup, api };
