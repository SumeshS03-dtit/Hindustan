import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Pagination } from "react-bootstrap";
import "../Styles/MonthlyHerald.css";
import { FaPencilAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaBell } from "react-icons/fa6";
import ailogo from "../assets/HIS/images/AI LOGO 3.png"
import {getMonthlyHerald} from '../Services/monthlyherald'
import AiSuggestionModal from "../Components/AiSuggestionModal";
import AddMonthlyModal from "../Components/AddMonthlyModal"
import MonthlyAIReport from "../Components/MonthlyAIReport"

const MonthlyHerald = () => {
  const [search, setSearch] = useState("");
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [showAIReport, setShowAIReport] = useState(false);
  const [showAddMonthly, setShowAddMonthly] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const [heraldData, setHeraldData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchHeraldData();
  }, []);

  const fetchHeraldData = async () => {
    try {
      setLoading(true); // start loader
      const data = await getMonthlyHerald();
      console.log("Monthlyheralddata",data);
      setHeraldData(data);
    } catch (error) {
      console.log("Failed to load Monthly Herald");
    }finally {
    setLoading(false); // stop loader
  }
  };
 

//show ai suggestion modal box
const handleAISuggestionClick = (id) => {
  setSelectedId(id);
  setShowAISuggestion(true);
};

//show ai report
const handleAIReportClick = (id) => {
  setSelectedId(id);
  setShowAIReport(true);
}

//navigate to monthly route 
const handleViewDetails = (id) => {
  navigate(`/monthlyherald/${id}`);
};

 






  return (
    <div className="monthlyherald_main_content">
       <Row className="">
                <Col className="col-12 col-lg-8">
                  <div className="text-start">
                    <h3 className=" bold">Monthly Herald</h3>
                    <p className="text-muted" style={{ marginTop: "-4px" }}>
                      Plan and Organize Your Curriculum
                    </p>
                  </div>
                </Col>
                <Col className="col-12 col-lg-4 ">
                  <Row className="justify-content-lg-center justify-content-end ">
                    {/* <Col md={3}>
                      <Form.Select>
                        <option className="bold">Oct 2025</option>
                        <option className="bold">Sep 2025</option>
                        <option className="bold">Aug 2025</option>
                      </Form.Select>
                    </Col> */}
      
                    <Col className="col-lg-8">
  <Form.Select>
    <option>GRADE - 3A</option>
    <option>GRADE - 3B</option>
    <option>GRADE - 4A</option>
  </Form.Select>
</Col>

<Col className="text-end  mt-0">
  <Button className="radiantBlue">
    <FaBell />
  </Button>
</Col>
                  </Row>
                </Col>
              </Row>
      <hr />

      <Row className="mt-3 align-items-center">
        <Col md={3} className="text-start ps-2 ">
          <h4 className="textbluecolor bold">Monthly Plans</h4>
        </Col>

        <Col md={9}>
          <Row className="justify-content-end g-2">
            <Col md={4}>
  <Form.Select>
    <option>2025</option>
    <option>2026</option>
    <option>2027</option>
  </Form.Select>
</Col>

            <Col md={3}>
              <Form.Select>
                <option>Upcoming</option>
              </Form.Select>
            </Col>


            <Col md={3} className="text-end">
              <Button className=" w-100 radiantBlue"
               onClick={() =>setShowAddMonthly(true)}
              ><strong className="fs-5">+</strong> Add Plan</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-4">
 

  {loading ? (
  <div className="text-center w-100 py-5">
    <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-3 fw-bold text-primary">Fetching Monthly Herald...</p>
  </div>
) : heraldData.length > 0 ? (
  heraldData.map((card, index) => (
      <Col md={4} className="mb-4" key={index}>
        <div className="monthlyheraldboxone p-3 position-relative">
           {/* Edit icon - hidden until hover */}
  <FaPencilAlt
    className="edit-hover-icon"
    // onClick={() => handleViewDetails(card._id)}
  />
 <Row className="align-items-center">
  
  <Col lg={6} className="text-start">
    <h6 style={{ fontWeight: "bold", color: "#226DCD" }}>
      {card.month}
    </h6>
  </Col>

 
  <Col lg={6} className="text-lg-end text-start">
    <button
      className="ai-suggestionreport d-inline-flex align-items-center gap-2"
      style={{ maxWidth: "150px", }}  
      onClick={() => handleAIReportClick(card._id)} 
    >
      <img src={ailogo} alt="AI" className="ai-icon" />
      <span className="ai-ellipsis-text">AI Report</span>
    </button>
  </Col>
</Row>
          <hr className="mt-2 mb-0" />

          <div className="row mt-2">
            <div className="col-lg-4 col-6 text-start">
              <div className="h6">Total Topics</div>
              <p>{Object.keys(card?.period_plan || {}).length}</p>
            </div>
            <div className="col-lg-4 col-6 text-start">
              <div className="h6">Total Periods</div>
              <p>{card.total_periods}</p>
            </div>
            <div className="col-lg-4 col-6 text-start">
              <div className="h6">Subjects</div>
              <p>{card.subject}</p>
            </div>
          </div>

          <Row className="mt-3 align-items-center">
            <Col lg={8} xs={12}>
              <div className="left-btns d-flex align-items-center gap-2 no-wrap-desktop">
                <button
  className={`status-badge ${
    card.month === "October" ? "completed-badge" : "upcoming-badge"
  } ellipsis-text`}
>
  {card.month === "October" ? "Completed" : "Upcoming"}
</button>
                <button
                  className="ai-suggestion-btn d-flex align-items-center gap-2"
                  onClick={() => handleAISuggestionClick(card._id)}
                >
                  <img src={ailogo} alt="AI" className="ai-icon" />
                  <span className="ellipsis-text">AI Suggestions</span>
                </button>
              </div>
            </Col>

            <Col lg={4} xs={12} className="text-lg-end mt-lg-0 mt-2">
              <Button
                size="sm"
                className="view-details-btn"
                onClick={() => handleViewDetails(card._id)}
              >
                View Details
              </Button>
            </Col>
          </Row>
        </div>
      </Col>
    ))
) : (
  <div className="text-center w-100 py-4 text-danger fw-bold">
    No Monthly Herald records found
  </div>
)}
</Row>

      {/* <div className="mt-auto">
        <div className="d-flex justify-content-between mt-3">
          <span className="text-muted">
  Page {currentPage} of {Math.ceil(filteredCards.length / itemsPerPage)} • 
  Showing {filteredCards.length === 0 ? 0 : startIndex + 1} -
  {Math.min(endIndex, filteredCards.length)} of {filteredCards.length} items
</span>



          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            />

            {[...Array(Math.ceil(filteredCards.length / itemsPerPage))]
.map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              disabled={currentPage === Math.ceil(filteredCards.length / itemsPerPage)}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </Pagination>
        </div>
      </div> */}
      <AiSuggestionModal
      show={showAISuggestion}
      handleClose={() => setShowAISuggestion(false)}
      aidata={heraldData}
      id={selectedId} 
      
      ></AiSuggestionModal>
      <AddMonthlyModal
      show={showAddMonthly}
      handleClose={() =>setShowAddMonthly(false)}
      refreshData={fetchHeraldData}
      ></AddMonthlyModal>
      <MonthlyAIReport
      show={showAIReport}
      handleClose={() =>setShowAIReport(false)}
      id={selectedId}
      ></MonthlyAIReport>
    </div>
    
  );
};
export default MonthlyHerald;
