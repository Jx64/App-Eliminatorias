import React, { useState } from 'react';
import '../../assets/css/team/AddTeam.css'
import {postTeam} from "../../services/AppServices";

const equipo = {
    nombre: '',
    bandera: '',
    directorTecnico: ''
}

const AddTeam = ({ accessToken, onAddTeamSuccess }) => {
    const [equipoData, setEquipoData] = useState(equipo);

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
            const data = await postTeam(accessToken, equipoData);
            setEquipoAgregado(data);

            setEquipoData(equipo);

            if (typeof onAddTeamSuccess === 'function') {
                onAddTeamSuccess();
            }
        } catch (error) {
            console.error('Error al agregar equipo:', error);
        }
    };

    return (
        <div className="contenido">
            <div className="info">
                <div className="nombre">
                    <label className="name" htmlFor="nombre">Nombre:</label>
                    <input type="text" placeholder="Ejemplo: Colombia" className="insert" name="nombre"
                        value={equipoData.nombre}
                        onChange={handleInputChange} required
                    />
                </div>
                    <br />
                <div className="flag">
                    <label className="name" htmlFor="bandera">Bandera:</label>
                    <input type="text" placeholder="Ejemplo: https://flagsapi.com/CO/flat/64.png" className="insert" name="bandera"
                        value={equipoData.bandera}
                        onChange={handleInputChange} required
                    />
                </div>
                    <br />
                <div className="dt">
                <label className="name" htmlFor="directorTecnico">Director Técnico:</label>
                <input type="text" placeholder="Ejemplo: Juan Perez" className="insert" name="directorTecnico"
                    value={equipoData.directorTecnico}
                    onChange={handleInputChange} required
                />
                </div>
                    <br />
                <button type="button" className="btn" onClick={handleAddEquipo}>
                    Agregar Equipo
                </button>

                {equipoAgregado && (
                    <div>
                        <p>Equipo agregado: {equipoAgregado.nombre}</p>
                        {/* Puedes realizar acciones adicionales aquÃ­, como actualizar la lista de equipos */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddTeam;
