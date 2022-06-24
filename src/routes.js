import { Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Img from "./pages/Img";

export default function Router() {
  return useRoutes([
    { path: "/", element: <Login /> },
    { path: "/productos", element: <Products /> },
    { path: "/clientes", element: <Customers /> },
    { path: "/img", element: <Img /> },
  ]);
}
