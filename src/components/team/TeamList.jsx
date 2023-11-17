import React, { useEffect, useState} from "react";
import '../../assets/css/TeamList.css'

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
            {equipos.map((equipo) => (
                <div key={equipo.id}>
                    <div className="team">
                        <img className="flag" src={equipo.bandera} alt="bandera"></img>
                        <div className="team-info">
                            <p className="nombre">{equipo.nombre}</p>
                            <p className="dt">Director tecnico: {equipo.directorTecnico}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default TeamList;