import React, { useState, useContext, useEffect } from 'react';

const AuthContext = React.createContext();

const EquipoList = () => {
    const { accessToken } = useContext(AuthContext);
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/v1/equipos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                setEquipos(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Llamar a la función para obtener la lista de equipos cuando el componente se monta
        fetchData();
    }, [accessToken]);

    return (
        <div>
            <div>Lista de Equipos</div>
            {/* Imprimir la lista de equipos después del encabezado */}
            <ul>
                {equipos.map((equipo) => (
                    <li key={equipo.id}>{equipo.nombre}</li>
                ))}
            </ul>
            {/* Agregar el componente para agregar equipos */}
            <AddEquipo />
        </div>
    )
};

const AddEquipo = () => {
    const { accessToken } = useContext(AuthContext);
    const [equipoData, setEquipoData] = useState({
        nombre: '',
        bandera: '',
        directorTecnico: '',
    });

    const [equipoAgregado, setEquipoAgregado] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipoData({
            ...equipoData,
            [name]: value,
        });
    };

    const handleAddEquipo = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/v1/equipos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(equipoData),
            });

            const data = await response.json();
            console.log('Equipo agregado:', data);

            setEquipoAgregado(data);

            setEquipoData({
                nombre: '',
                bandera: '',
                directorTecnico: '',
            });
            // Puedes realizar alguna acción adicional después de agregar el equipo, como actualizar la lista de equipos
        } catch (error) {
            console.error('Error al agregar equipo:', error);
        }
    };

    return (
        <div>
            <h2>Agregar Equipo</h2>
            <label htmlFor="nombre">Nombre:</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                value={equipoData.nombre}
                onChange={handleInputChange}
                required
            />
            <br />
            <label htmlFor="bandera">Bandera:</label>
            <input
                type="text"
                id="bandera"
                name="bandera"
                value={equipoData.bandera}
                onChange={handleInputChange}
                required
            />
            <br />
            <label htmlFor="directorTecnico">Director Técnico:</label>
            <input
                type="text"
                id="directorTecnico"
                name="directorTecnico"
                value={equipoData.directorTecnico}
                onChange={handleInputChange}
                required
            />
            <br />
            <button type="button" onClick={handleAddEquipo}>
                Agregar Equipo
            </button>

            {/* Mostrar un mensaje o realizar acciones adicionales después de agregar un equipo */}
            {equipoAgregado && (
                <div>
                    <p>Equipo agregado: {equipoAgregado.nombre}</p>
                    {/* Puedes realizar acciones adicionales aquí, como actualizar la lista de equipos */}
                </div>
            )}
        </div>
    );
};


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async () => {
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

            if (!response.ok) {
                // Si la respuesta no es exitosa, mostrar el mensaje de error del servidor si está disponible
                const errorData = await response.json();
                setError(errorData.message || 'Usuario o contraseña incorrecta');
                return;
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
            // Limpiar el mensaje de error en caso de éxito
            setError(null);
            setLoggedIn(true);
        } catch (error) {
            console.error('Error:', error);
            setError('Error al intentar iniciar sesión');
        }
    };

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
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>

                        {/* Mostrar el mensaje de error */}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    )}
            </div>
        </AuthContext.Provider>
    );
};

export default LoginForm;

