import React, { useState, useEffect } from "react";
import ailogo from "../assets/HIS/images/AI LOGO 3.png";
import "../Styles/WeeklyPlans.css";
import WeeklyAiSuggestion from "../Components/WeeklyAiSuggestion";
import { getWeeklyDetail } from "../Services/weekly";
import { useParams, useNavigate } from "react-router-dom";
import { getMonthlyById } from "../Services/monthlyherald";

const WeeklyPlans = () => {
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const [weeklyDetail, setWeeklyDetail] = useState([]);
  const [loading, setLoading] = useState(true);
   const [monthlyDetail, setMonthlyDetail] = useState("");
  const { id } = useParams();
  console.log("Received ID from weekly:", id);
  const monthNameToNumber = (monthName) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months.indexOf(monthName) + 1;   // +1 because array starts at 0
};

  // useEffect(() => {
  //   fetchWeeklyDetail();
  // }, []);


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

// 2️⃣ Fetch Weekly after monthlyDetail is available
useEffect(() => {
  if (monthlyDetail?.month && monthlyDetail?.year) {
    fetchWeeklyDetail();
  }
}, [monthlyDetail]);

  const fetchWeeklyDetail = async () => {
    const teacher = JSON.parse(localStorage.getItem("TeacherData"));
    const teacherId = teacher?._id;

    const year = monthlyDetail?.year;                             // from API
    const month = monthNameToNumber(monthlyDetail?.month);       // convert month name → number

    try {
      setLoading(true);
      const response = await getWeeklyDetail(teacherId, month, year);
      console.log("Weekly Detail:", response);

      // The API returns { month, year, weekly: [...] }
      setWeeklyDetail(response.weekly || []);
    } catch (error) {
      console.log("Error loading weekly detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleshowaisuggestion = () => {
    setShowAiSuggestion(true);
  };

  return (
    <>
      <div className="mt-3">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="fw-bold text-primary mt-3">Loading Weekly Plans...</p>
          </div>
        ) : weeklyDetail.length === 0 ? (
          <p className="text-center text-danger fw-bold py-5">
            ⚠ No weekly plans available.
          </p>
        ) : (
          weeklyDetail.map((week, index) => (
            <div className="weekly-card mb-3" key={index}>
              {/* Header */}
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <h5 className="week-title">{week.week}</h5>

                <div className="d-flex gap-2 align-items-center flex-wrap">
                  <button
                    className="ai-suggestion-btn d-flex align-items-center gap-2"
                    onClick={() => handleshowaisuggestion()}
                  >
                    <img src={ailogo} alt="AI" className="ai-icon" />
                    <span>AI Suggestions</span>
                  </button>

                  <span className="status-badge">Upcoming</span>

                  <span className="progress-value">
                    {week.weekly_performance_percent || 0}%
                  </span>
                </div>
              </div>
              <hr></hr>

              {/* Topics */}
              <div className="topics-section mt-2">
                <p className="topic-title text-start">Completed Topics :</p>
                <p className="topic-list bold text-start">
                  {week.completed_topics?.length > 0
                    ? week.completed_topics.join(", ")
                    : "No topics completed"}
                </p>

                <p className="topic-title text-start">Pending Topics :</p>
                <p className="topic-list bold text-start">
                  {week.pending_topics?.length > 0
                    ? week.pending_topics.join(", ")
                    : "No pending topics"}
                </p>

                <p className="topic-title text-start">Planned Topics :</p>
                <p className="topic-list bold text-start">
                  {week.planned_topics?.length > 0
                    ? week.planned_topics.join(", ")
                    : "No planned topics"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <WeeklyAiSuggestion
        show={showAiSuggestion}
        handleClose={() => setShowAiSuggestion(false)}
      />
    </>
  );
};

export default WeeklyPlans;
