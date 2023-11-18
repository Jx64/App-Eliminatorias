import '../../assets/css/Home.css'
import TeamList from "../team/TeamList";
import MatchList from "../match/MatchList";
import AddTeam from "../team/AddTeam";
import {useState} from "react";
import Modal from "../modal/Modal";
import AddMatch from "../match/AddMatch";
export function Home ({ user, setUser, setLoggedIn }) {
    const accessToken = localStorage.getItem('accessToken');
    const [modalStatus, setModalStatus] = useState(false);
    const [teamListKey, setTeamListKey] = useState(0);
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
                            <button type="button" className="btn" onClick={() => setModalStatus(!modalStatus)}>Agregar Equipo</button>
                        </div>
                        <Modal
                            status={modalStatus}
                            setStatus={setModalStatus}
                            name="Ingrese los datos del nuevo equipo"
                        >
                            <AddTeam accessToken={accessToken}
                                     onAddTeamSuccess={() => {
                                         setModalStatus(false);
                                         setTeamListKey(prevKey => prevKey + 1);
                                     }}
                            />
                        </Modal>
                        <div>
                            <TeamList key={teamListKey} accessToken={accessToken}/>
                        </div>
                    </div>
                    <div className="partidos">
                        <div className="header">
                            <p className="name">Partidos</p>
                            <button type="button" className="btn" >Agregar Partido</button>
                        </div>
                        <div>
                            <MatchList accessToken={accessToken}/>
                        </div>
                        <div className="test">
                            <AddMatch accessToken={accessToken}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}