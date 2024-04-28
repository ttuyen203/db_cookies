import "./App.css";
import { ElementType } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Add_Home from "./pages/Add_Home";

interface ProtectedRouteProps {
  element: ElementType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  ...rest
}) => {
  const accessToken = window.sessionStorage.getItem("access-token");

  useEffect(() => {
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng đăng nhập để tiếp tục!",
      });
    }
  }, [accessToken]);

  return accessToken ? <Component {...rest} /> : <Navigate to="/login" />;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<ProtectedRoute element={Home} />} />
        <Route path="/" element={<Add_Home />}></Route>
        <Route path="/add" element={<ProtectedRoute element={Add} />} />
        <Route path="/update/:id" element={<ProtectedRoute element={Update} />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
