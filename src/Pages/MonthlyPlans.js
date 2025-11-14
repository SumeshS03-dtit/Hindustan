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

const MonthlyPlans = () => {
  const [monthlyDetail, setMonthlyDetail] = useState("");
  const [activeTab, setActiveTab] = useState("Daily");
  const [showDailyPlans,setShowDailyPlans] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showAddWeekly, setShowAddWeekly] = useState(false);
  const { id } = useParams();
  console.log("Received ID:", id);
  const navigate = useNavigate();
  // Fetch data on page load
  useEffect(() => {
    fetchSinglePlan();
  }, [id]);

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
  <div className="col-md-4 mb-4" key={index}>
    <div className="monthlyheraldbox p-3">

      {/* Header */}
      <div className="row">
        <div className="col-6 text-start">
          <h6 className="fw-bold text-primary">{`Period ${key.split("_")[1]}`}</h6>
        </div>
        <div className="col-6 text-end">
          <p className="text-muted mb-0">{value?.topics?.length} Topics</p>
        </div>
      </div>

      <hr />

      {/* Lesson Name (show once) */}
      <p className="text-start text-muted mb-1" style={{ fontSize: "14px" }}>Lesson/Chapter</p>
      <p className="text-start fw-bold text-primary">{value?.lesson_name || "Lesson not provided"}</p>

      {/* Topics */}
      <p className="text-start text-muted mb-1" style={{ fontSize: "14px" }}>
  Topics to Cover:
</p>
      <ul className="text-start  p-0" style={{ listStyle: "none" }}>
        {value?.topics?.map((topic, i) => (
          <li key={i} className="topic-item">{topic?.topic}</li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="row mt-3">
        <div className="col-lg-8 text-start d-flex flex-column flex-lg-row gap-2">
          <span className="status-badge">Upcoming</span>

          <button className="ai-suggestion-btn d-flex align-items-center gap-2">
            <img src={ailogo} alt="AI" className="ai-icon" />
            <span>AI Suggestions</span>
          </button>
        </div>

        <div className="col-lg-4 col-12 text-end mt-lg-0 mt-2">
          <Button
            size="sm"
            style={{
              backgroundColor: "#d9e6f8ff",
              color: "#1b76f5ff",
              border: "none",
            }}
            onClick={() => handleDailyPlanClick(key, value)}
          >
            <FaPencilAlt className="me-2" />
            Edit
          </Button>
        </div>
      </div>

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
      
    </div>
  );
};
export default MonthlyPlans;