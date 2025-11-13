import React, { useState } from "react";
import "../Styles/Dailylogs.css";
import bell from "../assets/HIS/icons/Vector-4.png";
import star from "../assets/HIS/icons/star.jpeg";
import PEN from "../assets/HIS/icons/pen.png";
import upload from "../assets/HIS/icons/upload.png";
import { MdOutlineUpload } from "react-icons/md";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaBell } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import {
  Row,
  Col,
  Form,
  Button,
  Table,
  Pagination,
  InputGroup,
  Modal,
} from "react-bootstrap";

const DailyLog = () => {
  const [search, setSearch] = useState("");
  const [showReport, setShowReport] = useState(false);

  const aiReport = () => {
    setShowReport(true);
    console.log("clicked");
  };

  const logs = [
    {
      date: "Nov 06, 2025",
      lesson: "Unit 6: Let's Perform",
      topic: "6.3 More Powerful Language",
      activity: "Role play sparrows quest..",
      notes: "Role play sparrows quest..",
      attachment: true,
      noOfPeriods: 1,
    },
    {
      date: "Nov 06, 2025",
      lesson: "Unit 6: Let's Perform",
      topic: "6.3 More Powerful Language",
      activity: "Role play sparrows quest..",
      notes: "Role play sparrows quest..",
      attachment: false,
      noOfPeriods: 1,
    },
    {
      date: "Nov 05, 2025",
      lesson: "Unit 6: Let's Perform",
      topic: "6.2 From Story to Play",
      activity: "Narrate a story",
      notes: "Narrate a story",
      attachment: false,
      noOfPeriods: 1,
    },
    {
      date: "Nov 04, 2025",
      lesson: "Unit 6: Let's Perform",
      topic: "6.1 What are Actions",
      activity: "The flippery flopper jumped..",
      notes: "The flippery flopper jumped..",
      attachment: false,
      noOfPeriods: 3,
    },
    {
      date: "Nov 03, 2025",
      lesson: "Unit 6: Let's Perform",
      topic: "6.1 What are Actions",
      activity: "Write your own nonsense..",
      notes: "Write your own nonsense..",
      attachment: false,
      noOfPeriods: 1,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredLogs = logs.filter((log) =>
    log.topic.toLowerCase().includes(search.toLowerCase())
  );

  const currentLogs = filteredLogs.slice(startIndex, endIndex);

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

        <Row className="mb-3 d-flex justify-content-end">
          <Col>
            {" "}
            <h4 className="text-start bold text-primary ">
              Daily Teaching Logs
            </h4>
          </Col>

          <Col md={2}>
            <InputGroup
              style={{ border: "1px solid #ccc", borderRadius: "5px" }}
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
          </Col>
          <Col className="text-end" md={2}>
            <Button className="radiantBlue">
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
              {currentLogs
                .filter((log) =>
                  log.topic.toLowerCase().includes(search.toLowerCase())
                )
                .map((log, index) => (
                  <tr key={index}>
                    <td>{log.date}</td>
                    <td>{log.lesson}</td>
                    <td>{log.topic}</td>
                    <td>
                      {log.activity}
                      {log.attachment && (
                        <div
                          className="text-primary"
                          style={{ cursor: "pointer" }}
                        >
                          <MdAttachFile /> Attachment
                        </div>
                      )}
                    </td>
                    <td>
                      {log.notes}
                      {log.attachment && (
                        <div
                          className="text-primary"
                          style={{ cursor: "pointer" }}
                        >
                          <MdAttachFile /> Attachment
                        </div>
                      )}
                    </td>
                    <td>{log.noOfPeriods}</td>
                    <td>
                     <Button
  className="bg-white custom_ai_btn d-flex align-items-center gap-2"
  style={{ marginInline: "15px", borderRadius: "20px" }}
  onClick={aiReport}
>
  <img
    src={star}
    style={{ width: 20, height: 20 }}
  />

  <span className="text-primary">Ai Reports</span>
</Button>

                      <Button
                        className="bg-white outline"
                        style={{ borderRadius: "50%" }}
                      >
                        <img src={PEN} style={{ width: 20, height: 20 }} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-end bg-light">
            <span className="text-muted me-3">
              Page {currentPage} of{" "}
              {Math.ceil(filteredLogs.length / itemsPerPage)} • Showing{" "}
              {filteredLogs.length === 0 ? 0 : startIndex + 1} -
              {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length}{" "}
              items
            </span>

            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              />

              {[...Array(Math.ceil(logs.length / itemsPerPage))].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === Math.ceil(logs.length / itemsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </Pagination>

            <Modal
              show={showReport}
              onHide={() => setShowReport(false)}
              centered
            >
              <Modal.Header>
                <h1>Lesson Topic Vs Monthly Herald</h1>
                <p>AI Comparison</p>
              </Modal.Header>
              <Modal.Body>School notice</Modal.Body>
              <Modal.Footer> this footer</Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;
