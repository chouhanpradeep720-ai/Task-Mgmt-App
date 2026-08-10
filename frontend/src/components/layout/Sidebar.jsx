import { useNavigate } from "react-router-dom";


function Sidebar() {


    const navigate = useNavigate();


    const role = localStorage.getItem("role");

    const isAdmin = role === "admin";



    const goToDashboard = () => {

        navigate("/dashboard");

    };



    const goToTasks = () => {

        const section = document.getElementById("tasks-section");


        if (section) {

            section.scrollIntoView({

                behavior:"smooth"

            });

        }
        else {

            navigate("/tasks");

        }

    };



    const goToAnalytics = () => {

        navigate("/analytics");

    };



    const goToSettings = () => {

        navigate("/settings");

    };



    const goToUsers = () => {

        navigate("/users");

    };



    return (

        <aside className="sidebar">



            <div className="sidebar-brand">


                <div className="logo-circle">

                    ☁️

                </div>



                <div>

                    <h3>
                        Cloud Commander
                    </h3>


                    <span>
                        ZIDD 2.0
                    </span>


                </div>


            </div>





            <div className="menu">



                <div

                    className="menu-item active"

                    onClick={goToDashboard}

                >

                    🏠 Dashboard

                </div>





                <div

                    className="menu-item"

                    onClick={goToTasks}

                >

                    ✅ Tasks

                </div>





                <div

                    className="menu-item"

                    onClick={goToAnalytics}

                >

                    📊 Analytics

                </div>





                {isAdmin && (

                    <div

                        className="menu-item"

                        onClick={goToSettings}

                    >

                        ⚙ Settings

                    </div>

                )}





                {isAdmin && (

                    <div

                        className="menu-item"

                        onClick={goToUsers}

                    >

                        👥 Users

                    </div>

                )}




            </div>






            <div className="status-box">


                <h4>
                    System Status
                </h4>


                <p>
                    🟢 API Server Online
                </p>


                <p>
                    🟢 Database Connected
                </p>


            </div>




        </aside>

    );

}



export default Sidebar;
