import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";


import ProtectedRoute from "./components/ProtectedRoute";



function App() {


    return (


        <BrowserRouter>


            <Routes>



                <Route

                    path="/"

                    element={<Login />}

                />





                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/tasks"

                    element={

                        <ProtectedRoute>

                            <Tasks />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/analytics"

                    element={

                        <ProtectedRoute>

                            <Analytics />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/settings"

                    element={

                        <ProtectedRoute adminOnly={true}>

                            <Settings />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/users"

                    element={

                        <ProtectedRoute adminOnly={true}>

                            <Users />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="*"

                    element={<NotFound />}

                />



            </Routes>


        </BrowserRouter>


    );


}


export default App;
