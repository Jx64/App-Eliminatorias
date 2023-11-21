import '../../assets/css/Home.css'
import TeamList from "../team/TeamList";
import MatchList from "../match/MatchList";
import AddTeam from "../team/AddTeam";
import {useState} from "react";
import Modal from "../modal/Modal";
import AddMatch from "../match/AddMatch";
export function Home ({ user, setUser, setLoggedIn }) {
    const accessToken = localStorage.getItem('accessToken');
    const [modalStatusEquipo, setModalStatusEquipo] = useState(false);
    const [equipoListKey, setEquipoListKey] = useState(0);
    const [modalStatusPartido, setModalStatusPartido] = useState(false);
    const [partidoListKey, setPartidoListKey] = useState(0);
    const handleLogout = () => {
        setUser([])
        setLoggedIn(false)
    }

    return (
            <div className="home">
                <div className="welcome">
                    <h1 className="msg">Bienvenido, </h1>
                    <h1 className="user">{user}</h1>
                    <button type="button" className="btn" onClick={handleLogout}>Cerrar sesion</button>
                </div>
                <div className="header-line"></div>
                <div className="selection">
                    <div className="equipos">
                        <div className="header">
                            <p className="name">Equipos</p>
                        </div>
                        <div className="botonAgregarEquipo">
                            <button type="button"
                                    className="btn"
                                    onClick={() => setModalStatusEquipo(!modalStatusEquipo)}>
                                Agregar Equipo
                            </button>
                        </div>
                        <div>
                            <Modal
                                status={modalStatusEquipo}
                                setStatus={setModalStatusEquipo}
                                name="Ingrese los datos del nuevo equipo"
                            >
                                <AddTeam accessToken={accessToken}
                                         onAddTeamSuccess={() => {
                                             setModalStatusEquipo(false);
                                             setEquipoListKey(prevKey => prevKey + 1);
                                         }}
                                />
                            </Modal>
                            <TeamList key={equipoListKey} accessToken={accessToken}/>
                        </div>
                    </div>
                    <div className="content-line"></div>
                    <div className="partidos">
                        <div className="header">
                            <p className="name">Resultados</p>
                        </div>
                        <div>
                            <button type="button"
                                    className="btn"
                                    onClick={() => setModalStatusPartido(!modalStatusPartido)}>
                                Agregar Partido
                            </button>
                        </div>
                        <div>
                            <Modal status={modalStatusPartido}
                                   setStatus={setModalStatusPartido}
                                   name="Ingrese los datos del partido"
                                   >
                                <AddMatch accessToken={accessToken}
                                          onAddMatchSuccess={() => {
                                            setModalStatusPartido(false);
                                            setPartidoListKey(prevKey => prevKey + 1);
                                          }}
                                />
                            </Modal>
                            <MatchList key={partidoListKey} accessToken={accessToken}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}