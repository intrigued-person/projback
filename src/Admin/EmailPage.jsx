import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const EmailPage = () => {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // New state to track email sending status

  const handleSendEmailToAll = async () => {
    const formData = new FormData();
    formData.append('subject', emailSubject);
    formData.append('body', emailBody);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await axios.post('http://localhost:9952/api/sendEmailToAll', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setNotificationVisible(true);
        setEmailSent(true); // Set emailSent to true when email is sent
        console.log('Email sent successfully:', response.data);
      } else {
        console.error('Failed to send email:', response.data);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  return (
    <Container className="email-page mt-5">
      <h2 className="text-center mb-4">Send Email to All Users</h2>
      
      {notificationVisible && (
        <Alert variant="success" onClose={() => setNotificationVisible(false)} dismissible>
          <Alert.Heading>Email Sent</Alert.Heading>
          <p>Your email has been sent successfully.</p>
        </Alert>
      )}
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email Subject</Form.Label>
          <Form.Control
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Enter email subject"
            disabled={emailSent} // Disable input if email is sent
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            placeholder="Enter email body"
            disabled={emailSent} // Disable input if email is sent
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Attachment</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            disabled={emailSent} // Disable file input if email is sent
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSendEmailToAll}
          disabled={emailSent} // Disable button if email is sent
        >
          Send Email
        </Button>
      </Form>
    </Container>
  );
};

export default EmailPage;

