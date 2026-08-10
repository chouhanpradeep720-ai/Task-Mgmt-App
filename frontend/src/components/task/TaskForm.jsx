import { useState } from "react";
import { createTask } from "../../services/api";


function TaskForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");


    const handleSubmit = async () => {

        try {

            await createTask({
                title,
                description,
                priority,
                status: "Pending",
                dueDate
            });


            alert("Task Added");

            window.location.reload();


        } catch(error) {

            console.log("Error adding task:", error);

        }

    };


    return (

        <div className="card mt-4">

            <div className="card-header">
                Add New Task
            </div>


            <div className="card-body">


                <input
                    className="form-control mb-3"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />


                <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />


                <select
                    className="form-control mb-3"
                    value={priority}
                    onChange={(e)=>setPriority(e.target.value)}
                >

                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>

                </select>


                <input
                    type="date"
                    className="form-control mb-3"
                    value={dueDate}
                    onChange={(e)=>setDueDate(e.target.value)}
                />


                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Add Task
                </button>


            </div>

        </div>

    );

}


export default TaskForm;
