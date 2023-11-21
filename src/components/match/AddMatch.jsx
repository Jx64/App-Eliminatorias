import React, {useEffect, useState} from "react";
import {getTeams, postMatch, postResult} from "../../services/AppServices";
import "../../assets/css/match/AddMatch.css"

const result = {
    golesLocal: 0,
    golesVisitante: 0,
    numeroTarjetasRojas: 0,
    numeroTarjetasAmarillas: 0
}

const equipo = {
    id: 0,
    nombre: '',
    bandera: '',
    directorTecnico: ''
}

const match = {
    fecha: '',
    estadio: '',
    arbitro: '',
    equipoLocal: {
        ...equipo
    },
    equipoVisitante: {
        ...equipo
    },
    marcador:{
        id: 0,
        ...result
    }
}

const AddMatch = ({ accessToken, onAddMatchSuccess }) => {
    const [partidoData, setPartidoData] = useState(match);
    const [resultadoData, setResultadoData] = useState(result);
    const [equiposData, setEquiposData] = useState([]);
    const [localData, setLocalData] = useState(null);
    const [visitanteData, setVisitanteData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTeams(accessToken);
            setEquiposData(data);
        }
        fetchData();
    }, [accessToken]);

    const handleInputPartido = (e) => {
        const { name, value } = e.target;
        setPartidoData({
            ...partidoData,
            [name]: value,
        });
    };

    const handleInputLocal = (e) => {
        const { name, value } = e.target;
        const selectedTeam = equiposData.find(
            (equipo) => equipo.id === parseInt(value, 10));
        setLocalData(selectedTeam);
        setPartidoData((prevState) => ({
            ...prevState,
            equipoLocal: {
                ...prevState.equipoLocal,
                [name]: value,
            },
        }));
    };

    const handleInputVisitante = (e) => {
        const { name, value } = e.target;
        const selectedTeam = equiposData.find((equipo) => equipo.id === parseInt(value, 10));
        setVisitanteData(selectedTeam);
        setPartidoData((prevState) => ({
            ...prevState,
            equipoVisitante: {
                ...prevState.equipoVisitante,
                [name]: value,
            },
        }));
    };

    const handleInputGolesLocal = (e) => {
        const { value } = e.target;
        setResultadoData((prevState) => ({
            ...prevState,
            golesLocal: value,
        }));
    };

    const handleInputGolesVisitante = (e) => {
        const { value } = e.target;
        setResultadoData((prevState) => ({
            ...prevState,
            golesVisitante: value,
        }));
    };

    const handleAddMatch = async () => {
        try {
            const score = await postResult(accessToken,resultadoData);
            setPartidoData(match);
            setResultadoData(result);

            const updateMatch = {
                ...partidoData,
                equipoLocal: localData,
                equipoVisitante: visitanteData,
                marcador: {
                    id: score.id,
                    ...resultadoData
                }
            }
            setPartidoData(match);
            await postMatch(accessToken, updateMatch);

            if (typeof onAddMatchSuccess === 'function') {
                onAddMatchSuccess();
            }
        } catch (error){
            console.error('Error al agregar partido:', error);
        }
    }

    return (
        <div className="contenido">
            <div className="info">
                <div className="localTeam">
                    <label className="name" htmlFor="">Equipo local:</label>
                    <select className="equipoLocal"
                            value={localData ? localData.id : ''}
                            onChange={handleInputLocal}>
                        <option className="options" value="">Seleccione un equipo</option>
                        {equiposData.map((equipo) => (
                            <option key={equipo.id} value={equipo.id}>
                                {equipo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                    <br />
                <div className="visitingTeam">
                    <label className="name" htmlFor="">Equipo visitante:</label>
                    <select className="equipoVisitante"
                            value={visitanteData ? visitanteData.id : ''}
                            onChange={handleInputVisitante}>
                        <option className="options" value="">Seleccione un equipo</option>
                        {equiposData.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                    <br />
                <div className="fecha">
                    <label className="name" htmlFor="">Fecha:</label>
                    <input type="text"
                           placeholder="Ejemplo: 2023-04-14"
                           className="insert"
                           name="fecha"
                           value={partidoData.fecha}
                           onChange={handleInputPartido} required
                    />
                </div>
                    <br />
                <div className="estadio">
                    <label className="name" htmlFor="">Estadio:</label>
                    <input type="text"
                           placeholder="Ejemplo: Camp Nou"
                           className="insert"
                           name="estadio"
                           value={partidoData.estadio}
                           onChange={handleInputPartido} required
                    />
                </div>
                    <br />
                <div className="arbitro">
                    <label className="name" htmlFor="">Arbitro:</label>
                    <input type="text"
                           placeholder="Ejemplo: Juan Perez"
                           className="insert"
                           name="arbitro"
                           value={partidoData.arbitro}
                           onChange={handleInputPartido} required
                    />
                </div>
                    <br />
                <div className="localTeamGoals">
                    <label className="name" htmlFor="">Goles {localData ? localData.nombre : ''}:</label>
                    <input type="number"
                           className="golesLocal"
                           value={resultadoData.golesLocal}
                           onChange={handleInputGolesLocal}
                    />
                </div>
                    <br />
                <div className="visitingTeamGoals">
                    <label className="name" htmlFor="">
                        Goles {visitanteData ? visitanteData.nombre : ''}:
                    </label>
                    <input type="number"
                           className="golesVisitante"
                           value={resultadoData.golesVisitante}
                           onChange={handleInputGolesVisitante}
                    />
                </div>
                    <br />
                <button type="button"
                        className="btn"
                        onClick={handleAddMatch}>
                    Agregar Partido
                </button>
            </div>
        </div>
    );
};

export default AddMatch