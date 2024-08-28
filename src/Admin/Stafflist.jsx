import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminDashBoard from "./AdminDashBoard";
import './StaffList.css'; // Import custom CSS file

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9952/getAllStaffs")
      .then((res) => {
        setStaffList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching staff list:", error);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:9952/deleteStaff/${selectedStaffId}`)
      .then((res) => {
        if (res.status === 200) {
          setStaffList(staffList.filter((staff) => staff.staffId !== selectedStaffId));
          setShowModal(false);
        }
      })
      .catch((error) => {
        console.error("Error deleting staff:", error);
      });
  };

  const handleShowModal = (id) => {
    setSelectedStaffId(id);
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
          <Link to="/AddStaff" className="text-decoration-none">
            <Button className="add-staff-button">Add Staff</Button>
          </Link>
        </div>
        <h2 className='text-center mb-lg-5'>Staff Details</h2>
       
        <Table striped bordered hover responsive>
          <thead>
            <tr className='text-center'>
              <th>Staff ID</th>
              <th>Staff Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr className='text-center' key={staff.staffId}>
                <td>{staff.staffId}</td>
                <td>{staff.staffName}</td>
                <td>{staff.role}</td>
                <td>{staff.counsellorMobile}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModal(staff.staffId)}
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
        <Modal.Body>Are you sure you want to delete this staff member?</Modal.Body>
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

export default StaffList;

