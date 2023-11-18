import React, {useEffect, useState} from "react";
import {getTeams, postMatch, postResult} from "../../services/AppServices";

const result = {
    golesLocal: '',
    golesVisitante: ''
}

const match = {
    fecha: '',
    estadio: '',
    arbitro: '',
    equipoLocal: 0,
    equipoVisitante: 0,
    marcador:{
        id: 0,
        ...result
    }
}

const AddMatch = ({ accessToken }) => {
    const [matchData, setMatchData] = useState(match);
    const [resultData, setResultData] = useState(result);
    const [teams, setTeams] = useState([]);
    const [local, setLocal] = useState(0);
    const [visiting, setVisiting] = useState(0);

    const handleInputMatch = (e) => {
        const { name, value } = e.target;
        setMatchData({
            ...matchData,
            [name]: value,
        });
    };

    useEffect(() => {
        const getTeam = async () => {
            const teamList = await getTeams(accessToken);
            console.log("Team List:", teamList);
            setTeams(teamList);
        }
        getTeam();
    }, [accessToken]);

    const handleLocalTeam = (e) => {
        const selectedTeamName = e.target.value;
        setLocal(selectedTeamName);
    }
    const handleVisitingTeam = (e) => {
        const selectedTeamName = e.target.value;
        setVisiting(selectedTeamName);
    }

    const handleInputResult = (e) => {
        const { name, value } = e.target;
        setResultData({
            ...resultData,
            [name]: value
        })
        setMatchData((prevMatch) => ({
            ...prevMatch,
            marcador: {
                ...prevMatch.marcador,
                [name]: value
            }
        }));
    }
    const handleAddMatch = async () => {
        const score = await postResult(accessToken,resultData);
        setResultData(result);
        setMatchData(match);

        const updateMatch = {
            ...matchData,
            equipoLocal: local,
            equipoVisitante: visiting,
            marcador: {
                id: score.id,
                ...resultData
            }
        }
        setMatchData(match);
        // onmatch
        await postMatch(accessToken, updateMatch);
    }

    return (
        <div className="contenido">
            <div className="info">
                <div className="fecha">
                    <label className="name" htmlFor="">Fecha:</label>
                    <input type="text" placeholder="Ejemplo: 2023-04-14" className="insert" name="fecha"
                           value={matchData.fecha}
                           onChange={handleInputMatch} required
                    />
                </div>
                    <br />
                <div className="estadio">
                    <label className="name" htmlFor="">Estadio:</label>
                    <input type="text" placeholder="Ejemplo: Camp Nou" className="insert" name="estadio"
                           value={matchData.estadio}
                           onChange={handleInputMatch} required
                    />
                </div>
                    <br />
                <div className="arbitro">
                    <label className="name" htmlFor="">Arbitro:</label>
                    <input type="text" placeholder="Ejemplo: Juan Perez" className="insert" name="arbitro"
                           value={matchData.arbitro}
                           onChange={handleInputMatch} required
                    />
                </div>
                    <br />
                <div className="teams">
                    <div className="localTeam">

                        <div className="localTeam-1">
                            <label className="name" htmlFor="">Equipo local:</label>
                            <select name="equipoLocal" value={local} onChange={handleLocalTeam}>
                                <option value="">Seleccione un equipo</option>
                                {teams.map((team) => {
                                    return (
                                        <option key={team.id} value={team.id}>{team.nombre}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="localTeam-2">
                            <label className="name" htmlFor="">Goles:</label>
                            <input type="number" name="golesLocal"
                                   value={resultData.golesLocal}
                                   onChange={handleInputResult}
                            />
                        </div>
                    </div>

                    <div className="visitingTeam">

                        <div className="visitingTeam-1">
                            <label className="name" htmlFor="">Equipo visitante:</label>
                            <select name="equipoVisitante" value={visiting} onChange={handleVisitingTeam}>
                                <option value="">Seleccione un equipo</option>
                                {teams.map((team) => {
                                    return (
                                        <option key={team.id} value={team.id}>{team.nombre}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="visitingTeam-2">
                            <label className="name" htmlFor="">Goles:</label>
                            <input type="number" name="golesVisitante"
                                   value={resultData.golesVisitante}
                                   onChange={handleInputResult}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <button type="button" className="btn" onClick={handleAddMatch}>
                    Agregar Partido
                </button>
            </div>
        </div>
    );
};

export default AddMatch