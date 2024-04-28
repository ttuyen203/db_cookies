import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LoginValues } from "../types/user";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const navigate = useNavigate();

  const onsubmit = (data: LoginValues) => {
    axios.post(BASE_URL + "/login", data).then((res) => {
      console.log(res);
      window.sessionStorage.setItem("access-token", res.data.token);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/list");
    });
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Login</h1>
      <div className="w-50 border rounded shadow p-4">
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              className="form-control mt-1"
              {...register("email", {
                required: "Required",
              })}
            />
            {errors.email && (
              <div className="text-danger mt-2">* {errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="">Password:</label>
            <input
              type="password"
              className="form-control mt-1"
              {...register("password", {
                required: "Required",
              })}
            />
            {errors.password && (
              <div className="text-danger mt-2">
                * {errors.password.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
