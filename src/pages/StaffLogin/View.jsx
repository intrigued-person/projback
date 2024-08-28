import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "../Navbar/Topnav";
import AdminDashBoard from "../../Admin/AdminDashBoard";

function View() {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:9952/getAllCourses")
            .then((response) => {
                setColumns(Object.keys(response.data[0]));
                setRecords(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    let handleSubmit = (courseId) => {
        const conf = window.confirm("Do you want to delete");
        if (conf) {
            axios
                .delete("http://localhost:9952/courseDelete/" + courseId)
                .then((res) => {
                    alert("record has deleted");
                    navigate("/courseview");
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <div>
            <AdminDashBoard/>
            <div id="body">
                <div className="container ">
                    <h1 id="app2" className="text-center text ">
                        Courses
                    </h1>
                    <div className="text-end">
                        <Link to="/courseAdd" className="btn btn-secondary">
                            Add +
                        </Link>
                    </div>
                    <br />
                    <table className="table table-bordered  table-striped w-100 border bg-white shadow px-5 pb-5 rounded ">
                        <thead>
                            <tr>
                                {columns.map((c, i) => (
                                    <th key={i}>{c}</th>
                                ))}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.courseId}</td>
                                    <td>{d.courseName}</td>
                                    {/* <td>{d.quantity}</td>
                <td>{d.price}</td> */}
                                    <td>
                                        {/* <Link
                                            to={`/update/${d.courseId}`}
                                            className="btn btn-sm btn-primary "
                                            id="btn-upt"
                                        >
                                            update
                                        </Link> */}
                                        <button
                                            onClick={(e) => handleSubmit(d.courseId)}
                                            className="btn btn-sm ms-1 btn-secondary"
                                            id="del-btn"
                                        >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default View;