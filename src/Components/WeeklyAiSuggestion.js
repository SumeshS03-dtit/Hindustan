import React, { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import ailogo from "../assets/HIS/images/AILoader.svg";

const WeeklyAiSuggestion = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) {
      setLoading(true); // show loader whenever modal opens

      // hide after 5 seconds
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [show]);

  const defaultSuggestions = [
    "Encourage students to participate more in discussions",
    "Revise previous topics before starting a new lesson",
    "Use visual aids to increase engagement",
    "Assign short practice exercises for better retention"
  ];

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="monthly-modal">
      <Modal.Header closeButton>
        <Modal.Title>AI Suggestion Weekly Plan</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {loading ? (
          // 🔹 AI Loader for 5 sec
          <div className="text-center py-4">
            <img
              src={ailogo}
              alt="AI loader"
              className="ai-loading-icon"
              
            />
            <p className="mt-2 fw-semibold text-primary">
              Generating AI suggestions...
            </p>
          </div>
        ) : (
          // 🔹 After 5 sec show suggestions
          <>
            <div className="fw-bold mb-2">AI Suggestions:</div>
            <ul style={{ listStyle: "none", marginLeft: "20px" }}>
              {defaultSuggestions.map((s, i) => (
                <li key={i} className="mb-2">{s}</li>
              ))}
            </ul>
          </>
        )}

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WeeklyAiSuggestion;
