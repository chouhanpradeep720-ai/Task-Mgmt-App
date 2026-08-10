import { useEffect, useState } from "react";

import { 
    getTasks,
    updateTaskStatus,
    deleteTask
} from "../../services/api";


function TaskTable() {


    const [tasks, setTasks] = useState([]);



    const loadTasks = async () => {

        try {

            const response = await getTasks();

            setTasks(response.data);

        } catch(error) {

            console.log("Error fetching tasks:", error);

        }

    };



    useEffect(() => {

        loadTasks();

    }, []);





    const changeStatus = async (id) => {

        try {

            await updateTaskStatus(id, "Completed");

            loadTasks();

        } catch(error) {

            console.log("Status update error:", error);

        }

    };





    const removeTask = async (id) => {

        try {

            await deleteTask(id);

            loadTasks();

        } catch(error) {

            console.log("Delete error:", error);

        }

    };





    return (

        <div className="card mt-4">


            <div className="card-header">

                Tasks

            </div>



            <div className="card-body">


                <table className="table table-striped">


                    <thead>

                        <tr>

                            <th>Task</th>

                            <th>Status</th>

                            <th>Priority</th>

                            <th>Actions</th>

                        </tr>

                    </thead>



                    <tbody>


                    {
                        tasks.map((task)=>(


                            <tr key={task.id}>


                                <td>

                                    {task.title}

                                </td>



                                <td>

                                    {task.status}

                                </td>



                                <td>

                                    {task.priority}

                                </td>




                                <td>


                                    {
                                        task.status !== "Completed" &&

                                        <button

                                            className="btn btn-sm btn-success me-2"

                                            onClick={() => changeStatus(task.id)}

                                        >

                                            Complete

                                        </button>
                                    }





                                    <button

                                        className="btn btn-sm btn-danger"

                                        onClick={() => removeTask(task.id)}

                                    >

                                        Delete

                                    </button>



                                </td>



                            </tr>


                        ))
                    }



                    </tbody>



                </table>


            </div>


        </div>

    );


}



export default TaskTable;
