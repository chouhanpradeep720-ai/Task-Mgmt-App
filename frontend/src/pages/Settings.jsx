import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";


function Settings() {

    return (

        <div className="dashboard-layout">


            <Sidebar />


            <div className="dashboard-main">


                <Navbar />


                <div className="dashboard-content">



                    <div className="settings-container">



                        <div className="settings-header">

                            <h1>
                                ⚙ Settings
                            </h1>

                            <p>
                                Manage your Cloud Commander workspace settings.
                            </p>

                        </div>




                        <div className="settings-card">


                            <h3>
                                👤 Profile Information
                            </h3>


                            <div className="settings-row">

                                <label>
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value="Cloud Commander"
                                    readOnly
                                />

                            </div>



                            <div className="settings-row">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value="commander@example.com"
                                    readOnly
                                />

                            </div>


                        </div>






                        <div className="settings-card">


                            <h3>
                                🔐 Security
                            </h3>


                            <button className="settings-btn">

                                Change Password

                            </button>


                            <button className="settings-btn">

                                Enable Two Factor Authentication

                            </button>


                        </div>






                        <div className="settings-card">


                            <h3>
                                🔔 Notifications
                            </h3>


                            <div className="toggle-row">

                                <span>
                                    Email Notifications
                                </span>


                                <input
                                    type="checkbox"
                                    defaultChecked
                                />

                            </div>



                            <div className="toggle-row">

                                <span>
                                    Task Updates
                                </span>


                                <input
                                    type="checkbox"
                                    defaultChecked
                                />

                            </div>


                        </div>






                        <div className="settings-card danger">


                            <h3>
                                🚪 Account
                            </h3>


                            <button className="logout-btn">

                                Logout

                            </button>


                        </div>




                    </div>


                </div>


            </div>


        </div>

    );

}


export default Settings;
