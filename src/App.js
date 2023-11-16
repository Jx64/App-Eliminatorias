import Login from "./components/login/Login";
import {AuthProvider} from "./context/AuthContext";
import {useState} from "react";
import {Home} from "./components/home/Home";

function App() {
    const [user, setUser] = useState([])
    return (
        <div className="App">
            {
                !user.length > 0
                ?<AuthProvider>
                        <Login setUser={setUser}/>
                </AuthProvider>
                    : <Home user={user} setUser={setUser}/>
            }
        </div>
    );
}

export default App;