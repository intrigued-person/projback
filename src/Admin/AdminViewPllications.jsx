import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Table, Form, Alert } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import AdminDashBoard from "./AdminDashBoard";
import './AdminViewApplications.css';

const AdminViewPplications = () => {
  const [showModal, setShowModal] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState({});
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    sortBy10th: false,
    sortBy12th: true,
  });
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applications, filterOptions]);

  const fetchApplications = () => {
    axios.get("http://localhost:9952/getAllApplications")
      .then(response => setApplications(response.data))
      .catch(error => console.error("Error fetching applications:", error));
  };

  const applyFilters = () => {
    let filtered = [...applications];
    if (filterOptions.sortBy12th) {
      filtered.sort((a, b) => b.twelthmark - a.twelthmark);
    }
    if (filterOptions.sortBy10th) {
      filtered.sort((a, b) => b.sslcMark - a.sslcMark);
    }
    filtered = filtered.map((app, index) => ({ ...app, rank: index + 1 }));

    setFilteredApplications(filtered);
  };

  const handleApprove = (applicationId, status) => {
    axios.post(`http://localhost:9952/updateStatus?applicationId=${applicationId}&status=${status}`)
      .then(() => fetchApplications())
      .catch(error => console.error("Error updating status:", error));
  };

  const handleCloseModal = () => setShowModal(false);

  const handleViewDocument = async (applicationId) => {
    try {
      const response = await axios.get(`http://localhost:9952/findByID/${applicationId}`);
      setApplicationDetails(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const toggleFilter = (filterType) => {
    setFilterOptions(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const generateAndUploadRankListPDF = () => {
    const doc = new jsPDF();
    doc.text("Rank List", 10, 10);

    const tableColumns = ["Rank", "Name", "10th Mark (SSLC)", "12th Mark", "Selected Course"];
    const tableData = filteredApplications.map(app => [
        app.rank,
        app.name,
        app.sslcMark,
        app.twelthmark,
        app.selectedCourse || 'N/A'
    ]);

    doc.autoTable({
        head: [tableColumns],
        body: tableData,
        startY: 20,
        margin: { top: 30 },
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
        alternateRowStyles: { fillColor: [240, 240, 240] }
    });

    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    formData.append('file', pdfBlob, 'rank-list.pdf');

    axios.post('http://localhost:9952/api/uploadFilesIntoDB', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => console.log('PDF uploaded successfully:', response.data))
    .catch(error => console.error('Error uploading PDF:', error));
  };

  const generateAndDownloadRankListPDF = () => {
    const doc = new jsPDF();
    doc.text("Rank List", 10, 10);

    const tableColumns = ["Rank", "Name", "10th Mark (SSLC)", "12th Mark", "Selected Course"];
    const tableData = filteredApplications.map(app => [
        app.rank,
        app.name,
        app.sslcMark,
        app.twelthmark,
        app.selectedCourse || 'N/A'
    ]);

    doc.autoTable({
        head: [tableColumns],
        body: tableData,
        startY: 20,
        margin: { top: 30 },
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
        alternateRowStyles: { fillColor: [240, 240, 240] }
    });

    doc.save('rank-list.pdf');
  };

  const handleGenerateRankList = () => {
    generateAndUploadRankListPDF();
    generateAndDownloadRankListPDF();
    setNotificationVisible(true);
  };

  return (
    <div>
      <AdminDashBoard />
      <Container fluid className="w-100 admin-container">
        <h2 className="text-center mb-4">Student Applications</h2>

        <div className="d-flex justify-content-between mb-4">
          <Button 
            variant="info" 
            onClick={handleGenerateRankList}
          >
            Generate Rank List PDF
          </Button>
          <Link to="/email" className="btn btn-primary">
            Go to Email Page
          </Link>
        </div>

        {notificationVisible && (
          <Alert variant="success" onClose={() => setNotificationVisible(false)} dismissible>
            <Alert.Heading>Rank List Generated</Alert.Heading>
            <p>Rank list has been generated and downloaded successfully.</p>
          </Alert>
        )}

        <Form className="mb-4 filter-form">
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Sort by SSLC Marks"
              checked={filterOptions.sortBy10th}
              onChange={() => toggleFilter('sortBy10th')}
            />
            <Form.Check
              type="checkbox"
              label="Sort by 12th Marks"
              checked={filterOptions.sortBy12th}
              onChange={() => toggleFilter('sortBy12th')}
            />
          </Form.Group>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>SSLC Mark</th>
              <th>Cutoff Mark (12th)</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Selected Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.applicationId}>
                <td>{app.rank}</td>
                <td>{app.name}</td>
                <td>{app.sslcMark}</td>
                <td>{app.twelthmark}</td>
                <td>{app.gender}</td>
                <td>
                  {app.status === "Applied" ? (
                    "Pending"
                  ) : app.status === "Confirm" ? (
                    <span className="status-label confirm">Confirmed</span>
                  ) : app.status === "Reject" ? (
                    <span className="status-label reject">Rejected</span>
                  ) : (
                    <span className="status-label approved">Approved</span>
                  )}
                </td>
                <td>{app.selectedCourse || 'N/A'}</td>
                <td>
                  {app.status === "Applied" && (
                    <Button
                      variant="primary"
                      onClick={() => handleApprove(app.applicationId, "Approved")}
                    >
                      Approve
                    </Button>
                  )}
                  &nbsp;
                  {app.status === "Approved" && (
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleApprove(app.applicationId, "Confirm")}
                        className="me-2"
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleApprove(app.applicationId, "Reject")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                      variant="info"
                      onClick={() => handleViewDocument(app.applicationId)}
                    >
                      View Documents
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Document Viewer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {applicationDetails.profileImage ? (
              <img
                src={`data:image/jpeg;base64,${applicationDetails.profileImage}`}
                alt="Document"
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <p>No document available</p>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminViewPplications;












