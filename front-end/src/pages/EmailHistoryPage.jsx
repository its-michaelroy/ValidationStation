import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "../index.css";
import { api } from "../utilities";

const EmailHistory = () => {
  const [emails, setEmails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await api.get("email/all/");
      setEmails(response.data);
    } catch (error) {
      console.log("Failed to fetch emails", error);
    }
  };

  const handleDelete = async (email_address) => {
    try {
      //api/v1/email/delete/
      await api.delete(`email/delete/${email_address}/`);
      fetchEmails(); // Refresh the list after deletion
    } catch (error) {
      console.log("Failed to delete email", error);
    }
  };

  const handleEdit = (email) => {
    setCurrentEmail(email);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateUrl = `email/update/${currentEmail.email_address}/`;
      const updateInfo = {
        is_valid: currentEmail.is_valid,
        isKnownSpammerDomain: currentEmail.isKnownSpammerDomain,
      };
      console.log("Look here!", updateInfo, updateUrl);
      await api.put(updateUrl, updateInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowModal(false);
      fetchEmails(); // Refresh the list after update
    } catch (error) {
      console.log("Failed to update email", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmail({
      ...currentEmail,
      [name]: value,
    });
  };

  return (
    <>
      <br />
      <br />
      <h1>Email History</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email Address</th>
            <th>Is Valid</th>
            <th>Is Spam</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{email.email_address}</td>
              <td>{email.is_valid.toString()}</td>
              <td>{email.isKnownSpammerDomain.toString()}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(email.email_address)}
                >
                  Delete
                </Button>{" "}
                <Button variant="secondary" onClick={() => handleEdit(email)}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email_address"
                readOnly
                value={currentEmail?.email_address || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Is Valid? (type 'True' or 'False')</Form.Label>
              <Form.Control
                type="text"
                name="is_valid"
                value={currentEmail?.is_valid.toString() || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Is Known Spammer Domain? (type 'True' or 'False')
              </Form.Label>
              <Form.Control
                type="text"
                name="isKnownSpammerDomain"
                value={currentEmail?.isKnownSpammerDomain.toString() || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmailHistory;
