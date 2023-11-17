import './App.css'
import Login from "./components/login/Login";
import {AuthProvider} from "./context/AuthContext";
import {useState} from "react";
import {Home} from "./components/home/Home";

function App() {
    const [user, setUser] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <div className="App">
            <AuthProvider>
                { loggedIn ? (
                    <Home user={user} setUser={setUser} setLoggedIn={setLoggedIn}/>
                ) : (
                    <Login setUser={setUser} setLoggedIn={setLoggedIn}/>
            )}
            </AuthProvider>
        </div>
    );
}

export default App;