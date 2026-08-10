import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import TaskForm from "../components/task/TaskForm";
import TaskTable from "../components/task/TaskTable";

function Tasks() {
    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Navbar />

                <div className="dashboard-content">

                    <div className="welcome-card">

                        <h1>Task Management</h1>

                        <p>
                            Create, update and manage all your tasks.
                        </p>

                    </div>

                    <TaskForm />

                    <TaskTable />

                </div>

            </div>

        </div>
    );
}

export default Tasks;
