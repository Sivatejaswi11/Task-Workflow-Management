import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from "./Login";

import Dashboard from "./Dashboard";

import UserDashboard from "./UserDashboard";

import Profile from "./Profile";





function AdminRoute() {


    const role = localStorage.getItem("role");


    if (role === "admin") {


        return <Dashboard />;


    }


    return <Navigate to="/user" />;



}





function UserRoute() {


    const role = localStorage.getItem("role");


    if (role === "user") {


        return <UserDashboard />;


    }


    return <Navigate to="/admin" />;



}





function App() {


    return (



        <BrowserRouter>


            <Routes>





                <Route

                    path="/"

                    element={<Login />}

                />







                <Route

                    path="/admin"

                    element={<AdminRoute />}

                />







                <Route

                    path="/user"

                    element={<UserRoute />}

                />








                <Route

                    path="/profile"

                    element={<Profile />}

                />





            </Routes>


        </BrowserRouter>



    );


}



export default App;