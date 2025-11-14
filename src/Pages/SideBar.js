import React from "react";
import { Col, Nav, Card, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import HISKLogo from "../assets/HIS/images/HIS-logo.png";
import teacher from "../assets/HIS/new icons/teacher.jpg";
import "../Styles/SideBar.css";

import analytics from "../assets/HIS/new icons/analytics.jpg";
import dailylogs from "../assets/HIS/icons/daily-logs-icons.png";
import lesson from "../assets/HIS/icons/monthly-herald.png";
import classes from "../assets/HIS/icons/my-class-icon.png";
import profilePic from "../assets/HIS/icons/my-class-icon.png";
import students from "../assets/HIS/new icons/students.png";
import attendance from "../assets/HIS/new icons/attendance.png";
import Parents from "../assets/HIS/new icons/parents.png";
import assessment from "../assets/HIS/new icons/assessment.png";
import circular from "../assets/HIS/new icons/circular.png";
import applyLeave from "../assets/HIS/new icons/apply leave.png";
import library from "../assets/HIS/new icons/library.png";
import gallery from "../assets/HIS/new icons/gallery.png";
import transport from "../assets/HIS/new icons/transport.png";
import hostel from "../assets/HIS/new icons/hostel.png";

const SideBar = () => {
  const location = useLocation();
  const teacherdetail = JSON.parse(localStorage.getItem("TeacherData"));
  const teachername = teacherdetail.name;
  const teachersubject = teacherdetail.subjects[0];


  const navItems = [
    { path: "/analytics", label: "Analytics", icon: analytics },
    { path: "/monthlyherald", label: "Monthly Herald", icon: lesson },
    { path: "/dailylog", label: "Daily Logs", icon: dailylogs },
    { path: "/myclasses", label: "My Classes", icon: classes },
    { label: "Students", icon: students },
    { label: "Attendance", icon: attendance },
    { label: "Report Card", icon: classes },
    { label: "Parents", icon: Parents },
    { label: "Assessment", icon: assessment },
    { label: "Circular", icon: circular },
    { label: "Apply Leave", icon: applyLeave },
    { label: "Library", icon: library },
    { label: "Gallery", icon: gallery },
    { label: "Transport", icon: transport },
    { label: "Hostel", icon: hostel },
  ];
  return (
    <div className="sidebar d-flex flex-column align-items-center p-3">
      <img src={HISKLogo} alt="HISK Logo" className="logo img-fluid" />

      <Nav className="flex-column w-100 mt-4">
        {navItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <div className="nav-item ">
              <img src={item.icon} className="icon" alt={item.label} />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </Nav>
<div className="teacher-box mt-3">
  <img src={teacher} alt="Teacher" className="teacher-avatar" />

  <div className="teacher-details">
    <div className="teacher-name">{teachername}</div>
    <div className="teacher-subject">{teachersubject}</div>
  </div>
</div>

    </div>
  );
};

export default SideBar;
