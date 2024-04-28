import { useForm } from "react-hook-form";
import { FormValues } from "../types/cookie";
import axios from "axios";
import { BASE_URL } from "../config";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Update = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(BASE_URL + "/cookies/" + id).then((res) => {
      console.log(res);
      setValue("text", res.data.data.text);
      setValue("category", res.data.data.category);
    });
  }, [setValue, id]);

  const onsubmit = (data: FormValues) => {
    axios.put(BASE_URL + "/cookies/" + id, data).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/list");
    });
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Update</h1>
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
              <div className="text-danger mt-2">
                * {errors.category.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
