import React, { useEffect, useState} from "react";
import '../../assets/css/team/TeamList.css'
import {getTeams} from "../../services/AppServices";

const TeamList = ({ accessToken }) => {
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTeams(accessToken);
            setEquipos(data);
        }
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
                        <button type="button" className="edit">Editar</button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default TeamList;