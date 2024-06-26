// components/Footer.jsx
import React from "react";
import { Container } from "react-bootstrap";

// Define footer component with bootstrap
const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-1">
      <Container className="py-3">
        <p className="text-center mb-0">
          © 2024 Michael R. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
