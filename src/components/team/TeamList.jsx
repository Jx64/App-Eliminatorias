import React, { useEffect, useState} from "react";

const TeamList = ({ accessToken }) => {
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

        fetchData();
    }, [accessToken]);


    return (
        <div>
            <ul>
                {equipos.map((equipo) => (
                    <li key={equipo.id}>
                        {equipo.bandera}
                        {equipo.nombre}
                        {equipo.directorTecnico}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TeamList;