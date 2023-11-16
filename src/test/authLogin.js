const handleLogin = async (username, password, setAccessToken) => {
    try {
        const response = await fetch('http://localhost:9000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();
        setAccessToken(data.accessToken);
    } catch (error) {
        console.error('Error:', error);
    }
};

export { handleLogin };
