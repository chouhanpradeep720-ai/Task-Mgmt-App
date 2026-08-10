import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import SummaryCard from "../components/dashboard/SummaryCard";

import TaskForm from "../components/task/TaskForm";
import TaskTable from "../components/task/TaskTable";

import { getDashboardSummary } from "../services/api";


function Dashboard() {


    const [summary, setSummary] = useState({

        totalTasks: 0,

        completedTasks: 0,

        pendingTasks: 0

    });



    useEffect(() => {

        loadSummary();

    }, []);




    const loadSummary = async () => {

        try {

            const response = await getDashboardSummary();

            setSummary(response.data.summary);


        } catch(error) {

            console.error(
                "Dashboard summary error:",
                error
            );

        }

    };





    return (

        <div className="dashboard-layout">


            <Sidebar />


            <div className="dashboard-main">


                <Navbar />


                <div className="dashboard-content">



                    <div
                        id="dashboard-top"
                        className="welcome-card"
                    >

                        <h1>
                            Welcome Commander 👋
                        </h1>


                        <p>
                            Manage your cloud tasks from one powerful workspace.
                        </p>


                    </div>





                    <div className="summary-grid">



                        <SummaryCard

                            title="Total Tasks"

                            value={summary.totalTasks}

                            color="blue"

                            icon="📋"

                        />




                        <SummaryCard

                            title="Completed"

                            value={summary.completedTasks}

                            color="green"

                            icon="✅"

                        />




                        <SummaryCard

                            title="Pending"

                            value={summary.pendingTasks}

                            color="orange"

                            icon="⏳"

                        />



                    </div>





                    <div id="tasks-section">


                        <TaskForm />


                        <TaskTable />


                    </div>



                </div>


            </div>


        </div>

    );

}


export default Dashboard;
