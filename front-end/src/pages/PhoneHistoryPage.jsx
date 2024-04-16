import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "../index.css";
import { api } from "../utilities";

const PhoneHistory = () => {
  const [phones, setPhones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPhone, setCurrentPhone] = useState(null);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    try {
      const response = await api.get("phone/all/");
      setPhones(response.data);
    } catch (error) {
      console.log("Failed to fetch emails", error);
    }
  };

  const handleDelete = async (phone_number) => {
    try {
      //api/v1/phone_number/delete/
      await api.delete(`phone/delete/${phone_number}/`);
      fetchPhones(); // Refresh the list after deletion
    } catch (error) {
      console.log("Failed to delete phone", error);
    }
  };

  const handleEdit = (phone) => {
    setCurrentPhone(phone);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
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
      setShowModal(false);
      fetchPhones(); // Refresh the list after update
    } catch (error) {
      console.log("Failed to update email", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPhone({
      ...currentPhone,
      [name]: value,
    });
  };

  return (
    <>
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
          {phones.map((phone) => (
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
          ))}
        </tbody>
      </Table>

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
