import React from 'react'
import "../App.css";
import { MdClose } from "react-icons/md";

const FormTable = ({handelSubmit,handleChange,handleClose,rest}) => {
  return (
    <div>
      <div className="addContainer">
            <form onSubmit={handelSubmit}>
              <div className="close-btn" onClick={handleClose}>
                <MdClose />
              </div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={rest.name}
                onChange={handleChange}
              />

              <label htmlFor="email">Email : </label>
              <input
                type="email"
                id="email"
                name="email"
                value={rest.email}
                onChange={handleChange}
              />

              <label htmlFor="mobile">Mobile : </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={rest.mobile}
                onChange={handleChange}
              />

              <button className="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
    </div>
  )
}

export default FormTable
