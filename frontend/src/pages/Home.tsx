import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { ApiRes, Cookie } from "../types/cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState<Cookie[]>([]);

  useEffect(() => {
    axios
      .get<ApiRes>(BASE_URL + "/cookies")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch(() => {
        console.log("Error!");
      });
  }, []);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      title: "Copied!",
      icon: "success",
    });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(BASE_URL + "/cookies/" + id).then(() => {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-4">
      <h1>List</h1>
      <div className="w-100 border rounded shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to={`/add`}>
            <button className="btn btn-success">Add +</button>
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th className="w-25">Text</th>
              <th className="text-center">Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d) => (
              <tr key={d._id}>
                <td>{d._id}</td>
                <td
                  className="w-50"
                  style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {d.text}
                </td>
                <td className="text-center fw-medium text-primary">{d.category}</td>
                <td className="text-center">
                  <Link to={`/update/${d._id}`}>
                    <button className="btn btn-primary me-2">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(d._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleCopyText(d.text)}
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
