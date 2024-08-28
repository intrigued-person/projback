import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Tabs, Tab, Form } from 'react-bootstrap';
import StudentDash from '../../Studedash/StudentDash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ViewStudentApplication() {
  const [application, setApplication] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseName, setCourseName] = useState(''); // New state for course name
  const [tabKey, setTabKey] = useState('personal');
  const [isCourseSubmitted, setIsCourseSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for button disabling
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    // Check if userId is in localStorage and disable the button if true
    const storedUserId = localStorage.getItem("userId");
    setIsButtonDisabled(!!storedUserId);

    // Fetch application details
    axios.get(`http://localhost:9952/findApplicationByUserId/${userId}`)
      .then(res => {
        setApplication(res.data);
        setSelectedCourse(res.data.courseId || '');
        setIsCourseSubmitted(!!res.data.courseId);
      })
      .catch(error => console.error("Error fetching application:", error));

    // Fetch available courses
    axios.get('http://localhost:9952/getAllCourses')
      .then(res => setCourses(res.data))
      .catch(error => console.error("Error fetching courses:", error));
  }, [userId]);

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    setSelectedCourse(selectedCourseId);
    const selectedCourseObj = courses.find(course => course.courseId === selectedCourseId);
    setCourseName(selectedCourseObj ? selectedCourseObj.courseName : '');
  };

  const handleCourseSubmit = () => {
    axios.post('http://localhost:9952/submitCourseChoice', { userId, courseId: selectedCourse })
      .then(() => {
        alert('Course submitted successfully');
        setIsCourseSubmitted(true);
        // Store userId in localStorage and disable the button
        sessionStorage.setItem("userId", userId);
        localStorage.setItem("userId", userId); // Ensure localStorage is also set
        setIsButtonDisabled(true);
        // Store courseName in sessionStorage
        sessionStorage.setItem("courseName", courseName);
      })
      .catch(error => {
        console.error('Failed to submit course:', error);
        alert('Failed to submit course');
      });
  };

  const generatePDF = () => {
    const pdfContent = document.querySelectorAll(".pdf-content");
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm

    pdfContent.forEach((content, index) => {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        if (index > 0) pdf.addPage(); // Add new page for each tab except the first

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        if (index === pdfContent.length - 1) { // Save after processing the last tab
          pdf.save("application-details.pdf");
        }
      });
    });
  };

  return (
    <div>
      <StudentDash />
      <Container className="mt-4">
        <h2 className="text-center mb-4">Application Details</h2>
        <Button variant="primary" onClick={generatePDF} className="mb-4">Download PDF</Button>
        <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} id="application-tabs" className="mb-3">
          <Tab eventKey="personal" title="Personal Information">
            <div className="pdf-content">
              <Card border="primary" className="mb-3">
                <Card.Body>
                  <p><strong>Name:</strong> {application.name}</p>
                  <p><strong>Mobile Number:</strong> {application.mobileNumber}</p>
                  <p><strong>Gender:</strong> {application.gender}</p>
                  <p><strong>Date of Birth:</strong> {application.dob}</p>
                  <p><strong>Religion:</strong> {application.religion}</p>
                </Card.Body>
              </Card>
            </div>
          </Tab>
          <Tab eventKey="parental" title="Parental Information">
            <div className="pdf-content">
              <Card border="primary" className="mb-3">
                <Card.Body>
                  <p><strong>Father's Name:</strong> {application.fatherName}</p>
                  <p><strong>Mother's Name:</strong> {application.motherName}</p>
                  <p><strong>Parents' Mobile:</strong> {application.parentsMobile}</p>
                </Card.Body>
              </Card>
            </div>
          </Tab>
          <Tab eventKey="academic" title="Educational Information">
            <div className="pdf-content">
              <Card border="primary" className="mb-3">
                <Card.Body>
                  <p><strong>SSLC Mark:</strong> {application.sslcMark}</p>
                  <p><strong>Cutoff Mark:</strong> {application.twelthmark}</p>
                  <p><strong>Degree Type:</strong> {application.degreeType}</p>
                  <p><strong>Department:</strong> {application.department?.dept}</p>
                </Card.Body>
              </Card>
            </div>
          </Tab>
          <Tab eventKey="address" title="Address Information">
            <div className="pdf-content">
              <Card border="primary" className="mb-3">
                <Card.Body>
                  <p><strong>Address:</strong> {application.address}</p>
                  <p><strong>State:</strong> {application.state}</p>
                  <p><strong>Pincode:</strong> {application.pincode}</p>
                </Card.Body>
              </Card>
            </div>
          </Tab>
          <Tab eventKey="course" title="Course Selection">
            <div className="pdf-content">
              <Card border="primary" className="mb-3">
                <Card.Body>
                  <Form>
                    <Form.Group controlId="formCourseSelect">
                      <Form.Label>Select Course:</Form.Label>
                      <Form.Control as="select" value={selectedCourse} onChange={handleCourseChange} disabled={isCourseSubmitted}>
                        <option value="">Select...</option>
                        {courses.map(course => (
                          <option key={course.courseId} value={course.courseId}>
                            {course.courseName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={handleCourseSubmit} className="mt-3" disabled={isButtonDisabled || isCourseSubmitted}>
                      Submit Course
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Tab>
          <Tab eventKey="status" title="Application Status">
            <div className="pdf-content">
              <Card border="primary" className="mb-3">
                <Card.Body>
                  {application.status === "Applied" ? (
                    <p><strong>Your application has been waitlisted. We'll keep you updated if a spot becomes available.</strong></p>
                  ) : application.status === 'Confirm' ? (
                    <p style={{ color: "green" }}><strong>Your college application is confirmed! Please report to the campus on 21/08/2024 to complete the admission process. Welcome to the college community!</strong></p>
                  ) : application.status === 'Approved' ? (
                    <>
                      <p><strong>Congratulations! Your application has been approved. Join us at the college on 01/09/2024 to verify your documents. We look forward to seeing you then!</strong></p>
                      <p style={{ color: "red" }}>Note: Please bring your original documents.</p>
                    </>
                  ) : (
                    <p style={{ color: "red" }}><strong>Thank you for your application. Regrettably, your application is not eligible; we won't be moving forward at this time. Best wishes for your education.</strong></p>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default ViewStudentApplication;






