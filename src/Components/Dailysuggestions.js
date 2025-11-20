import React from 'react';
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
} from "react-bootstrap";
import { BsStars } from "react-icons/bs";
import {getDailyLogsdata} from "../Services/dailyLogs"
import ailogo from "../assets/HIS/images/AILoader.svg";

const Dailysuggestions = ({ show, handleClose,id}) => {
    const [data,setData]=useState("");
    const [loading, setLoading] = useState(true);
   useEffect(() => {
  if (show && id) {          // call only when modal opens AND id exists
    fetchDailyLogDetails();
  }
}, [show, id]);

useEffect(() => {
  if (show) {
    setLoading(true); // everytime modal opens, show loader
    const timer = setTimeout(() => {
      setLoading(false);   // after 7 sec hide loader
    }, 3000);

    return () => clearTimeout(timer); // cleanup when closed
  }
}, [show]);

const fetchDailyLogDetails = async () => {
  try {
    console.log("Fetching log details for id:", id);
    const response = await getDailyLogsdata(id);

    // response.reports is an array → find the one matching _id
    const report = response?.reports?.find((item) => item._id === id);

    console.log("Filtered Report:", report); // 👈 check here

    setData(report); // store the filtered report only
  } catch (error) {
    console.error("Error fetching Daily Logs:", error);
  }
};

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="monthly-modal">
      <Modal.Header
                      className="border-0 pb-0  d-flex justify-content-between"
                      
                    >
                      <div>
                        <h5 className="modal-title-custom">
                          Lesson Topic Vs Monthly Herald
                        </h5>
                        <small className="modal-subtitle-custom">AI Comparison</small>
                      </div>
                      <div onClick={handleClose} className="radiantBlue">
                        <BsStars />
                      </div>
                    </Modal.Header>

      <Modal.Body className="pt-2">
                <Row className="comparison-box mx-1 p-3">
                  <Col md={4} className="text-center">
                    <p className="box-label">Scheduled Date</p>
                    <h6 className="box-value">{data.date}</h6>
                  </Col>
                  {/* <Col md={4} className="text-center">
                    <p className="box-label">Completed Date</p>
                    <h6 className="box-value">Nov 05, 2025</h6>
                  </Col> */}
                  <Col md={4} className="text-center">
                    <p className="box-label">Topics to Duration</p>
                    <h6 className="box-value">45min</h6>
                  </Col>
                </Row>

                {/* <div className="mt-3">
                  <p className="section-label">Unit</p>
                  <h5 className="section-value">Unit 6 : Let’s Perform</h5>
                </div> */}

                {/* <div className="mt-2">
                  <p className="section-label">Topic</p>
                  <h5 className="section-value">6.3 More Powerful Language</h5>
                </div> */}

                {/* <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="status-label">Status</span>
                  <span className="status-completed">Completed</span>
                </div> */}

                {/* <div className="progress custom-progress mt-1">
                  <div className="progress-bar progress-complete"></div>
                </div> */}

                
                {/* <div className="text-end">
                  <strong className="percent-text">100%</strong>
                </div> */}
                {loading ? (
<div className="text-center py-4">
      <img src={ailogo} className="ai-loading-icon" alt="AI Loading" />
      <p className="mt-2 fw-semibold text-primary">
        Generating AI suggestions...
      </p>
    </div>
                ): (
                    <>
                    <div className="mt-3">
                  <p className="section-label">Suggestions</p>
                   {Array.isArray(data?.suggestions) && data.suggestions.length > 0 ? (
    <ul className="section-value" style={{ listStyle: "none",paddingLeft: "18px" }}>
      {data.suggestions.map((topic, index) => (
        <li key={index}>{topic}</li>
      ))}
    </ul>
  ) : (
    <h6 className="section-value text-danger">No topics completed</h6>
  )}
                </div>
                    </>
                )}

                

                {/* <div className="mt-3">
                  <p className="section-label">Motivations</p>
                  <h5 className="section-value">Your completed all topics</h5>
                </div> */}
              </Modal.Body>
    </Modal>
  )
}

export default Dailysuggestions