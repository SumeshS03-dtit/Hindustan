import React, { useState, useEffect } from "react";
import "../Styles/Dailylogs.css";
import bell from "../assets/HIS/icons/Vector-4.png";
import star from "../assets/HIS/icons/ai start.jpg";
import dtit from "../assets/HIS/icons/ai start.jpg";
import PEN from "../assets/HIS/icons/pen.png";
import upload from "../assets/HIS/icons/upload.png";
import { MdOutlineUpload } from "react-icons/md";
import { AiOutlineFilePdf } from "react-icons/ai";
import DailyPlanner from "../Components/DailyPlannerModal";
import { FaBell } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { SiTicktick } from "react-icons/si";
import {
  Row,
  Col,
  Form,
  Button,
  Table,
  Pagination,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
} from "react-bootstrap";
import {getDailyLogsdata} from "../Services/dailyLogs"

const DailyLog = () => {
  const [search, setSearch] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState([]);
  const [showAddDailyLogs,setShowAddDailyLogs] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    date: "",
    period: "1",
    planned_topics: ["6.3 More Powerful Language"],
    completed_topics: "",
    totalStudents: "",
    presentStudents: "",
    notes: "",
    studentActivity: "",
    noteFile: null,
    studentActivityFile: null
  });

  const [loading, setLoading] = useState(false);

  // Fetch logs for table - FIXED URL
  const fetchLogs = () => {
    const token = localStorage.getItem("Teachertoken");
    const teacherData = JSON.parse(localStorage.getItem("TeacherData"));
    const teacherId = teacherData?._id;
    const BaseUrl = process.env.REACT_APP_API_BASE_URL;

    console.log("Fetching logs from:", `${BaseUrl}/dailylogs/getByTeacher`);
    console.log("Teacher ID:", teacherId);

    fetch(`${BaseUrl}/dailylogs/getByTeacher`, { // REMOVED extra /api
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        teacherId: teacherId,
        subject: "",
        fromDate: "",
        toDate: "",
        performanceMin: "",
        search: "",
      }),
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response data:", data);
        if (!data.reports) {
          console.log("No reports found in response");
          return;
        }

        const formattedLogs = data.reports.map((item) => ({
          date: new Date(item.date).toDateString(),
          lesson: "Unit 6: Let's Perform",
          planned_topics: item.planned_topics?.join(", ") || "",
          completed_topics: item.completed_topics?.join(", ") || "",
          pending_topics: item.pending_topics?.join(", ") || "",
          studentActivity: item.studentActivity || "",
          studentActivityFile: !!item.studentActivityFile,
          notes: item.notes || "",
          noteFile: !!item.noteFile,
          period: item.period || "1",
          totalStudents: item.totalStudents || "",
          presentStudents: item.presentStudents || "",
        }));

        setLogs(formattedLogs);
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        console.log("Error details:", err.message);
      });
  };





  useEffect(() => {
    // fetchLogs();
    fetdailydetail();
  }, []);

