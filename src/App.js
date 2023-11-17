import Login from "./components/login/Login";
import {AuthProvider} from "./context/AuthContext";
import {useState} from "react";
import {Home} from "./components/home/Home";

function App() {
    const [user, setUser] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <div className="App">
            {
                user.length > 0 && loggedIn
                    ? <Home user={user} setUser={setUser} setLoggedIn={setLoggedIn}/>
                : <AuthProvider>
                     <Login setUser={setUser} setLoggedIn={setLoggedIn}/>
                  </AuthProvider>
            }
        </div>
    );
}

export default App;