import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../index.css";
import { api } from "../utilities";

const MainPage = () => {
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [emailDetails, setEmailDetails] = useState(null);
  const [icon, setIcon] = useState(null);

  const [phone, setPhone] = useState("");
  const [submitPhone, setSubmitPhone] = useState(false);
  const [phoneDetails, setPhoneDetails] = useState(null);
  const [iconPhone, setIconPhone] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(false);
    try {
      const newemail = { email_address: email };
      console.log("email", newemail);
      const response = await api.post("email/", newemail);
      if (response.status === 201) {
        console.log("email sent", response.data);
        setSubmit(true);

        console.log("emailId", email);
        fetchEmailDetails(email);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchEmailDetails = async (identifier) => {
    try {
      const response = await api.get(`email/single_record/${identifier}`); // get single record
      if (response.status === 200) {
        // const responseData = JSON(response.data)
        // console.log('email details:', responseData);
        setEmailDetails(response.data);
        fetchIconInfo(
          response.data.isKnownSpammerDomain,
          response.data.is_valid
        );
      }
    } catch (error) {
      console.log("error fetching email:", error);
    }
  };

  const fetchIconInfo = async (isSpam, isValid) => {
    try {
      const endpoint =
        !isSpam && isValid ? "icons/isValid/" : "icons/notValid/";
      const iconResponse = await api.get(endpoint);
      if (iconResponse.status === 200) {
        setIcon(iconResponse.data);
        console.log("Icon:", iconResponse.data);
      } else {
        console.log("Failed to retrieve icon");
      }
    } catch (error) {
      console.log("error fetching icon:", error);
    }
  };

  // PHONE VALIDATION BELOW
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setSubmitPhone(false);
    try {
      const newphone = { phone_number: phone, countryCode: "us" };
      console.log("phone", newphone); //("email/", newemail);
      const response = await api.post("phone/", newphone);
      if (response.status === 201) {
        console.log("phone number sent!", response.data.phone);
        setSubmitPhone(true);
        let format_phone = response.data.phone;
        console.log("phone!", format_phone);
        fetchPhoneDetails(format_phone);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchPhoneDetails = async (identifier) => {
    try {
      const response = await api.get(`phone/single_record/${identifier}`); // get single record
      if (response.status === 200) {
        // const responseData = JSON(response.data)
        console.log("phone details:", response.data);
        setPhoneDetails(response.data);
        fetchPhoneIconInfo(response.data.is_valid);
      }
    } catch (error) {
      console.log("error fetching phone:", error);
    }
  };

  const fetchPhoneIconInfo = async (isValid) => {
    try {
      const endpoint = isValid ? "icons/isValid/" : "icons/notValid/";
      const iconResponse = await api.get(endpoint);
      if (iconResponse.status === 200) {
        setIconPhone(iconResponse.data);
        console.log("Phone Icon:", iconResponse.data);
      } else {
        console.log("Failed to retrieve icon for Phone!");
      }
    } catch (error) {
      console.log("error fetching icon:", error);
    }
  };

  return (
    <>
      <h1>Main ValidationStation Page</h1>
      <br />
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className={
                emailDetails
                  ? !emailDetails.is_valid || emailDetails.isKnownSpammerDomain
                    ? "input-invalid"
                    : "input-valid"
                  : ""
              }
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {submit && (
          <div className="mt-3 alert alert-success" role="alert">
            Validating email...
          </div>
        )}

        {emailDetails && (
          <div
            className={`mt-3 alert ${
              !emailDetails.is_valid || emailDetails.isKnownSpammerDomain
                ? "alert-red"
                : "alert-green"
            }`}
            role="alert"
          >
            Email Details:
            <br />
            Email:{emailDetails.email_address} <br />
            Is Valid:{emailDetails.is_valid.toString()} <br />
            Is Spam:{emailDetails.isKnownSpammerDomain.toString()}
          </div>
        )}
        {icon && (
          <div>
            <img src={icon} alt="Icon for Email Validation" />
          </div>
        )}
      </div>
      {/* ############ PHONE FORM BELOW ############ */}
      <br />
      <div>
        <Form onSubmit={handlePhoneSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="phone"
              className={
                phoneDetails
                  ? !phoneDetails.is_valid || phoneDetails.isKnownSpammerDomain
                    ? "input-invalid"
                    : "input-valid"
                  : ""
              }
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {submitPhone && (
          <div className="mt-3 alert alert-success" role="alert">
            Validating phone number...
          </div>
        )}

        {phoneDetails && (
          <div
            className={`mt-3 alert ${
              !phoneDetails.is_valid || phoneDetails.isKnownSpammerDomain
                ? "alert-red"
                : "alert-green"
            }`}
            role="alert"
          >
            Phone Details:
            <br />
            Phone:{phoneDetails.phone_number} <br />
            Is Valid:{phoneDetails.is_valid.toString()} <br />
            Location:{phoneDetails.location} <br />
            Country:{phoneDetails.country_name} <br />
            Currency:{phoneDetails.currency_name} <br />
            Country Flag:{phoneDetails.countryFlagEmoji} <br />
          </div>
        )}
        {iconPhone && (
          <div>
            <img src={iconPhone} alt="Icon for Phone Validation" />
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;