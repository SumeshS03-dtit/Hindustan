import { Modal, Button } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";

const WeeklyModal = ({ show, handleClose}) => {

    const [formData, setFormData] = useState({
      date: "",
      subject: "",
      periods: "",
      periodDuration: "",
      durationDays: "",
      file: null,
    });
    
      const fileInputRef = useRef(null);
    
      const handleFileSelect = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
      };

 
  useEffect(() => {
 
  }, [show]);

  return (
        <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="monthly-modal">
      <Modal.Header closeButton className="flex-column align-items-start">
        <Modal.Title>Create Daily Plan</Modal.Title>
        <small className="text-muted">Create a lesson plan for an upcoming class</small>
      </Modal.Header>

      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <label className="text-primary">Date</label>
              <input
                className="form-control"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="col-lg-6 col-12">
              <label className="text-primary">Subject</label>
              <input
                className="form-control"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="col-lg-6 col-12">
              <label className="text-primary mt-lg-3">Lesson/Chapter</label>
              <input
  className="form-control"
  type="number"
  placeholder="Enter Total Number of Periods"
  value={formData.periods}
  onChange={(e) => setFormData({ ...formData, periods: e.target.value })}
/>
            </div>
            <div className="col-lg-6 col-12">
              <label className="text-primary mt-lg-3">Topic</label>
              <input
  className="form-control"
  type="number"
  placeholder="Enter Period Duration (in minutes)"
  value={formData.periodDuration}
  onChange={(e) => setFormData({ ...formData, periodDuration: e.target.value })}
/>
            </div>
            <div className="col-lg-6 col-12">
              <label className="text-primary mt-lg-3">Periods</label>
              <input
  className="form-control"
  type="number"
  placeholder="Enter Duration Days"
  value={formData.durationDays}
  onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
/>
            </div>
            <div className="col-lg-6 col-12">
              <label className="text-primary mt-lg-3">Duration/Time</label>
              <input
  className="form-control"
  type="number"
  placeholder="Enter Duration Days"
  value={formData.durationDays}
  onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
/>
            </div>
           
          </div>
        </div>
   
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WeeklyModal;
