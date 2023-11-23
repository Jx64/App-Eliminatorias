import '../../assets/css/Signup.css'
import user from "../../assets/img/user.png";
import pass from "../../assets/img/lock.png";
import mail from "../../assets/img/mail.png"
import {useState} from "react";
import {handleSignup} from "../../services/Auth";

const Signup = ({setOnSignup}) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const onRegisterClick = async () => {
        await handleSignup(username, email, password, setOnSignup);
    };

    const handleOnLogin = async () => {
        setOnSignup(false);
    }
    
    return(
        <div className="wrapper">
            <form action="src/components/main/page">
                <h1>Signup</h1>
                <div className="input-box">
                    <input type="text"
                           placeholder="Username"
                           onChange={(e) => setUsername(e.target.value)} required
                    />
                    <img src={user} alt="Username"/>
                </div>
                <div className="input-box">
                    <input type="email"
                           placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)} required
                    />
                    <img src={mail} alt="Username"/>
                </div>
                <div className="input-box">
                    <input type="password"
                           placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)} required
                    />
                    <img src={pass} alt="Username"/>
                </div>

                <button type="button"
                        className="btn"
                        onClick={onRegisterClick}>
                    Signup
                </button>
                <div className="login-link">
                        <p>Have an account? <button className="btnLogin"
                            onClick={handleOnLogin}>
                            Login
                        </button>
                        </p>
                    </div>
            </form>
        </div>
    )
}

export default Signup;