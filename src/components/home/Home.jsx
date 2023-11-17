import '../../assets/css/Home.css'
import TeamList from "../team/TeamList";
import MatchList from "../match/MatchList";
export function Home ({ user, setUser, setLoggedIn }) {
    const accessToken = localStorage.getItem('accessToken');
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
                            <button type="button" className="btn">Agregar Equipo</button>
                        </div>
                        <div>
                            <TeamList accessToken={accessToken}/>
                        </div>
                    </div>
                    <div className="partidos">
                        <div className="header">
                            <p className="name">Partidos</p>
                            <button type="button" className="btn">Agregar Partido</button>
                        </div>
                        <div>
                            <MatchList accessToken={accessToken}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}