import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import api from "../services/api";


function Users() {


    const [users, setUsers] = useState([]);

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");



    const loadUsers = async () => {

        try {

            const response = await api.get("/users");

            setUsers(response.data);

        } 
        catch(error) {

            console.log(error);

        }

    };



    useEffect(() => {

        loadUsers();

    }, []);





    const createUser = async (e) => {

        e.preventDefault();


        try {

            await api.post("/users", {

                username,

                password,

                role:"user"

            });


            setUsername("");

            setPassword("");


            loadUsers();


        } 
        catch(error) {

            alert("User creation failed");

        }

    };





    const deleteUser = async (id) => {

        try {

            await api.delete(`/users/${id}`);

            loadUsers();

        } 
        catch(error) {

            alert(
                error.response?.data?.message ||
                "Delete failed"
            );

        }

    };





    return (

        <div className="dashboard-layout">


            <Sidebar />



            <div className="dashboard-main">


                <Navbar />



                <div className="dashboard-content">



                    <div className="welcome-card">


                        <h1>
                            👥 User Management
                        </h1>


                        <p>
                            Create and manage Cloud Commander users.
                        </p>


                    </div>





                    <div className="welcome-card">


                        <h2>
                            Create New User
                        </h2>



                        <form
                            className="user-form"
                            onSubmit={createUser}
                        >


                            <input

                                placeholder="Username"

                                value={username}

                                onChange={(e)=>
                                    setUsername(e.target.value)
                                }

                            />



                            <input

                                type="password"

                                placeholder="Password"

                                value={password}

                                onChange={(e)=>
                                    setPassword(e.target.value)
                                }

                            />



                            <button className="primary-btn">

                                Create User

                            </button>


                        </form>


                    </div>







                    <div className="welcome-card">


                        <h2>
                            Users List
                        </h2>



                        {

                            users.map((user)=>(


                                <div

                                    className="user-row"

                                    key={user.id}

                                >



                                    <div className="user-info">


                                        <strong>
                                            {user.username}
                                        </strong>



                                        <p>

                                            ID: {user.id}

                                        </p>



                                        <span

                                            className={
                                                user.role === "admin"
                                                ?
                                                "role-admin"
                                                :
                                                "role-user"
                                            }

                                        >

                                            {user.role}

                                        </span>


                                    </div>





                                    <button

                                        className="delete-btn"

                                        onClick={()=>
                                            deleteUser(user.id)
                                        }

                                    >

                                        🗑 Delete

                                    </button>



                                </div>


                            ))

                        }


                    </div>





                </div>


            </div>


        </div>

    );

}


export default Users;
