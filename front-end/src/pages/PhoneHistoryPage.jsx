import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "../index.css";
import { api } from "../utilities";

// Component to display & manage phone history
const PhoneHistory = () => {
  // State to store phone records, control visibility of modal, and hold data being edited
  const [phones, setPhones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPhone, setCurrentPhone] = useState(null);

  // Fetch phone records on page load
  useEffect(() => {
    fetchPhones();
  }, []);

  // Load phone records from API endpoint
  const fetchPhones = async () => {
    try {
      const response = await api.get("phone/all/");
      setPhones(response.data);
    } catch (error) {
      console.log("Failed to fetch emails", error);
    }
  };

  // Delete phone record w/ api record deletion when triggered by deletion button
  const handleDelete = async (phone_number) => {
    try {
      await api.delete(`phone/delete/${phone_number}/`); //api/v1/phone_number/delete/
      fetchPhones(); // Refresh the list after deletion
    } catch (error) {
      console.log("Failed to delete phone", error);
    }
  };

  // Handle/set current phone record for editing and show modal
  const handleEdit = (phone) => {
    setCurrentPhone(phone);
    setShowModal(true);
  };

  // Update phone record w/ api record update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      //THis was a pain to fix due to how the api was structured for fieild name submissions on the backend.
      const updateUrl = `phone/update/${currentPhone.phone_number}/`;
      const updateInfo = {
        is_valid: currentPhone.is_valid,
        location: currentPhone.location,
        country_name: currentPhone.country_name,
        currency_name: currentPhone.currency_name,
      };
      console.log("Look here!", updateInfo, updateUrl);
      await api.put(updateUrl, updateInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Close modal after update & refresh list
      setShowModal(false);
      fetchPhones();
    } catch (error) {
      console.log("Failed to update email", error);
    }
  };

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPhone({
      ...currentPhone,
      [name]: value, // Update current phone record with new value
    });
  };

  return (
    <>
      <br />
      <br />
      <h1>Phone History</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Is Valid</th>
            <th>Location</th>
            <th>Country</th>
            <th>Currency</th>
            <th>Country Flag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {phones.map(
            (
              phone //Same as email history, map over phone records and render each row
            ) => (
              <tr key={phone.id}>
                <td>{phone.phone_number}</td>
                <td>{phone.is_valid.toString()}</td>
                <td>{phone.location}</td>
                <td>{phone.country_name}</td>
                <td>{phone.currency_name}</td>
                <td>{phone.countryFlagEmoji}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(phone.phone_number)}
                  >
                    Delete
                  </Button>{" "}
                  <Button variant="secondary" onClick={() => handleEdit(phone)}>
                    Update
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>

      {/* Modal to update phone records */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="phone"
                name="phone_number"
                readOnly
                value={currentPhone?.phone_number || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Is Valid? (type 'True' or 'False')</Form.Label>
              <Form.Control
                type="text"
                name="is_valid"
                value={currentPhone?.is_valid.toString() || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={currentPhone?.location || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country_name"
                value={currentPhone?.country_name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                name="currency_name"
                value={currentPhone?.currency_name || ""}
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

export default PhoneHistory;
