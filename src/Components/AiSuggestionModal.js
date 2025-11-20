import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import ailogo from "../assets/HIS/images/AILoader.svg";
const AiSuggestionModal = ({ show, handleClose, aidata, id }) => {

  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (show && aidata && id) {
      const found = aidata.find(item => item._id === id);
      setSelectedData(found);
      console.log("Filtered AI Data:", found);
    }
  }, [show, aidata, id]);

  useEffect(() => {
  if (show) {
    setLoading(true); // everytime modal opens, show loader
    const timer = setTimeout(() => {
      setLoading(false);   // after 7 sec hide loader
    }, 3000);

    return () => clearTimeout(timer); // cleanup when closed
  }
}, [show]);


  const defaultSuggestions = [
  "Encourage students to participate more in discussions",
  "Revise previous topics before starting new lesson",
  "Use visual aids to increase engagement",
  "Assign short practice exercises for better retention"
];

const defaultNote =
  "Overall performance was good. Students need continued practice and revision.";

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>AI Suggestions</Modal.Title>
      </Modal.Header>

      <Modal.Body>

 {loading ? (
  <div className="text-center py-4">
      <img src={ailogo} className="ai-loading-icon" alt="AI Loading" />
      <p className="mt-2 fw-semibold text-primary">
        Generating AI suggestions...
      </p>
    </div>
 ):(
  <>
      {selectedData ? (
    <>
      <p><strong>Subject:</strong> {selectedData.subject}</p>
      {/* <p><strong>Summary:</strong> {selectedData.summary}</p> */}
      <p><strong>Total Periods:</strong> {selectedData.total_periods}</p>

      <strong>Syllabus Link:</strong>
      <a href={selectedData.syllabus_link} target="_blank" rel="noopener noreferrer">
        Open PDF
      </a>

      <hr />

     <h5>Teacher Suggestions:</h5>

<ul>
  {(selectedData.teacher_suggestion?.suggestions?.length > 0
    ? selectedData.teacher_suggestion.suggestions
    : defaultSuggestions
  ).map((s, i) => (
    <li key={i}>{s}</li>
  ))}
</ul>

<p>
  <strong>Note:</strong>{" "}
  {selectedData.teacher_suggestion?.note
    ? selectedData.teacher_suggestion.note
    : defaultNote}
</p>
    </>
  ) : (
    <p>No data found for this ID</p>
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

export default AiSuggestionModal;
