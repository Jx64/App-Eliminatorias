import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

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

export default AddEquipo;