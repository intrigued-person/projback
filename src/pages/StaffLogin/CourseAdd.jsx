import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./App2.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Topnav from "../Navbar/Topnav";
import AdminDashBoard from "../../Admin/AdminDashBoard";

function CourseAdd() {
  const [inputData, setInputData] = useState({
   
    courseName:"",
    
  });

  

  const navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    let result = validateValues(inputData);

    if (result === true) {
      axios
       .post("http://localhost:9952/addCourse", inputData)
       .then((res) => {
          alert("Data added Successfully");
          navigate("/courseview");
          console.log(res.data);
        })
       .catch((err) => console.log(err));
    } else {
      alert("Please Enter the Valid Inputs!!!");
    }
  };
  const validateValues = (inputData) => {
    if (inputData.courseName.length === 0) {
      alert("Please enter course name!!! ");
      return false;
    } 
    else {
      return true;
    }
  };
  return (
    <div>
        <AdminDashBoard />
    
    <div id="add2" className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary p-5 text-light">
        <form onSubmit={handleSubmit}>
          <center><h1 role="heading">Registration</h1></center>
          <div>
            <label htmlFor="pname" role="prodlabel">Course name:</label>
            <input type="text" name="courseName" className="form-control" role="prod" onChange={(e) =>
              setInputData({...inputData, courseName: e.target.value })
            } />
          </div>
          {/* <div>
            <label htmlFor="quantity" role="quanlabel">Quantity:</label>
            <input type="text" name="quantity" className="form-control" role="quan" onChange={(e) =>
              setInputData({...inputData, quantity: e.target.value })
            } />
          </div>
          <div>
            <label htmlFor="price" role="prclabel">Price:</label>
            <input type="text" name="price" className="form-control" role="prc" onChange={(e) =>
              setInputData({...inputData, price: e.target.value })
            } />
          </div> */}
          <br />
          <center><button className="btn btn-info" id="sub" data-testid="sub-prod">Submit</button></center>
        </form>
      </div>
    </div>
    </div>
  );
}
export default CourseAdd;
