import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const AiSuggestionModal = ({ show, handleClose, aidata, id }) => {

  const [selectedData, setSelectedData] = useState(null);
 
  useEffect(() => {
    if (show && aidata && id) {
      const found = aidata.find(item => item._id === id);
      setSelectedData(found);
      console.log("Filtered AI Data:", found);
    }
  }, [show, aidata, id]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>AI Suggestions</Modal.Title>
      </Modal.Header>

      <Modal.Body>
         {selectedData ? (
    <>
      <p><strong>Subject:</strong> {selectedData.subject}</p>
      <p><strong>Summary:</strong> {selectedData.summary}</p>
      <p><strong>Total Periods:</strong> {selectedData.total_periods}</p>

      <strong>Syllabus Link:</strong>
      <a href={selectedData.syllabus_link} target="_blank" rel="noopener noreferrer">
        Open PDF
      </a>

      <hr />

      <h5>Teacher Suggestions:</h5>
      <ul>
        {selectedData.teacher_suggestion?.suggestions?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <p><strong>Note:</strong> {selectedData.teacher_suggestion?.note}</p>
    </>
  ) : (
    <p>No data found for this ID</p>
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

export default AiSuggestionModal;
