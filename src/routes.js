import {Navigate, useRoutes} from "react-router-dom";
import Login from "./pages/Login"
import Products from "./pages/Products";

export default function Router (){

    return useRoutes([
        {path:"/", element: <Login />},
        {path:"/productos", element: <Products />}
    ])
}