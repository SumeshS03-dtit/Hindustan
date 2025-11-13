import React from "react";
import { Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import HISKLogo from "../assets/HIS/images/HIS-logo.png";
import '../Styles/SideBar.css';

import analytics from '../assets/HIS/icons/analytics-icon.png';
import dailylogs from '../assets/HIS/icons/daily-logs-icons.png';
import lesson from '../assets/HIS/icons/monthly-herald.png';
import classes from '../assets/HIS/icons/my-class-icon.png';
import profilePic from '../assets/HIS/icons/my-class-icon.png';

const SideBar = () => {
  return (
    <div className="sidebar d-flex flex-column align-items-center p-3">
      <img src={HISKLogo} alt="HISK Logo" className="logo img-fluid" />

      <Nav className="flex-column w-100 mt-4">
        <Link to="/analytics" className="nav-link p-0">
          <div className="nav-item">
            <img src={analytics} className="icon bg-primary"  alt="Analytics" />
            <span>Analytics</span>
          </div>
        </Link>
        <Link to="/monthlyherald" className="nav-link p-0">
          <div className="nav-item">
            <img src={lesson} className="icon " alt="Monthly Herald" />
            <span>Monthly Herald</span>
          </div>
        </Link>
        <Link to="/dailylog" className="nav-link p-0">
          <div className="nav-item">
            <img src={dailylogs} className="icon" alt="Daily Logs" />
            <span>Daily Logs</span>
          </div>
        </Link>
        <Link to="/myclasses" className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>My Classes</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Attendance</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Students</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Students</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Report Card</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Parents</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Assesment</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Circular</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Apply Leave</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Library</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Gallery</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Transport</span>
          </div>
        </Link>
        <Link  className="nav-link p-0">
          <div className="nav-item">
            <img src={classes} className="icon" alt="My Classes" />
            <span>Hostel</span>
          </div>
        </Link>
      </Nav>
    </div>
  );
};


export default SideBar;