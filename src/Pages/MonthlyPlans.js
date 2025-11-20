import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMonthlyById } from "../Services/monthlyherald";
import { Card } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import ailogo from "../assets/HIS/images/AI LOGO 3.png";
import { FaBell } from "react-icons/fa6";
import leftarrow from "../assets/HIS/images/leftarrow.svg";
import "../Styles/MonthlyPlans.css"
import { FaPencilAlt } from "react-icons/fa";
import DailyPlans from "../Components/DailyDetailModal"
import WeeklyPlans from "./WeeklyPlans";
import WeeklyModal from "../Components/WeeklyModal"
import { Row, Col} from "react-bootstrap";
import DailyPlanSuggestion from "../Components/DailyPlanAiSuggestion"

const MonthlyPlans = () => {
  const [monthlyDetail, setMonthlyDetail] = useState("");
  const [activeTab, setActiveTab] = useState("Daily");
  const [showDailyPlans,setShowDailyPlans] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [AiData,setAiData]=useState([]);
  const [showAddWeekly, setShowAddWeekly] = useState(false);
  const [showDailyAiSuggestion, setShowDailyAiSuggestion] = useState(false);
  const [duration, setDuration] = useState(""); // initial empty
  const { id } = useParams();
  console.log("Received ID:", id);
  const navigate = useNavigate();
  // Fetch data on page load
  useEffect(() => {
    fetchSinglePlan();
  }, [id]);


  //set the duration from the api
  useEffect(() => {
  if (monthlyDetail) {
    setDuration(monthlyDetail.period_duration_minutes || "");
  }
}, [monthlyDetail]);


  //fetch single data by params id
  const fetchSinglePlan = async () => {
    try {
      const res = await getMonthlyById(id); // FIXED: add await + pass id
      setMonthlyDetail(res);
      console.log("Monthly Plan Detail:", res);
    } catch (error) {
      console.log("Error loading Single Plan", error);
    }
  };


//show DailyPlan modal box
const handleDailyPlanClick = (periodKey, periodValue) => {
  setSelectedPeriod({ periodKey, periodValue });
  setShowDailyPlans(true);
};

//show ai suggestion modalbox
const handleshowaisuggestion = (data) =>{
  setAiData(data)
  setShowDailyAiSuggestion(true);
}

const convertToDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day);
};






