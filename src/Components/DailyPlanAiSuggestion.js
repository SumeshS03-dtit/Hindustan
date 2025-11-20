import { Modal, Button } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { SiTicktick } from "react-icons/si";
import ailogo from "../assets/HIS/images/AILoader.svg";
import {
  Row,
  Col,
} from "react-bootstrap";

const DailyPlanSuggestion = ({ show, handleClose,aidata}) => {

const [loading, setLoading] = useState(true);

 
useEffect(() => {
  if (show) {
    setLoading(true); // everytime modal opens, show loader
    const timer = setTimeout(() => {
      setLoading(false);   // after 7 sec hide loader
    }, 3000);

    return () => clearTimeout(timer); // cleanup when closed
  }
}, [show]);

  return (
        <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="monthly-modal">
      <Modal.Header closeButton  >
        <div>
          <Modal.Title className="text-primary">Ai Suggestion Daily Plan</Modal.Title>
        </div>
        

      </Modal.Header>

    
             <Modal.Body>
  <div className="fw-bold mb-2">AI Suggestions:</div>

  {/* Show loader first */}
  {loading ? (
    <div className="text-center py-4">
      <img src={ailogo} className="ai-loading-icon" alt="AI Loading" />
      <p className="mt-2 fw-semibold text-primary">
        Generating AI suggestions...
      </p>
    </div>
  ) : (
    <>
      {/* After loading finishes, show suggestions */}
      {aidata?.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {aidata.map((item, index) => (
            <li
              key={index}
              className="mb-3 p-2 rounded shadow-sm"
              style={{ background: "#f6faff" }}
            >
              <p className="mb-1">
                <strong>Topic:</strong> {item.topic}
              </p>
              <p className="mb-1">
                <strong>Suggestion:</strong> {item.teaching_suggestion}
              </p>
              {/* <p className="mb-0"><strong>Time:</strong> {item.time_minutes} mins</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-danger mt-2 fw-bold">
          ⚠ No AI suggestions available for this plan.
        </p>
      )}
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

export default DailyPlanSuggestion;