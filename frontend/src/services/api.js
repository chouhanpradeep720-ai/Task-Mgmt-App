import axios from "axios";


const api = axios.create({

    baseURL: "http://localhost:5000/api"

});


// Get all tasks
export const getTasks = () => {

    return api.get("/tasks");

};


// Create new task
export const createTask = (task) => {

    return api.post("/tasks", task);

};


// Delete task
export const deleteTask = (id) => {

    return api.delete(`/tasks/${id}`);

};


// Update task status
export const updateTaskStatus = (id, status) => {

    return api.patch(`/tasks/${id}/status`, {
        status
    });

};

export const getDashboardSummary = () => {
    return api.get("/tasks/dashboard");
};

export const loginUser = (data) => {

    return api.post(
        "/auth/login",
        data
    );

};
export default api;
