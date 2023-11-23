import React, { useState } from 'react';
import '../../assets/css/team/TeamCard.css'
import {postTeam} from "../../services/AppServices";

const equipo = {
    nombre: '',
    bandera: '',
    directorTecnico: ''
}
const AddTeam = ({ accessToken, onAddTeamSuccess }) => {
    const [equipoData, setEquipoData] = useState(equipo);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipoData({
            ...equipoData,
            [name]: value,
        });
    };

    const handleAddEquipo = async () => {
        try {
            await postTeam(accessToken, equipoData);

            setEquipoData(equipo);

            if (typeof onAddTeamSuccess === 'function') {
                onAddTeamSuccess();
            }
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
                        value={equipoData.nombre}
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
                        value={equipoData.bandera}
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
                    value={equipoData.directorTecnico}
                    onChange={handleInputChange} required
                />
                </div>
                    <br />
                <button type="button"
                        className="btnTeamCard"
                        onClick={handleAddEquipo}>
                    Agregar Equipo
                </button>
            </div>
        </div>
    );
};

export default AddTeam;
