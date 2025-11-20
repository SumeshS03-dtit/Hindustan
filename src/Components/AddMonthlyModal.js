import { Modal, Button } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import "../Styles/MonthlyModal.css";
import tickmark from "../assets/HIS/images/tick mark.svg";
import {createMonthlyHerald} from "../Services/monthlyherald"

const AiSuggestionModal = ({ show, handleClose,refreshData }) => {
  const teacher = JSON.parse(localStorage.getItem("TeacherData"));
  const defaultSubject = teacher?.subjects?.[0] || "";
  const getTodayDate = () => {
  return new Date().toISOString().split("T")[0]; // "2025-11-19"
};

  

  const [formData, setFormData] = useState({
    month: "",
    year: "",
    date: getTodayDate(),   // ⬅ set current date automatically
    subject: defaultSubject,    // subject from localStorage
    periods: "",
    periodDuration: "",
    durationDays: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (show) {
      const teacher = JSON.parse(localStorage.getItem("TeacherData"));
      setFormData(prev => ({
        ...prev,
        subject: teacher?.subjects?.[0] || ""
      }));
    }
  }, [show]);

  useEffect(() => {
  if (show) {
    setFormData(prev => ({
      ...prev,
      date: getTodayDate(), // reset date when modal opens
    }));
  }
}, [show]);


  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

const handleSave = async () => {
  setLoading(true);   // start loading

  const teacher = JSON.parse(localStorage.getItem("TeacherData"));
  const teacherid = teacher?._id;

  const apiForm = new FormData();
  apiForm.append("date", formData.date);
  apiForm.append("teacherId", teacherid);
  apiForm.append("subject", formData.subject);
  apiForm.append("total_periods", formData.periods);
  apiForm.append("period_duration_minutes", formData.periodDuration);
  apiForm.append("duration_days", "20");
  apiForm.append("syllabus_link", formData.file);
  apiForm.append("month", formData.month);
  apiForm.append("year", formData.year)

  try {
    const result = await createMonthlyHerald(apiForm);

    if (result.message === "Monthly Herald created successfully") {
      handleClose();            // close modal
      refreshData();       // refresh UI immediately
    }
  } catch (error) {
    console.log("API Failed:", error);
  } finally{
    setLoading(false);  // stop loading
  }
};



  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="monthly-modal">
      <Modal.Header closeButton  >
         <div>
    <Modal.Title className="text-primary">Create Monthly Plan</Modal.Title>
    <small className="text-muted">Create a lesson plan for an upcoming class</small>
  </div>
      </Modal.Header>

      <Modal.Body>
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-6 col-12">
              <label className="text-primary">Date</label>
              <input
                className="form-control"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
             

            </div> */}
            <div className="col-lg-6 col-12">
              <div className="row w-100">
                <label className="text-primary">Month & Year</label>
                <div className="col-lg-6 col-6">
<select
  className="form-control"
  value={formData.month}
  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
>
  <option hidden>Select Month</option>

  {/* {[
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ].map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ))} */}
   {[
    "October", "November", "December"
  ].map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ))}

</select>

                </div>
                <div className="col-lg-6 col-6">
                  <select
  className="form-control"
  value={formData.year}
  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
>
  <option hidden>Select Year</option>
  {/* {Array.from({ length: 16 }, (_, i) => 2025 + i).map(y => (
    <option key={y} value={y}>{y}</option>
  ))} */}
  <option key={2025} value={2025}>2025</option>
</select>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <label className="text-primary">Subject</label>
              <input
                className="form-control"
                value={formData.subject}
                // onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                readOnly
              />
            </div>

            <div className="col-lg-6 col-12">
              <label className="text-primary mt-lg-3">No. of Periods</label>
              <input
  className="form-control"
  type="number"
  placeholder="Enter Total Number of Periods"
  value={formData.periods}
  onChange={(e) => setFormData({ ...formData, periods: e.target.value })}
/>
            </div>
            <div className="col-lg-6 col-12">
              <label className="text-primary mt-lg-3">Period Duration</label>
              <input
  className="form-control"
  type="number"
  placeholder="Enter Period Duration (in minutes)"
  value={formData.periodDuration}
  onChange={(e) => setFormData({ ...formData, periodDuration: e.target.value })}
/>
            </div>
            {/* <div className="col-lg-6 col-12">
              <label className="text-primary mt-lg-3">Duration Days</label>
              <input
  className="form-control"
  type="number"
  placeholder="Enter Duration Days"
  value={formData.durationDays}
  onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
/>
            </div> */}

            <div className="col-lg-12 col-12 mt-lg-3">
              <label className="text-primary">File Upload</label>
              <div className="upload-box" onClick={() => fileInputRef.current.click()}>
                <i className="bi bi-upload"></i>
                <span> {formData.file ? formData.file.name : "Tap to upload"} </span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
  onClick={handleSave}
  className="save-btn d-flex align-items-center gap-2"
  disabled={loading}  // disable while submitting
>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2"></span>
      Submitting...
    </>
  ) : (
    <>
      <img src={tickmark} alt="save" style={{ width: "18px" }} /> Save
    </>
  )}
</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AiSuggestionModal;
