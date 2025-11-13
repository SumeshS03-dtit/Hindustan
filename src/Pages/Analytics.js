import React from "react";
import "../Styles/analytics.css";
import {
  Row,
  Col,
  Card,
  Dropdown,
  ProgressBar,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import star from "../assets/HIS/icons/star.png";

import plannedtopics from "../assets/HIS/icons/planned-topics.png";
import coveredTopics from "../assets/HIS/icons/coveredTopics.png";
import toBeCover from "../assets/HIS/icons/toBeCover.png";
import curriculamCoverage from "../assets/HIS/icons/curriculamCoverage.png";
import yellowIcon from "../assets/HIS/icons/yellowIcon.png";
import greenIcon from "../assets/HIS/icons/greenIcon.png";
import OrangeIcon from "../assets/HIS/icons/OrangeIcon.png";
import perpleIcon from "../assets/HIS/icons/perpleIcon.png";
import { FaBell } from "react-icons/fa6";

import {
  BarChart,
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dailyData = [
  { name: "Nov 03", actual: 8, completed: 8, partial: 5 },
  { name: "Nov 04", actual: 8, completed: 8, partial: 4 },
  { name: "Nov 05", actual: 8, completed: 8, partial: 0 },
  { name: "Nov 06", actual: 6, completed: 4, partial: 2 },
  { name: "Nov 07", actual: 8, completed: 5, partial: 4 },
];

const monthlyData = [
  { name: "Week 1", actual: 20, completed: 18, partial: 13 },
  { name: "Week 2", actual: 17, completed: 15, partial: 10 },
  { name: "Week 3", actual: 18, completed: 18, partial: 12 },
  { name: "Week 4", actual: 17, completed: 15, partial: 11 },
];

// const completionRateData = [
//   { month: "Jun", rate: 70 },
//   { month: "Jul", rate: 20 },
//   { month: "Aug", rate: 80 },
//   { month: "Sep", rate: 40 },
//   { month: "Oct", rate: 55 },
// ];

// const topicEfficiencyData = [
//   { topic: "Number Systems", value: 35 },
//   { topic: "Algebra", value: 80 },
//   { topic: "Fractions", value: 60 },
//   { topic: "Decimals", value: 75 },
//   { topic: "Geometry", value: 45 },
// ];

const data = [
  {
    title: "Unit 6: Story Time",
    covered: 12,
    total: 12,
    status: "Completed",
    color: "#4CAF50",
    statusColor: "#C8E6C9", // soft green badge
    statusText: "#2E7D32",
  },
  {
    title: "Unit 5: Let’s Perform",
    covered: 8,
    total: 10,
    status: "Behind Schedule",
    color: "#FF9800",
    statusColor: "#FFE0B2", // soft orange badge
    statusText: "#E65100",
  },
  {
    title: "Unit 4: Household things",
    covered: 9,
    total: 11,
    status: "On Track",
    color: "#7E57C2",
    statusColor: "#D1C4E9", // soft purple badge
    statusText: "#4A148C",
  },
  {
    title: "Unit 4: Basic emotion",
    covered: 8,
    total: 9,
    status: "On Track",
    color: "#3F51B5",
    statusColor: "#C5CAE9",
    statusText: "#283593",
  },
  {
    title: "Unit 4: Adjectives",
    covered: 5,
    total: 10,
    status: "Behind Schedule",
    color: "#FF5722",
    statusColor: "#FFCCBC",
    statusText: "#BF360C",
  },
];

const insights = [
  {
    title: "Accelerated Fractions Review",
    desc: "AI suggests dedicating 2 extra sessions to Homo–phones. 60% of students need reinforcement on converting mixed numbers.",
    button: "View Lesson Plan",
  },
  {
    title: "Curriculum Alignment Opportunity",
    desc: "Connect current Algebra topics with upcoming Geometry module to improve retention. Similar approach worked well last semester.",
    button: "Preview Materials",
  },
  {
    title: "Differentiated Learning Paths",
    desc: "8 students are ready for advanced challenges while 5 need additional support. AI has prepared tailored activities for both groups.",
    button: "Preview Materials",
  },
];

const Analytics = () => {
  return (
    <div className="analytics_main_content bg-light">
      <Row>
        <Col>
          <div className="header">
            <Row className="">
              <Col className="col-md-12 col-lg-8">
                <div className="text-start">
                  <h1 style={{ marginBottom: 4 }}>Analytics Overview</h1>
                  <p style={{ color: "#6b6b6b" }}>
                    Manage your classes, lessons, and student progress
                  </p>
                </div>
              </Col>
              
    
              <Col
                
                className="d-flex justify-content-end align-items-center gap-3 col-md-12 col-lg-4"
              >
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 10,
                      padding: "6px 16px",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    Oct 2025
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Sep 2025</Dropdown.Item>
                    <Dropdown.Item>Aug 2025</Dropdown.Item>
                    <Dropdown.Item>Jul 2025</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 10,
                      padding: "6px 16px",
                      fontSize: 14,
                    }}
                  >
                    GRADE - 3A
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>GRADE - 2A</Dropdown.Item>
                    <Dropdown.Item>GRADE - 4B</Dropdown.Item>
                    <Dropdown.Item>GRADE - 5C</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button className="radiantBlue">
                  <FaBell />
                </Button>
              </Col>
            </Row>
          </div>

          <hr />

          <Row className="m-0 mt-3 analytics-row">
            <Col md={3} sm={6} className="mb-3">
              <Card
                className="analytics-card  d-flex flex-row align-items-center p-3 position-relative"
                style={{ backgroundColor: "#e2effa" }}
              >
                <div className="left-box blue-bg d-flex align-items-center justify-content-center">
                  <img src={plannedtopics} className="icon" alt="icon" />
                </div>

                <div className="right-box ms-3">
                  <p className="title">Planned Topics</p>
                  <p className="value">59</p>
                </div>
                <div className="">
                  {" "}
                  <img
                    src={perpleIcon}
                    alt="corner icon"
                    className="position-absolute"
                    style={{
                      bottom: "8px",
                      right: "8px",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </div>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card
                className="analytics-card  d-flex flex-row align-items-center p-3"
                style={{ backgroundColor: "#e7f5dc" }}
              >
                <div className="left-box green-bg d-flex align-items-center justify-content-center">
                  <img src={coveredTopics} className="icon" alt="icon" />
                </div>

                <div className="right-box ms-3">
                  <p className="title">Covered Topics</p>
                  <p className="value">33</p>
                  <img
                    src={greenIcon}
                    alt="corner icon"
                    className="position-absolute"
                    style={{
                      bottom: "8px",
                      right: "8px",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </div>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card
                className="analytics-card red-bg d-flex flex-row align-items-center p-3"
                style={{ backgroundColor: "#fae8de" }}
              >
                <div className="left-box orange-bg d-flex align-items-center justify-content-center">
                  <img src={toBeCover} className="icon" alt="icon" />
                </div>

                <div className="right-box ms-3">
                  <p className="title">Topics To Be Covered</p>
                  <p className="value">47</p>
                </div>
                <img
                  src={OrangeIcon}
                  alt="corner icon"
                  className="position-absolute"
                  style={{
                    bottom: "8px",
                    right: "8px",
                    width: "24px",
                    height: "24px",
                  }}
                />
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card
                className="analytics-card purple-bg d-flex flex-row align-items-center p-3"
                style={{ backgroundColor: "#d9d5f6" }}
              >
                <div
                  className="left-box d-flex align-items-center justify-content-center"
                  style={{ background: "#7e6fe7" }}
                >
                  <img src={curriculamCoverage} className="icon" alt="icon" />
                </div>

                <div className="right-box ms-3">
                  <p className="title">Curriculum Coverage</p>
                  <p className="value">48%</p>
                </div>
                <img
                  src={perpleIcon}
                  alt="corner icon"
                  className="position-absolute"
                  style={{
                    bottom: "8px",
                    right: "8px",
                    width: "24px",
                    height: "24px",
                  }}
                />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="p-3 mb-3">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col>
                    <div className="text-start">
                      <h5 className="fw-bold text-primary m-0">
                        Daily Completion
                      </h5>
                      <p
                        className="text-muted m-0"
                        style={{ fontSize: "12px" }}
                      >
                        Track your daily teaching progress
                      </p>
                    </div>
                  </Col>

                  <Col xs="auto">
                    <Dropdown>
                      <Dropdown.Toggle
                        size="sm"
                        variant="light"
                        className="border"
                      >
                        Week 4
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Week 1</Dropdown.Item>
                        <Dropdown.Item>Week 2</Dropdown.Item>
                        <Dropdown.Item>Week 3</Dropdown.Item>
                        <Dropdown.Item>Week 4</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>

                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <BarChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />

                      <Bar
                        dataKey="actual"
                        fill=" #4a90e2"
                        name="Actual Topics"
                        barSize={20}
                      />

                      <Bar
                        dataKey="completed"
                        fill="#4CAF50"
                        name="Completed Topics"
                        barSize={20}
                      />

                      <Bar
                        dataKey="partial"
                        fill="#F9A825"
                        name="Partially Completed Topics"
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-3 mb-3">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col>
                    <div className="text-start">
                      <h5 className="fw-bold text-primary m-0">
                        Weekly Completion
                      </h5>
                      <p
                        className="text-muted m-0"
                        style={{ fontSize: "12px" }}
                      >
                        Planned vs. completed lessons by week
                      </p>
                    </div>
                  </Col>

                  <Col xs="auto">
                    <Dropdown>
                      <Dropdown.Toggle
                        size="sm"
                        variant="light"
                        className="border"
                      >
                        Oct 2025
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Jan 2025</Dropdown.Item>
                        <Dropdown.Item>Feb 2025</Dropdown.Item>
                        <Dropdown.Item>Mar 2025</Dropdown.Item>
                        <Dropdown.Item>Oct 2025</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>

                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />

                      <Bar
                        dataKey="actual"
                        fill="#4285F4"
                        name="Actual Topics"
                        barSize={20}
                      />

                      <Bar
                        dataKey="completed"
                        fill="#34A853"
                        name="Completed Topics"
                        barSize={20}
                      />

                      <Bar
                        dataKey="partial"
                        fill="#FBBC05"
                        name="Partially completed Topics"
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card style={{ padding: 20, borderRadius: 14 }}>
                <div>
                  <Row style={{ whiteSpace: "nowrap" }}>
                    <Col>
                      <div className="text-start">
                        <h5 className="text-primary">
                          {" "}
                          Monthly Curriculum Coverage
                        </h5>
                        <p>Overall Lesson / Chapter completion percentage</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="text-end">
                        <h5 className="text-primary">48%</h5>
                        <p>33 of 69 topics</p>
                      </div>
                    </Col>
                  </Row>
                </div>

                {data.map((item, index) => {
                  const percent = (item.covered / item.total) * 100;

                  return (
                    <div key={index} style={{ marginBottom: 25 }}>
                      <div className="d-flex justify-content-between">
                        <strong>{item.title}</strong>

                        <span
                          style={{
                            background: item.statusColor,
                            padding: "2px 10px",
                            fontSize: 12,
                            borderRadius: 20,
                            color: item.statusText,
                            fontWeight: 600,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div style={{ marginTop: 10 }}>
                        <div
                          style={{
                            width: "100%",
                            height: 10,
                            background: "#E0E0E0",
                            borderRadius: 10,
                          }}
                        >
                          <div
                            style={{
                              width: `${percent}%`,
                              height: "100%",
                              background: item.color,
                              borderRadius: 10,
                              transition: "0.4s",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div
                        className="text-end"
                        style={{ fontSize: 12, marginTop: 4 }}
                      >
                        {item.covered}/{item.total} topics
                      </div>
                    </div>
                  );
                })}
              </Card>
            </Col>

            <Col md={6}>
              <Card style={{ borderRadius: 16, padding: 20 }}>
                <Row>
                  <Col>
                    <div className=" text-start">
                      <h5 className="text-primary" style={{ fontWeight: 600 }}>
                        AI Insight
                      </h5>
                      <p>Personalized insights</p>
                    </div>
                  </Col>
                  <Col className="text-end">
                    <img
                      className=" bg-white me-2 "
                      src={star}
                      style={{
                        width: "40PX",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  </Col>
                </Row>

                {insights.map((item, index) => (
                  <Card
                    key={index}
                    style={{
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 12,
                      border: "1px solid #1890e0ff",
                    }}
                  >
                    {" "}
                    <div className="text-start">
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                    <div className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={{
                          fontSize: 13,
                          padding: "4px 12px",
                          borderRadius: 6,
                        }}
                      >
                        {item.button}
                      </Button>
                    </div>
                  </Card>
                ))}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