const fetdailydetail = async () => {
  try {
    const data = await getDailyLogsdata();
    console.log("test...............", data);

    // Safe check
    const reports = data?.reports || [];

    const formattedLogs = reports.map((item) => ({
      date: item.date ? new Date(item.date).toDateString() : "",
      lesson: item.lesson || "Unit 6: Let's Perform", // change if dynamic
      planned_topics: item.planned_topics?.join(", ") || "",
      completed_topics: item.completed_topics?.join(", ") || "",
      pending_topics: item.pending_topics?.join(", ") || "",
      studentActivity: item.studentActivity || "",
      studentActivityFile: item.studentActivityFile ? true : false,
      notes: item.notes || "",
      noteFile: item.noteFile ? true : false,
      period: item.period || "1",
      totalStudents: item.totalStudents || "",
      presentStudents: item.presentStudents || "",
    }));

    setLogs(formattedLogs);
  } catch (error) {
    console.log("Failed to load daily logs", error);
  }
};





  


  const aiReport = () => {
    setShowReport(true);
  };

  const handleAddLog = () => {
    setShowAddDailyLogs(true)
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  const filteredLogs = logs.filter((log) =>
    log.planned_topics.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Dailylogs_main_content bg-ternary">
      <div className="p-4 d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Row className="">
          <Col md={6}>
            <div className="text-start">
              <h3 className=" bold">Daily Logs</h3>
              <p className="text-muted" style={{ marginTop: "-15px" }}>
                Record and track your daily lessons
              </p>
            </div>
          </Col>
          <Col md={6}>
            <Row className="justify-content-end">
              <Col md={3}>
                <Form.Select>
                  <option className="bold">Oct 2025</option>
                  <option className="bold">Sep 2025</option>
                  <option className="bold">Aug 2025</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Select>
                  <option>GRADE - 3A</option>
                  <option>GRADE - 3B</option>
                  <option>GRADE - 4A</option>
                </Form.Select>
              </Col>

              <Col md={2} className="text-end">
                <Button className="radiantBlue">
                  <FaBell />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />

        <Row className="mb-3 d-flex align-items-center">
          <Col md={8}>
            <h4 className="text-start bold text-primary">
              Daily Teaching Logs
            </h4>
          </Col>

          <Col md={4} className="d-flex justify-content-end gap-2">
            <InputGroup
              style={{
                border: "1px solid #dfdedeff",
                borderRadius: "8px",
                maxWidth: "300px",
              }}
            >
              <InputGroup.Text style={{ border: "none", background: "white" }}>
                <FaSearch />
              </InputGroup.Text>

              <Form.Control
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: "none",
                  background: "white",
                  boxShadow: "none",
                }}
              />
            </InputGroup>

            <Button
              className="radiantBlue d-flex align-items-center"
              onClick={handleAddLog}
            >
              <IoMdAdd className="me-2 mb-1" />
              Add Log
            </Button>
          </Col>
        </Row>

        <div className="flex-grow-1 table_dailylog-wrapper">
          <Table hover responsive className="align-middle dailylog-table">
  <thead>
    <tr>
      <th>Date</th>
      <th>Lesson/Chapter</th>
      <th>Topic</th>
      <th>Activity</th>
      <th>Notes</th>
      <th>No of Periods</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {filteredLogs.length > 0 ? (
      filteredLogs.map((log, index) => (
        <tr key={index}>
          <td>{log.date}</td>
          <td>{log.lesson}</td>

          {/* Topic: 3 line display */}
          <td>
            <div className="topic-wrapper text-start">
              <div><strong>Planned:</strong> {log.planned_topics}</div>
              <div><strong>Completed:</strong> {log.completed_topics}</div>
              <div><strong>Pending:</strong> {log.pending_topics}</div>
            </div>
          </td>

          <td className="truncate-text">{log.studentActivity}</td>
          <td className="truncate-text">{log.notes}</td>

          <td className="text-center fw-bold">{log.period}</td>

          <td>
           <div className="action-cell">
  <div
    className="ai-report-btn d-flex align-items-center gap-2 "
    onClick={aiReport}
  >
    <img src={star} alt="AI Report" className="ai-icon" />
    <span>AI Report</span>
  </div>

  <div className="edit-btn">
    <img src={PEN} alt="Edit" />
  </div>
</div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7" className="text-center text-muted py-4">
          No daily logs found. Click "Add Log" to create one.
        </td>
      </tr>
    )}
  </tbody>
</Table>

        </div>

        
        <div className="mt-3">
          <div className="d-flex justify-content-end bg-light">
            <span className="text-muted me-3">
              Page {currentPage} of {Math.ceil(filteredLogs.length / itemsPerPage)} • Showing{" "}
              {filteredLogs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -
              {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} items
            </span>

            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
              {[...Array(Math.ceil(filteredLogs.length / itemsPerPage))].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === Math.ceil(filteredLogs.length / itemsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </Pagination>

           
            

           
            <Modal
              show={showReport}
              onHide={() => setShowReport(false)}
              centered
              contentClassName="custom-modal"
            >
              <Modal.Header
                className="border-0 pb-0  d-flex justify-content-between"
                
              >
                <div>
                  <h5 className="modal-title-custom">
                    Lesson Topic Vs Monthly Herald
                  </h5>
                  <small className="modal-subtitle-custom">AI Comparison</small>
                </div>
                <div className="radiantBlue">
                  <BsStars />
                </div>
              </Modal.Header>

              <Modal.Body className="pt-2">
                <Row className="comparison-box mx-1 p-3">
                  <Col md={4} className="text-center">
                    <p className="box-label">Scheduled Date</p>
                    <h6 className="box-value">Nov 05, 2025</h6>
                  </Col>
                  <Col md={4} className="text-center">
                    <p className="box-label">Completed Date</p>
                    <h6 className="box-value">Nov 05, 2025</h6>
                  </Col>
                  <Col md={4} className="text-center">
                    <p className="box-label">Topics to Duration</p>
                    <h6 className="box-value">45min</h6>
                  </Col>
                </Row>

                <div className="mt-3">
                  <p className="section-label">Unit</p>
                  <h5 className="section-value">Unit 6 : Let’s Perform</h5>
                </div>

                <div className="mt-2">
                  <p className="section-label">Topic</p>
                  <h5 className="section-value">6.3 More Powerful Language</h5>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="status-label">Status</span>
                  <span className="status-completed">Completed</span>
                </div>

                <div className="progress custom-progress mt-1">
                  <div className="progress-bar progress-complete"></div>
                </div>
                <div className="text-end">
                  <strong className="percent-text">100%</strong>
                </div>

                <div className="mt-3">
                  <p className="section-label">Suggestions</p>
                  <h5 className="section-value">Your completed all topics</h5>
                </div>

                <div className="mt-3">
                  <p className="section-label">Motivations</p>
                  <h5 className="section-value">Your completed all topics</h5>
                </div>
              </Modal.Body>

              <Modal.Footer className="border-0 pt-0">
                <Button className="ai-btn">
                  <img
                    src={dtit}
                    className="me-2 radiantBlue"
                    style={{ width: 25, height: 25, borderRadius: "50%" }}
                  />
                  AI Chat
                </Button>
              </Modal.Footer>
            </Modal>
            <DailyPlanner
            show={showAddDailyLogs}
            handleClose={() =>setShowAddDailyLogs(false)}
            refreshData={fetdailydetail}
            ></DailyPlanner>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;