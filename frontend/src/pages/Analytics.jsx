import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import { getDashboardSummary } from "../services/api";


function Analytics() {


    const [summary, setSummary] = useState({

        totalTasks: 0,

        completedTasks: 0,

        pendingTasks: 0

    });



    useEffect(() => {


        loadAnalytics();


    }, []);




    const loadAnalytics = async () => {


        try {


            const response = await getDashboardSummary();


            setSummary(response.data.summary);


        } catch (error) {


            console.error(
                "Analytics loading error:",
                error
            );


        }


    };



    const completionRate = summary.totalTasks > 0

        ? Math.round(
            (summary.completedTasks / summary.totalTasks) * 100
          )

        : 0;



    return (

        <div className="dashboard-layout">


            <Sidebar />


            <div className="dashboard-main">


                <Navbar />


                <div className="dashboard-content">


                    <div className="welcome-card">


                        <h1>
                            📊 Analytics Dashboard
                        </h1>


                        <p>
                            Track your team's productivity and task performance.
                        </p>


                    </div>





                    <div className="summary-grid">


                        <div className="summary-card">


                            <h5>
                                Total Tasks
                            </h5>


                            <h2 className="blue">

                                {summary.totalTasks}

                            </h2>


                        </div>





                        <div className="summary-card">


                            <h5>
                                Completed
                            </h5>


                            <h2 className="green">

                                {summary.completedTasks}

                            </h2>


                        </div>





                        <div className="summary-card">


                            <h5>
                                Pending
                            </h5>


                            <h2 className="orange">

                                {summary.pendingTasks}

                            </h2>


                        </div>


                    </div>







                    <div className="welcome-card">


                        <h2>
                            Task Completion Rate
                        </h2>




                        <div style={{

                            background:"#e2e8f0",

                            borderRadius:"20px",

                            height:"25px",

                            marginTop:"20px"

                        }}>



                            <div style={{

                                width:`${completionRate}%`,

                                height:"100%",

                                background:
                                "linear-gradient(90deg,#2563eb,#06b6d4)",

                                borderRadius:"20px"

                            }}>


                            </div>



                        </div>



                        <p style={{marginTop:"15px"}}>


                            {completionRate}% tasks completed successfully


                        </p>


                    </div>







                    <div className="welcome-card">


                        <h2>
                            Task Status
                        </h2>


                        <p>
                            🟢 Completed Tasks : {summary.completedTasks}
                        </p>


                        <p>
                            🟡 Pending Tasks : {summary.pendingTasks}
                        </p>


                        <p>
                            📋 Total Tasks : {summary.totalTasks}
                        </p>


                    </div>





                </div>


            </div>


        </div>

    );

}


export default Analytics;
