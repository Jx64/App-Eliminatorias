import '../../assets/css/Signup.css'
import user from "../../assets/img/user.png";
import pass from "../../assets/img/lock.png";
import mail from "../../assets/img/mail.png"

const Signup = () =>{
    return(
        <div className="wrapper">
            <form action="src/components/main/page">
                <h1>Signup</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                    <img src={user} alt="Username"/>
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Email" required/>
                    <img src={mail} alt="Mail"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <img src={pass} alt="Password"/>
                </div>

                <button type="summit" className="btn">Signup</button>
            </form>
        </div>
    )
}

export default Signup;