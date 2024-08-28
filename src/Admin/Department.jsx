import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminDashBoard from "./AdminDashBoard";
import './Department.css'; // Import custom CSS file

const Department = () => {
  const [department, setDepartment] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9952/getDepts")
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((error) => {
        console.error("Error fetching Department List:", error);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:9952/deptDelete/${selectedDeptId}`)
      .then((res) => {
        if (res.status === 200) {
          // Remove deleted department from the state
          setDepartment(department.filter((dept) => dept.id !== selectedDeptId));
          setShowModal(false); // Close modal after successful deletion
        }
      })
      .catch((error) => {
        console.error("Error deleting department:", error);
      });
  };

  const handleShowModal = (id) => {
    setSelectedDeptId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <AdminDashBoard />
      <div className="user-table-container p-lg-5">
        <div className="d-flex justify-content-end mb-4">
          <Link to="/AddDepartment" className="text-decoration-none">
            <Button className="add-department-button" data-testid="addstaff btn">Add Department</Button>
          </Link>
        </div>
        <h2 className='text-center mb-lg-5' role="dept-heading">Department Details</h2>
        
        <Table striped bordered hover responsive>
          <thead>
            <tr className='text-center'>
              <th role="dept-id">Department ID</th>
              <th role="dept-name">Degree Name</th>
              <th role="dept-course">Course Type</th>
              <th role="dept-vacancy">Vacancy</th>
              <th role="dept-action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {department.map((dept) => (
              <tr className='text-center' key={dept.id}>
                <td>{dept.id}</td>
                <td>{dept.dept}</td>
                <td>{dept.courseType}</td>
                <td>{dept.vacancy}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModal(dept.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this department?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Department;

