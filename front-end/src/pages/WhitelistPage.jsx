import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../index.css";
import { api } from "../utilities";

// Declare state vars to hold whitelisted emails and phone numbers
const Whitelist = () => {
  const [whitelistEmail, setWhitelistEmail] = useState([]);
  const [whitelistPhone, setWhitelistPhone] = useState([]);

  // Fetch whitelisted emails and phone numbers on page load
  useEffect(() => {
    fetchWhitelistEmail();
    fetchWhitelistPhone();
  }, []);

  // Load whitelisted emails
  const fetchWhitelistEmail = async () => {
    try {
      const response = await api.get("email/whitelist/"); //api/v1/email/blacklist/
      setWhitelistEmail(response.data);
    } catch (error) {
      console.log("Failed to fetch whitelisted emails", error);
    }
  };

  // Load whitelisted phone numbers
  const fetchWhitelistPhone = async () => {
    try {
      const response = await api.get("phone/whitelist/"); //api/v1/phone/blacklist/
      setWhitelistPhone(response.data);
    } catch (error) {
      console.log("Failed to fetch whitelisted numbers", error);
    }
  };

  return (
    <>
      <div>
        <br />
        <br />
        <h1>Email Whitelist</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email Address</th>
              <th>Is Valid</th>
              <th>Is Known Spammer Domain</th>
              <th>Is Mail Server Defined</th>
            </tr>
          </thead>
          <tbody>
            {whitelistEmail.map(
              (
                email //Map over whitelisted emails and render each row
              ) => (
                <tr key={email.id}>
                  <td>{email.email_address}</td>
                  <td>{email.is_valid.toString()}</td>
                  <td>{email.isKnownSpammerDomain.toString()}</td>
                  <td>{email.isMailServerDefined.toString()}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
      <br />
      <br />
      <div>
        <h1>Phone Whitelist</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Phone Numbers</th>
              <th>Is Valid</th>
              <th>Location</th>
              <th>Country</th>
              <th>Country Flag</th>
            </tr>
          </thead>
          <tbody>
            {whitelistPhone.map(
              (
                phone //Map over whitelisted phone numbers and render each row
              ) => (
                <tr key={phone.id}>
                  <td>{phone.phone_number}</td>
                  <td>{phone.is_valid.toString()}</td>
                  <td>{phone.location}</td>
                  <td>{phone.country_name}</td>
                  <td>{phone.countryFlagEmoji}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Whitelist;
