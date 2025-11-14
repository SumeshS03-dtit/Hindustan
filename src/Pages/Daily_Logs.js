import React, { useState, useEffect } from "react";
import "../Styles/Dailylogs.css";
import bell from "../assets/HIS/icons/Vector-4.png";
import star from "../assets/HIS/icons/ai start.jpg";
import dtit from "../assets/HIS/icons/ai start.jpg";
import PEN from "../assets/HIS/icons/pen.png";
import upload from "../assets/HIS/icons/upload.png";
import { MdOutlineUpload } from "react-icons/md";
import { AiOutlineFilePdf } from "react-icons/ai";
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

const DailyLog = () => {
  const [search, setSearch] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState([]);
  
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
    fetchLogs();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  
  const handleSubmitLog = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("Teachertoken");
    const teacherData = JSON.parse(localStorage.getItem("TeacherData"));
    const teacherId = teacherData?._id;
    const BaseUrl = process.env.REACT_APP_API_BASE_URL;

    console.log("BaseUrl:", BaseUrl);
    console.log("Creating log at:", `${BaseUrl}/dailylogs/create`);

    
    if (!formData.date || !formData.completed_topics || !formData.totalStudents || !formData.presentStudents) {
      alert("Please fill all required fields");
      setLoading(false);
      return;
    }

    
    const submitData = new FormData();
    submitData.append('teacherId', teacherId);
    submitData.append('date', formData.date);
    submitData.append('period', formData.period);
    submitData.append('subject', 'English');
    
   
    const completedTopicsArray = formData.completed_topics.split(',').map(topic => topic.trim());
    completedTopicsArray.forEach(topic => {
      submitData.append('completed_topics', topic);
    });
    
   
    formData.planned_topics.forEach(topic => {
      submitData.append('planned_topics', topic);
    });

    submitData.append('totalStudents', formData.totalStudents);
    submitData.append('presentStudents', formData.presentStudents);
    submitData.append('notes', formData.notes || '');
    submitData.append('studentActivity', formData.studentActivity || '');
    
    if (formData.noteFile) {
      submitData.append('noteFile', formData.noteFile);
    }
    if (formData.studentActivityFile) {
      submitData.append('studentActivityFile', formData.studentActivityFile);
    }

    console.log("Sending data to API...");
    for (let [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch(`${BaseUrl}/dailylogs/create`, { // REMOVED extra /api
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      console.log("Create response status:", response.status);
      
      const data = await response.json();
      console.log("Create API Response:", data);

      if (response.ok && data.report) {
       
        setFormData({
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
        setShowLogs(false);
        
      
        fetchLogs();
        
        alert("Daily log created successfully!");
      } else {
        alert(data.message || "Failed to create daily log. Please try again.");
      }
    } catch (error) {
      console.error("Error creating daily log:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleSubmitLogJSON = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("Teachertoken");
    const teacherData = JSON.parse(localStorage.getItem("TeacherData"));
    const teacherId = teacherData?._id;
    const BaseUrl = process.env.REACT_APP_API_BASE_URL;

    
    const payload = {
      teacherId: teacherId,
      date: formData.date,
      period: formData.period,
      subject: "English",
      planned_topics: formData.planned_topics,
      completed_topics: formData.completed_topics.split(',').map(topic => topic.trim()),
      totalStudents: parseInt(formData.totalStudents),
      presentStudents: parseInt(formData.presentStudents),
      notes: formData.notes || "",
      studentActivity: formData.studentActivity || ""
    };

    console.log("Sending JSON payload:", payload);

    try {
      const response = await fetch(`${BaseUrl}/dailylogs/create`, { // REMOVED extra /api
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("JSON API Response:", data);

      if (response.ok && data.report) {
        setFormData({
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
        setShowLogs(false);
        fetchLogs();
        alert("Daily log created successfully!");
      } else {
        alert(data.message || "Failed to create daily log");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating daily log");
    } finally {
      setLoading(false);
    }
  };

  const aiReport = () => {
    setShowReport(true);
  };

  const handleAddLog = () => {
    setShowLogs(true);
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
          <Table hover responsive className="align-middle table_dailylog">
            <thead className="table ">
              <tr>
                <th>Date</th>
                <th>Lesson/chapter</th>
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
                  <tr key={index} className="custom_line">
                    <td>{log.date}</td>
                    <td>{log.lesson}</td>
                    <td>
                      <Col>
                        <Row>
                          <span>Planned: {log.planned_topics}</span>
                        </Row>
                        <Row>
                          <span>Completed: {log.completed_topics}</span>
                        </Row>
                        <Row>
                          <span>Pending: {log.pending_topics}</span>
                        </Row>
                      </Col>
                    </td>
                    <td>{log.studentActivity}</td>
                    <td>{log.notes}</td>
                    <td>{log.period}</td>
                    <td className="custom_height">
  <div className="d-flex justify-content-center align-items-center h-100">
    <Button
      className="bg-white custom_ai_btn d-flex align-items-center g-1 me-2"
      style={{ borderRadius: "20px" }}
      onClick={aiReport}
    >
      <img src={star} style={{ width: 25, height: 25 }} alt="AI Report" />
      <span className="text-primary">
        <strong>Ai Reports</strong>
      </span>
    </Button>
    <Button
      className="bg-white outline d-flex justify-content-center align-items-center"
      style={{
        borderRadius: "50%",
        width: "40px",
        height: "40px",
      }}
    >
      <img src={PEN} style={{ width: 18, height: 18 }} alt="Edit" />
    </Button>
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
              show={showLogs}
              onHide={() => setShowLogs(false)}
              centered
              size="xl"
              contentClassName="custom-modal"
            >
              <ModalHeader>
                <div>
                  <h5 className="modal-title-custom">Create Daily Logs</h5>
                  <small className="modal-subtitle-custom">
                    Record details about today's lesson
                  </small>
                </div>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={handleSubmitLog}>
                  <div
                    className="p-3 mb-3"
                    style={{
                      border: "1px solid #dcdcdc",
                      borderRadius: "10px",
                      background: "#ffffff",
                    }}
                  >
                    <Row className="d-flex justify-content-between">
                      <Col>
                        <div className="mb-2">
                          <span className="fw-semibold text-dark me-5">
                            Subject :{" "}
                          </span>
                          <span className="text-primary ms-3" style={{ fontWeight: "bold" }}>
                            English
                          </span>
                        </div>

                        <div className="mb-2">
                          <span className="fw-semibold text-dark me-2">
                            Lesson/Chapter :
                          </span>
                          <span className="text-primary" style={{ fontWeight: "bold" }}>
                            Unit 6: Let's Perform
                          </span>
                        </div>

                        <div>
                          <span className="fw-semibold text-dark me-4">
                            Planned Topics :
                          </span>
                          <span className="text-primary" style={{ fontWeight: "bold" }}>
                            6.3 More Powerful Language
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <Row className="mb-3">
                    <Col md={6}>
                      <label className="form-label fw-semibold text-primary">
                        Date *
                      </label>
                      <div className="date-input-wrapper">
                        {/* <FaRegCalendarAlt className="date-icon" /> */}
                        <input 
                          type="date" 
                          className="form-control custom-date" 
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <label className="form-label fw-semibold text-primary">
                        No. of Periods *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="period"
                        value={formData.period}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary">
                      Completed Topics *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="completed_topics"
                      value={formData.completed_topics}
                      onChange={handleInputChange}
                      placeholder="Enter completed topics (comma separated for multiple)"
                      required
                    />
                    <small className="text-muted">Separate multiple topics with commas</small>
                  </div>

                  <Row className="mb-3">
                    <Col md={6}>
                      <label className="form-label fw-semibold text-primary">
                        Total Students *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="totalStudents"
                        value={formData.totalStudents}
                        onChange={handleInputChange}
                        placeholder="Enter the total students"
                        min="1"
                        required
                      />
                    </Col>

                    <Col md={6}>
                      <label className="form-label fw-semibold text-primary">
                        Students Present *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="presentStudents"
                        value={formData.presentStudents}
                        onChange={handleInputChange}
                        placeholder="Enter the present students"
                        min="0"
                        max={formData.totalStudents}
                        required
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <label className="form-label fw-semibold text-primary">
                        Notes & Observations
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Key points, student engagement, homework assigned, etc."
                      ></textarea>
                    </Col>

                    <Col md={6}>
                      <label className="form-label fw-semibold text-primary">
                        File Upload (Notes)
                      </label>
                      <div className="upload-box">
                        <input
                          type="file"
                          className="d-none"
                          id="noteFile"
                          onChange={(e) => handleFileChange(e, 'noteFile')}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="noteFile" className="w-100 h-100 d-flex align-items-center justify-content-center cursor-pointer">
                          <div className="text-center text-secondary">
                            <FiUpload size={20} /> Tap to upload
                          </div>
                        </label>
                      </div>
                      {formData.noteFile && (
                        <small className="text-success">File selected: {formData.noteFile.name}</small>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <label className="form-label fw-semibold text-primary">
                        Students Activity
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        name="studentActivity"
                        value={formData.studentActivity}
                        onChange={handleInputChange}
                        placeholder="Describe student activities, engagement, etc."
                      ></textarea>
                    </Col>

                    <Col md={6}>
                      <label className="form-label fw-semibold text-primary">
                        File Upload (Activity)
                      </label>
                      <div className="upload-box">
                        <input
                          type="file"
                          className="d-none"
                          id="studentActivityFile"
                          onChange={(e) => handleFileChange(e, 'studentActivityFile')}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="studentActivityFile" className="w-100 h-100 d-flex align-items-center justify-content-center cursor-pointer">
                          <div className="text-center text-secondary">
                            <FiUpload size={20} /> Tap to upload
                          </div>
                        </label>
                      </div>
                      {formData.studentActivityFile && (
                        <small className="text-success">File selected: {formData.studentActivityFile.name}</small>
                      )}
                    </Col>
                  </Row>

                <div className="text-end">
  <button 
    type="button" 
    className="btn btn-primary px-4 radiantBlue"
    onClick={handleSubmitLogJSON}
    disabled={loading}
  >
    {loading ? (
      <>
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Submitting...
      </>
    ) : (
      <>
        <SiTicktick className="me-2" />
        Submit
      </>
    )}
  </button>
</div>
                </form>

                
                {/* <div className="text-center mt-3">
                  <small className="text-muted">
                    If submission fails, try{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0"
                      onClick={handleSubmitLogJSON}
                      disabled={loading}
                    >
                      alternative method
                    </button>
                  </small>
                </div> */}
              </ModalBody>
            </Modal>

           
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;