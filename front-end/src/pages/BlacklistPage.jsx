import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../index.css";
import { api } from "../utilities";

const Blacklist = () => {
  // Declare state vars to hold blacklisted emails and phone numbers
  const [blacklistEmail, setBlacklistEmail] = useState([]);
  const [blacklistPhone, setBlacklistPhone] = useState([]);

  // Fetch blacklisted emails and phone numbers on page load
  useEffect(() => {
    fetchBlacklistEmail();
    fetchBlacklistPhone();
  }, []);

  //load blacklisted emails
  const fetchBlacklistEmail = async () => {
    try {
      const response = await api.get("email/blacklist/"); //api/v1/email/blacklist/
      setBlacklistEmail(response.data);
    } catch (error) {
      console.log("Failed to fetch blacklisted emails", error);
    }
  };

  //load blacklisted phone numbers
  const fetchBlacklistPhone = async () => {
    try {
      const response = await api.get("phone/blacklist/"); //api/v1/phone/blacklist/
      setBlacklistPhone(response.data);
    } catch (error) {
      console.log("Failed to fetch blacklisted numbers", error);
    }
  };

  return (
    <>
      <div>
        <br />
        <br />
        <h1>Email Blacklist</h1>
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
            {blacklistEmail.map(
              (
                email //Map over blacklisted emails and render each row
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
        <h1>Phone Blacklist</h1>
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
            {blacklistPhone.map(
              (
                phone //Map over blacklisted phone numbers and render each row
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

export default Blacklist;
