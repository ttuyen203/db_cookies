import { useForm } from "react-hook-form";
import { FormValues } from "../types/cookie";
import axios from "axios";
import { BASE_URL } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onsubmit = (data: FormValues) => {
    axios.post(BASE_URL + "/cookies", data).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/list")
    });
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Add</h1>
      <div className="w-50 border rounded shadow p-4">
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <label htmlFor="">Text:</label>
            <input
              type="text"
              className="form-control mt-1"
              {...register("text", {
                required: "Required",
              })}
            />
            {errors.text && (
              <div className="text-danger mt-2">* {errors.text.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="">Category:</label>
            <input
              type="category"
              className="form-control mt-1"
              {...register("category", {
                required: "Required",
              })}
            />
            {errors.category && (
              <div className="text-danger mt-2">* {errors.category.message}</div>
            )}
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
