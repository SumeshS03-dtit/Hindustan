import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const AiSuggestionModal = ({ show, handleClose, period, data}) => {

 
  useEffect(() => {
   console.log("Selected Period:", period);
   console.log("alldetail from modal:", data);
  }, [show,period]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="flex-column align-items-start">
        <Modal.Title>Edit Lesson Plan</Modal.Title>
        <small className="text-muted">Create a lesson plan for an upcoming class</small>
      </Modal.Header>

      <Modal.Body>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-12">
                    <label>Date</label>
                    <input 
                    className="form-control"
                    type="date"
                    ></input>
                </div>
                <div className="col-lg-6 col-12">
                    <label>Subject</label>
                    <input className="form-control"></input>
                </div>
                <div className="col-lg-6 col-12">
                    <label>Lesson/Chapter</label>
                    <input 
                    className="form-control"
                    type="text"
                    ></input>
                </div>
                <div className="col-lg-6 col-12">
                    <label>Topic</label>
                    <input 
                    className="form-control"
                    type="text"
                    ></input>
                </div>
                <div className="col-lg-6 col-12">
                    <label>Periods</label>
                    <input 
                    className="form-control"
                    type="number"
                    ></input>
                </div>
                <div className="col-lg-6 col-12">
                    <label>Duration/Time</label>
                    <input
                     className="form-control"
                     type="number"
                     ></input>
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

export default AiSuggestionModal;
