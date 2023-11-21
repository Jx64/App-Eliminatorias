import React, { useEffect, useState} from "react";
import '../../assets/css/match/MatchList.css'
import {getMatches} from "../../services/AppServices";
import Modal from "../modal/Modal";
import EditMatchResult from "./EditMatchResult";
const MatchList = ({ accessToken }) => {
    const [partidos, setPartidos] = useState([]);
    const [selectedPartido, setSelectedPartido] = useState(null);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);
    const [partidoListKey, setPartidoListKey] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMatches(accessToken);
            setPartidos(data);
        };
        fetchData();
    }, [accessToken, partidoListKey]);

    const handleEditClick = (partido) => {
        setSelectedPartido(partido);
        setModalStatusUpdate(true);
    };

    const handleEditTeamSuccess = () => {
        setModalStatusUpdate(false);
        setPartidoListKey((prevKey) => prevKey + 1); // Trigger re-render
    };

    return (
        <div className="match-list-container">
            <div className="match-list">
            {partidos.map((partido) => (
                <div key={partido.id}>
                    <div className="match-info">
                    <div className="localMatch">
                        <img className="bandera" src={partido.equipoLocal.bandera} alt="bandera"></img>
                        <p className="nombre">{partido.equipoLocal.nombre}</p>
                    </div>

                    <div className="marcadorLocalMatch">{partido.marcador.golesLocal}</div>

                    <div className="infoMatch">
                        <div className="fechaMatch">
                            <p className="name">Fecha</p>
                            <p className="data">{partido.fecha}</p>
                        </div>
                        <div className="separador">—</div>
                        <div className="estadioMatch">
                            <p className="name">Estadio</p>
                            <p className="data">{partido.estadio}</p>
                        </div>
                    </div>

                    <div className="marcadorVisitanteMatch">{partido.marcador.golesVisitante}</div>

                    <div className="visitanteMatch">
                        <img className="bandera" src={partido.equipoVisitante.bandera} alt="bandera"></img>
                        <p className="nombre">{partido.equipoVisitante.nombre}</p>
                    </div>

                    <button type="button"
                            className="editMatch"
                            onClick={() => handleEditClick(partido)}>
                        Editar
                    </button>
                    <Modal
                        status={modalStatusUpdate}
                        setStatus={setModalStatusUpdate}
                        name="Modificar datos del partido"
                    >
                        <EditMatchResult
                            accessToken={accessToken}
                            partido={selectedPartido}
                            onEditMatchResultSuccess={handleEditTeamSuccess}
                        />
                    </Modal>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
};

export default MatchList;