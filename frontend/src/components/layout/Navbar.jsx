import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Navbar(){


    const navigate = useNavigate();


    const [showNotifications, setShowNotifications] = useState(false);

    const [showProfile, setShowProfile] = useState(false);



    const handleLogout = () => {

        localStorage.removeItem("isLoggedIn");

        localStorage.removeItem("role");

        localStorage.removeItem("user");


        navigate("/");

    };



    const user = JSON.parse(
        localStorage.getItem("user")
    );



    return (

        <header className="navbar">


            <div className="navbar-heading">


                <h2>
                    Task Command Center
                </h2>


                <p>
                    Cloud Commander Management System
                </p>


            </div>





            <div className="navbar-actions">



                <div className="notification-wrapper">


                    <button
                        className="bell"
                        onClick={() =>
                            setShowNotifications(!showNotifications)
                        }
                    >

                        🔔

                    </button>



                    {
                        showNotifications &&

                        <div className="notification-box">


                            <h4>
                                Notifications
                            </h4>


                            <p>
                                ✅ Task completed successfully
                            </p>


                            <p>
                                📝 New task added
                            </p>


                            <p>
                                ⚠️ Pending high priority task
                            </p>


                        </div>

                    }


                </div>





                <div
                    className="user-profile"
                    onClick={() =>
                        setShowProfile(!showProfile)
                    }
                >


                    <div className="user-avatar">

                        CC

                    </div>


                    <div>

                        <strong>
                            {user?.username || "Cloud Commander"}
                        </strong>


                        <small>
                            {user?.role || "Admin"}
                        </small>

                    </div>




                    {
                        showProfile &&

                        <div className="profile-menu">


                            <p>
                                👤 Profile
                            </p>


                            <p>
                                ⚙ Settings
                            </p>


                            <p
                                onClick={handleLogout}
                            >
                                🚪 Logout
                            </p>


                        </div>

                    }



                </div>


            </div>


        </header>

    );


}


export default Navbar;
