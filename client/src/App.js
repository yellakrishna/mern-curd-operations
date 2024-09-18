import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";
import FormTable from "./components/FormTable";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);

  // functionalitys...

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // post use form store...
  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);

    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  },[]);


// delete api...
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
    }
  };
  

  //update api ...
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    console.log(data);
    if (data.data.success) {
      getFetchData();
    }
    setEditSection(false);
  };

  const handleEditChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-info" onClick={() => setAddSection(true)}>
          Add
        </button>

        {addSection && (
          <FormTable
            handelSubmit={handelSubmit} //post
            handleChange={handleChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
          />
        )}

        {editSection && (
          <FormTable
            handelSubmit={handleUpdate}  // put
            handleChange={handleEditChange}
            handleClose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer ">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody >
              {dataList[0] ? (
                dataList.map((el) => {
                  return (
                    <tr >
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button
                          className="mx-3 m-2 btn btn-info"
                          onClick={() => {
                            handleEdit(el);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger m-2 my-2"
                          onClick={() => handleDelete(el._id)} // delete
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="text-center mt-4 ">No Data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
