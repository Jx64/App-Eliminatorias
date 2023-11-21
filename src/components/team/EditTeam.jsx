import React, {useEffect, useState} from 'react';
import '../../assets/css/team/TeamCard.css'
import { updateTeam } from "../../services/AppServices";

const EditTeam = ({ accessToken, equipo, onEditTeamSuccess }) => {
    const [newEquipoData, setNewEquipoData] = useState({
        id: 0,
        nombre: '',
        bandera: '',
        directorTecnico: '',
    });

    useEffect(() => {
        if (equipo) {
            setNewEquipoData(equipo);
        } else {
            setNewEquipoData({
                id: 0,
                nombre: '',
                bandera: '',
                directorTecnico: '',
            });
        }
    }, [equipo]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEquipoData({
            ...newEquipoData,
            [name]: value,
        });
    };

    const handleUpdateEquipo = async () => {
        try {
            await updateTeam(accessToken, newEquipoData);
            onEditTeamSuccess();
        } catch (error) {
            console.error('Error al agregar equipo:', error);
        }
    };

    return (
        <div className="contenido-TeamCard">
            <div className="infoTeamCard">
                <div className="nombreTeamCard">
                    <label className="nameTeamCard" htmlFor="nombre">Nombre:</label>
                    <input type="text"
                           placeholder="Ejemplo: Colombia"
                           className="insertTeamCard"
                           name="nombre"
                           value={newEquipoData.nombre}
                           onChange={handleInputChange} required
                    />
                </div>
                <br />
                <div className="flagTeamCard">
                    <label className="nameTeamCard" htmlFor="bandera">Bandera:</label>
                    <input type="text"
                           placeholder="Ejemplo: https://flagcdn.com/w80/co.png"
                           className="insertTeamCard"
                           name="bandera"
                           value={newEquipoData.bandera}
                           onChange={handleInputChange} required
                    />
                </div>
                <br />
                <div className="dtTeamCard">
                    <label className="nameTeamCard" htmlFor="directorTecnico">Director Técnico:</label>
                    <input type="text"
                           placeholder="Ejemplo: Juan Perez"
                           className="insertTeamCard"
                           name="directorTecnico"
                           value={newEquipoData.directorTecnico}
                           onChange={handleInputChange} required
                    />
                </div>
                <br />
                <button type="button"
                        className="btnTeamCard"
                        onClick={handleUpdateEquipo}>
                    Editar equipo
                </button>
            </div>
        </div>
    );
};

export default EditTeam;
