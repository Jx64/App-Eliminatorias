import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AddEquipo from './AddEquipo';

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

export default EquipoList;