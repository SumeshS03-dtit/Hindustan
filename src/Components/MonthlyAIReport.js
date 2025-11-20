import React, { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import ailogo from "../assets/HIS/images/AILoader.svg";
import { getMonthlyById,getMonthlyAIReport,getMonthlyReportSuggestion } from "../Services/monthlyherald";
const MonthlyAIReport = ({ show, handleClose,id }) => {
  const [monthlyDetail, setMonthlyDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const [monthlyAIReport,setMonthlyAIReport] = useState("");
  const [monthlySuggestions,setMonthlySuggestions] = useState("");

    const monthNameToNumber = (monthName) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months.indexOf(monthName) + 1;   // +1 because array starts at 0
};

  useEffect(() => {
    if (show) {
      setLoading(true); // show loader whenever modal opens

      // hide after 5 seconds
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [show]);

// fetch monthly plan when modal opens
useEffect(() => {
  if (show && id) {
    fetchSinglePlan();
  }
}, [show, id]);

// when monthlyDetail changes, then fetch weekly AI report
useEffect(() => {
  if (monthlyDetail?.month && monthlyDetail?.year) {
    fetchWeeklyDetail();
  }
}, [monthlyDetail]);


useEffect(() =>{
console.log("Test");
},[monthlyAIReport])

  const fetchSinglePlan = async () => {
    try {
      const res = await getMonthlyById(id);
      setMonthlyDetail(res);
    const teacher = JSON.parse(localStorage.getItem("TeacherData"));
    const teacherId = teacher?._id;
     console.log("Monthly Plan Detail:", res);
        // 🔥 call second API with required values
    const suggestionResponse = await getMonthlyReportSuggestion(
      teacherId,
      res.planned_topics,
      res.pending_topics,
      res.completed_topics
    );
    console.log("Monthly Report Suggestions:", suggestionResponse);

    // Save it to state if needed
    setMonthlySuggestions(suggestionResponse);
     
    } catch (error) {
      console.log("Error loading Single Plan", error);
    }
  };





const fetchWeeklyDetail = async () => {
  const teacher = JSON.parse(localStorage.getItem("TeacherData"));
  const teacherId = teacher?._id;

  const year = monthlyDetail?.year;
  const month = monthNameToNumber(monthlyDetail?.month);

  try {
    const response = await getMonthlyAIReport(teacherId, month, year);
    console.log("AI Monthly Report:", response);
    setMonthlyAIReport(response);
  } catch (error) {
    console.log("Error loading Monthly AI report:", error);
  }
};



  return (
  <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="monthly-modal">
      <Modal.Header closeButton>
        <Modal.Title>AI Report MonthlyHerald</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {loading ? (
      <div className="text-center py-4">
        <img
              src={ailogo}
              alt="AI loader"
              className="ai-loading-icon"
              
            />
        <p className="fw-bold text-primary mt-3">Generating AI Report...</p>
      </div>
    ) : monthlyAIReport ? (
<>
  <h5 className="text-primary fw-bold">
    {monthlyAIReport.month} {monthlyAIReport.year}
  </h5>

  <p className="mt-2">
    <strong>Total Planned Topics:</strong> {monthlyAIReport.planned_topic_count}
  </p>
  <p>
    <strong>Completed Topics:</strong> {monthlyAIReport.completed_topic_count}
  </p>
  <p>
    <strong>Performance:</strong> {monthlyAIReport.performance_percent}% 
  </p>

  <hr />

  {/* 📌 Comparison table */}
  <table className="table table-bordered mt-3">
    <thead>
      <tr>
        <th className="fw-bold">Planned Topic</th>
        <th className="fw-bold">Covered in Daily Logs</th>
      </tr>
    </thead>
    <tbody>
      {monthlyAIReport.comparison?.map((item, index) => (
        <tr key={index}>
          <td>{item.topic}</td>

          <td className='text-center' style={{ fontWeight: 600, color: item.completed === "Yes" ? "#0077ff" : "gray" }}>
            {item.completed}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className='h3 bold'>Key Observations</div>
  <div className="p-2">
  <div className="gapbox gap-card">
    <h4 className="mb-3">Gaps</h4>

    <ul className="gap-list" style={{ listStyle: "none"}}>
      {monthlySuggestions?.report?.key_observations?.gaps?.map((gap, index) => (
        <li className='text-start' key={index}>{gap}</li>
      ))}
    </ul>
  </div>
</div>
  <div className='p-2'>
    <div className='gapbox strenght-card'>
         <h4 className="mb-3">Strenths</h4>
    <ul className="gap-list" style={{ listStyle: "none"}}>
      {monthlySuggestions?.report?.key_observations?.strenths?.map((gap, index) => (
        <li className='text-start' key={index}>{gap}</li>
      ))}
    </ul>
    </div>
  </div>
   <div className='p-2'>
    <div className='gapbox recommendations-card'>
        <h4 className='mb-3'>recommendations</h4>
    <ul className="gap-list" style={{ listStyle: "none"}}>
      {monthlySuggestions?.report?.recommendations.map((gap, index) => (
        <li className='text-start' key={index}>{gap}</li>
      ))}
    </ul>
    </div>
  </div>
    <div className="p-2">
  <div className="gapbox assessment_readiness">
    <h4 className="mb-3">Dominant Teaching Modes</h4>

    <ul className="gap-list" style={{ listStyle: "none"}}>
      {monthlySuggestions?.report?.teaching_focus_summary?.dominant_teaching_modes?.map((gap, index) => (
        <li className='text-start' key={index}>{gap}</li>
      ))}
    </ul>
  </div>
</div>
  <div className="p-2">
  <div className="gapbox dominant_teaching_modes">
    <h4 className="mb-3">Assessment Readiness</h4>

    <ul className="gap-list" style={{ listStyle: "none"}}>
      {monthlySuggestions?.report?.teaching_focus_summary?.academic_focus_areas?.map((gap, index) => (
        <li className='text-start' key={index}>{gap}</li>
      ))}
    </ul>
  </div>
</div>
  
  <div></div>
</>

    ) : (
      <p className="text-danger fw-bold text-center">
        ⚠ No AI report available for this plan.
      </p>
    )}

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MonthlyAIReport