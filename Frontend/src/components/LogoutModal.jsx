import React from "react";
import { Modal, Button } from "react-bootstrap";

const LogoutModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="info" onClick={onConfirm}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
