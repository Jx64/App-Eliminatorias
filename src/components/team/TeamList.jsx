import React, { useEffect, useState} from "react";
import '../../assets/css/team/TeamList.css'
import {getTeams} from "../../services/AppServices";
import EditTeam from "./EditTeam";
import Modal from "../modal/Modal";

const TeamList = ({ accessToken, roles }) => {
    const [equipos, setEquipos] = useState([]);
    const [selectedEquipo, setSelectedEquipo] = useState(null);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);
    const [equipoListKey, setEquipoListKey] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTeams(accessToken);
            setEquipos(data);
        }
        fetchData();
    }, [accessToken, equipoListKey]);

    const handleEditClick = (team) => {
        setSelectedEquipo(team);
        setModalStatusUpdate(true);
    };

    const handleEditTeamSuccess = () => {
        setModalStatusUpdate(false);
        setEquipoListKey((prevKey) => prevKey + 1); // Trigger re-render
    };

    return (
        <div className="team-list-container">
            <div className="team-list">
            {equipos.map((equipo) => (
                <div key={equipo.id}>
                    <div className="team">
                        <img className="flag" src={equipo.bandera} alt="bandera"></img>
                        <div className="team-info">
                            <p className="nombre">{equipo.nombre}</p>
                            <p className="dt">Director tecnico: {equipo.directorTecnico}</p>
                        </div>
                        {roles && roles.includes('ROLE_ADMIN') ? (
                            <button type="button"
                                    className="edit"
                                    onClick={() => handleEditClick(equipo)}>
                                Editar
                            </button>
                        ):null}
                        <Modal
                            status={modalStatusUpdate}
                            setStatus={setModalStatusUpdate}
                            name="Modificar datos del equipo"
                        >
                            <EditTeam
                                accessToken={accessToken}
                                equipo={selectedEquipo}
                                onEditTeamSuccess={handleEditTeamSuccess}
                            />
                        </Modal>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
};

export default TeamList;