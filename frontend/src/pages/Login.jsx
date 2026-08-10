import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

import { loginUser } from "../services/api";


function Login() {


    const navigate = useNavigate();


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");



    const handleLogin = async (e) => {

        e.preventDefault();


        try {


            const response = await loginUser({

                username,

                password

            });



            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

	   localStorage.setItem(
              "role",
           response.data.user.role
           );

		


            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );


            navigate("/dashboard");



        } catch (error) {


            alert(
                "Invalid username or password"
            );


        }


    };



    return (


        <div className="login-page">



            <div className="login-card">



                <div className="login-logo">


                    <div className="cloud-icon">

                        ☁️

                    </div>



                    <h1>
                        Cloud Commander
                    </h1>



                    <p>
                        Cloud Native Task Management Platform
                    </p>



                    <span>
                        Manage • Deploy • Monitor
                    </span>



                    <div className="zidd-badge">

                        ZIDD 2.0

                    </div>


                </div>





                <form onSubmit={handleLogin}>


                    <label>
                        Username
                    </label>



                    <input

                        type="text"

                        placeholder="Enter username"

                        value={username}

                        onChange={(e)=>setUsername(e.target.value)}

                    />





                    <label>
                        Password
                    </label>



                    <input

                        type="password"

                        placeholder="Enter password"

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                    />





                    <div className="login-options">


                        <label>

                            <input type="checkbox"/>

                            Remember me

                        </label>



                        <span>
                            Forgot password?
                        </span>


                    </div>





                    <button type="submit">

                        🚀 Sign In

                    </button>



                </form>





                <div className="login-footer">


                    <p>
                        Built by Cloud Commander Team
                    </p>



                    <small>
                        React • Node.js • PostgreSQL • Docker • Kubernetes
                    </small>


                </div>



            </div>



        </div>


    );


}


export default Login;
