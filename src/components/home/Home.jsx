import '../../assets/css/Home.css'
export function Home ({ user, setUser, setLoggedIn }) {

    const handleLogout = () => {
        setUser([])
        setLoggedIn(false)
    }

    return (
        <div className="home">
            <div className="welcome">
                <h1>Bienvenido</h1>
                <h2 className="user">{user}</h2>
                <button className="btn" onClick={handleLogout}>Cerrar sesion</button>
            </div>
            <div className="header-line"></div>
            <div className="selection">
                <div className="equipos">Lista de equipos</div>
                <div className="partidos">
                    Partidos
                </div>
            </div>
        </div>
    )
}