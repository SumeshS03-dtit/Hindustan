import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { SiTicktick } from "react-icons/si";
import { Row, Col } from "react-bootstrap";
import { createDailyLogs, getdetailbyDate } from "../Services/dailyLogs";

// ---------------- Utility Functions ----------------

// return today: "YYYY-MM-DD" for date input
const getTodayDate = () => new Date().toISOString().split("T")[0];

// convert to "DD/MM/YYYY" for backend request
const formatToDDMMYYYY = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

// ----------------------------------------------------

const DailyPlanner = ({ show, handleClose, refreshData }) => {
  const [formData, setFormData] = useState({
    date: getTodayDate(),
    period: "1",
    planned_topics: ["6.3 More Powerful Language"],
    lesson_name: "", 
    completed_topics: "",
    totalStudents: "",
    presentStudents: "",
    notes: "",
    studentActivity: "",
    syllabus_link:"",
    noteFile: null,
    studentActivityFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [dateResponse,setDateResponse] = useState(false);
  const teacher = JSON.parse(localStorage.getItem("TeacherData"));
  const techsubject = teacher?.subjects[0];

  // Set default date when modal opens & fetch detail
  useEffect(() => {
    if (show) {
      const today = getTodayDate();
      setFormData((prev) => ({ ...prev, date: today }));
      fetchdetail(today);
    }
  }, [show]);

  // Auto fetch when date changes manually
  useEffect(() => {
    if (show) {
      fetchdetail(formData.date);
    }
  }, [formData.date]);

  // ---------------- Fetch detail by date ----------------
  const fetchdetail = async (selectedDate) => {
    const teacher = JSON.parse(localStorage.getItem("TeacherData"));
    const teacherid = teacher?._id;

    try {
      const payload = {
        teacherId: teacherid,
        date: formatToDDMMYYYY(selectedDate), // required format for backend
      };

      const response = await getdetailbyDate(payload);
      console.log("Fetched Daily Log:", response);
      setDateResponse(response);

     // auto-fill daily log form based on fetched period
    setFormData(prev => ({
      ...prev,
      lesson_name: response.data.lesson_name || prev.lesson_name,
      planned_topics: response.data.topics?.map(t => t.topic) || prev.planned_topics,
      syllabus_link: response.data.syllabus_link,
    }));

    } catch (error) {
      console.log("Error while fetching daily logs");
    }
  };

  // ---------------- Input & File Change Handlers ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.files[0] }));
  };

  // ---------------- Submit Daily Log ----------------
  const handleSubmit = async () => {
    setLoading(true);

    const teacher = JSON.parse(localStorage.getItem("TeacherData"));
    const teacherid = teacher?._id;
    const techersubject = teacher?.subjects[0];

    const apiForm = new FormData();
    apiForm.append("teacherId", teacherid);
    apiForm.append("date", formatToDDMMYYYY(formData.date)); // save in DD/MM/YYYY
    apiForm.append("subject",techersubject);
    apiForm.append("period", formData.period);
    apiForm.append("planned_topics", JSON.stringify(formData.planned_topics));
    apiForm.append("completed_topics", JSON.stringify(formData.completed_topics.split(",")));
    apiForm.append("totalStudents", formData.totalStudents);
    apiForm.append("presentStudents", formData.presentStudents);
    apiForm.append("notes", formData.notes);
    apiForm.append("studentActivity", formData.studentActivity);
    apiForm.append("syllabus_link")
    if (formData.noteFile) apiForm.append("noteFile", formData.noteFile);
    if (formData.studentActivityFile) apiForm.append("studentActivityFile", formData.studentActivityFile);

    try {
      await createDailyLogs(apiForm);
      refreshData(); 
      handleClose(); 
    } catch (err) {
      console.log("API Failed", err);
    }
    setLoading(false);
  };

  // ---------------- UI ----------------
  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="monthly-modal">
      <Modal.Header closeButton className="flex-column align-items-start">
        <Modal.Title className="text-primary">Create Daily Plan</Modal.Title>
        <small className="text-muted fs-6">Record details about today's lesson</small>
      </Modal.Header>

      <Modal.Body>
        <form>
          {/* Box Details */}
          <div className="p-3 mb-3" style={{ border: "1px solid #dcdcdc", borderRadius: "10px", background: "#fff" }}>
            <Row>
              <Col md={8} xs={12}>
                <div className="mb-2"><strong>Subject:</strong> <span className="text-primary fw-bold">{techsubject}</span></div>
                <div className="mb-2"><strong>Lesson/Chapter:</strong> <span className="text-primary fw-bold">{formData.lesson_name}</span></div>
                <div><strong>Planned Topic:</strong> <span className="text-primary fw-bold">  {formData.planned_topics?.join(", ") || "—"}</span></div>
              </Col>
              <Col md={4} xs={12} className="text-end">
<a
  href={formData.syllabus_link}
  target="_blank"
  rel="noopener noreferrer"
  className="d-inline-block"
  style={{
    border: "1px dotted black",
    borderRadius: "6px",
    padding: "4px 10px",
    minWidth: "60px",
    textAlign: "center",
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
    fontWeight: "500",
  }}
>
  pdf
</a>

</Col>

            </Row>
          </div>

          {/* Date + Period */}
          <Row className="mb-3">
            <Col md={6}>
              <label className="form-label fw-semibold text-primary">Date *</label>
              <input type="date" className="form-control" name="date" value={formData.date} onChange={handleInputChange} />
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold text-primary">No. of Periods *</label>
              <input type="number" className="form-control" name="period" value={formData.period} onChange={handleInputChange} />
            </Col>
          </Row>

          {/* Completed Topics */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-primary">Completed Topics *</label>
            <input type="text" className="form-control" name="completed_topics" value={formData.completed_topics} onChange={handleInputChange} />
          </div>

          {/* Students Count */}
          <Row className="mb-3">
            <Col md={6}>
              <label className="form-label fw-semibold text-primary">Total Students *</label>
              <input type="number" className="form-control" name="totalStudents" value={formData.totalStudents} onChange={handleInputChange} />
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold text-primary">Students Present *</label>
              <input type="number" className="form-control" name="presentStudents" value={formData.presentStudents} onChange={handleInputChange} />
            </Col>
          </Row>

          {/* Notes & Upload */}
          <Row className="mb-3">
            <Col md={6}>
              <label className="form-label fw-semibold text-primary">Notes & Observations</label>
              <textarea className="form-control" rows={3} name="notes" value={formData.notes} onChange={handleInputChange}></textarea>
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold text-primary">File Upload (Notes)</label>
              <div className="upload-box">
                <input type="file" className="d-none" id="noteFile" onChange={(e) => handleFileChange(e, "noteFile")} />
                <label htmlFor="noteFile"><FiUpload size={20} /> Tap to upload</label>
              </div>
              {formData.noteFile && <small className="text-success d-block">Selected: {formData.noteFile.name}</small>}
            </Col>
          </Row>

          {/* Student Activity */}
          <Row className="mb-3">
            <Col md={6}>
              <label className="form-label fw-semibold text-primary">Students Activity</label>
              <textarea className="form-control" rows={3} name="studentActivity" value={formData.studentActivity} onChange={handleInputChange}></textarea>
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold text-primary">File Upload (Activity)</label>
              <div className="upload-box">
                <input type="file" className="d-none" id="studentActivityFile" onChange={(e) => handleFileChange(e, "studentActivityFile")} />
                <label htmlFor="studentActivityFile"><FiUpload size={20} /> Tap to upload</label>
              </div>
              {formData.studentActivityFile && <small className="text-success d-block">Selected: {formData.studentActivityFile.name}</small>}
            </Col>
          </Row>

          {/* Submit */}
          <div className="text-end">
            <button type="button" className="btn btn-primary px-4 radiantBlue" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : <><SiTicktick className="me-2" /> Submit</>}
            </button>
          </div>

        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DailyPlanner;