const handleShowAddWeeklyClick = () => {
  
  setShowAddWeekly(true);
};

  return (
    <div className="monthlyherald_main_content">
      <div className="row">
        <div className="col-lg-8 col-12 d-flex">
          <div className="row w-100">
            <div className="col-lg-1 col-sm-12 text-start">
              <Button
                onClick={() => navigate("/monthlyherald")}
                className="bg-white border-0 shadow-sm p-2"
                style={{
                  borderRadius: "6px", // square with slight corner radius
                  width: "40px", // make it perfectly square
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={leftarrow} alt="back" style={{ width: "20px" }} />
              </Button>
            </div>
            <div className="col-lg-10 col-sm-12 text-start">
              <h3 className=" bold">Monthly Herald</h3>
              <p className="text-muted" style={{ marginTop: "-4px" }}>
                {monthlyDetail?.teacher_suggestion?.month} Lesson Plans
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-12">
          <div className="row align-items-center gp-3 justify-content-end">
            <div className="col-lg-8">
              <Form.Select>
                <option>GRADE - 3A</option>
                <option>GRADE - 3B</option>
                <option>GRADE - 4A</option>
              </Form.Select>
            </div>
            <div className="col-lg-4 text-end mt-0">
              <Button className="radiantBlue">
                <FaBell />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
  <div className="col-lg-6 text-start">
    <div className="toggle-wrapper">
      <button
        className={activeTab === "Daily" ? "toggle-active" : "toggle"}
        onClick={() => setActiveTab("Daily")}
      >
        Daily
      </button>

      <button
        className={activeTab === "Weekly" ? "toggle-active" : "toggle"}
        onClick={() => setActiveTab("Weekly")}
      >
        Weekly
      </button>
    </div>
  </div>
  <div className="col-lg-6 text-end">
<Button className="align-items-center radiantBlue gap-2"
onClick={() =>handleShowAddWeeklyClick()}
>
  <strong className="fs-5">+</strong>
  Add Plan
</Button>
  </div>
</div>

      {activeTab === "Daily" && (
        <div className="row mt-4">
        {Object.entries(monthlyDetail?.period_plan || {}).map(([key, value], index) => (
  <div className="col-md-4 mb-4" key={index} style={{
    position: "relative",
  }}>
    <div className="monthlyheraldbox p-3">

      {/* Header */}
      <div className="row">
        <div className="col-6 text-start">
          <h6 className="fw-bold textbluecolor">{value.period_date}</h6>
          <small>{`${duration} Mins`}</small>
        </div>
        <div className="col-6 text-end">
          <span className=" period-badge text-muted mb-0">{value?.topics?.length} Topics</span>
        </div>
      </div>

      <hr />

      {/* Lesson Name (show once) */}
      <p className="text-start text-muted mb-1" style={{ fontSize: "14px" }}>Lesson/Chapter</p>
      <p className="text-start fw-bold textbluecolor">{value?.lesson_name || "Lesson not provided"}</p>

      {/* Topics */}
      <p className="text-start text-muted mb-1" style={{ fontSize: "14px" }}>
  Topics to Cover:
</p>
      {/* <ul
  className="text-start p-0 topic-list"
  style={{ listStyle: "none" }}
>
  {value?.topics?.map((topic, i) => (
    <li key={i} className="topic-item">
      {topic?.topic}
    </li>
  ))}
</ul> */}
<p className="topics-preview text-start">
  {value?.topics?.map(t => t.topic).join(", ")}
</p>


      {/* Buttons */}
      <Row className="mt-3 align-items-center">
  {/* LEFT 8 (Upcoming + AI Suggestions) */}
  <Col lg={8} xs={12}>
    <div className="left-btns d-flex align-items-center gap-2 no-wrap-desktop">
  {(() => {
    const today = new Date();
    const taskDate = convertToDate(value.period_date);

    let status = "";
    if (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    ) {
      status = "Pending";        // Same day
    } else if (taskDate > today) {
      status = "Upcoming";       // Future date
    } else {
      status = "Completed";      // Past date
    }

    return (
      <button
        className={`status-badge ellipsis-text ${
          status === "Completed"
            ? "completed-badge"
            : status === "Pending"
            ? "pending-badge"
            : "upcoming-badge"
        }`}
      >
        {status}
      </button>
    );
  })()}

  <button
    className="ai-suggestion-btn d-flex align-items-center gap-2"
    onClick={() => handleshowaisuggestion(value.topics)}
  >
    <img src={ailogo} alt="AI" className="ai-icon" />
    <span className="ellipsis-text">AI Suggestions</span>
  </button>
</div>

  </Col>

  {/* RIGHT 4 (View Details) */}
  <Col lg={4} xs={12} className="text-lg-end mt-lg-0 mt-2">
    <Button
  size="sm"
  style={{
                  backgroundColor: "#d9e6f8ff",
                  color: "#226DCD",
                  border: "none",
                }}
  onClick={() => handleDailyPlanClick(key,value)}
>
  <FaPencilAlt className="me-2"></FaPencilAlt>
  Edit
</Button>
  </Col>
</Row>

    </div>
  </div>
))}

      </div>
      )}
      {activeTab === "Weekly" && (
        <WeeklyPlans></WeeklyPlans>
      )}

    <DailyPlans
  show={showDailyPlans}
  handleClose={() => setShowDailyPlans(false)}
  period={selectedPeriod}        // <-- send to modal
  data={monthlyDetail}
/>
<WeeklyModal
show={showAddWeekly}
handleClose={() => setShowAddWeekly(false)}
></WeeklyModal>
<DailyPlanSuggestion
show={showDailyAiSuggestion}
handleClose={() =>setShowDailyAiSuggestion(false)}
aidata={AiData}
></DailyPlanSuggestion>
      
    </div>
  );
};
export default MonthlyPlans;