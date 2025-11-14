import React from 'react'
import { Card } from 'react-bootstrap'
import ailogo from "../assets/HIS/images/AI LOGO 3.png"
import "../Styles/WeeklyPlans.css"

const WeeklyPlans = () => {
  return (
    <div className='mt-3'>

        <div className="weekly-card ">
  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
    <h5 className="week-title">Week 4</h5>

    <div className="d-flex gap-2 align-items-center flex-wrap">
      <button
        className="ai-suggestion-btn d-flex align-items-center gap-2"
        // onClick={() => handleAISuggestionClick(card._id)}
      >
        <img src={ailogo} alt="AI" className="ai-icon" />
        <span>AI Suggestions</span>
      </button>

      <span className="status-badge">Upcoming</span>

      <span className="progress-value">0%</span>
    </div>
  </div>

  <hr />

  <div className="topics-section">
    <p className="topic-title">Completed Topics :</p>
    {/* <p className="topic-list">{completedTopics}</p> */}

    <p className="topic-title">Pending Topics :</p>
    {/* <p className="topic-list">{pendingTopics}</p> */}
  </div>
</div>
    </div>
    

  )
}

export default WeeklyPlans