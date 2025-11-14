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
import star from "../assets/HIS/icons/ai start.jpg";

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
import { FaWeight } from "react-icons/fa";



//daily
const dailyData = [
  { name: "Nov 03", actual: 6, completed: 6, partial: 0 },
  { name: "Nov 04", actual: 6, completed: 0, partial: 4 },
  { name: "Nov 05", actual: 4, completed: 6, partial: 0 },
  { name: "Nov 06", actual: 3, completed: 0, partial: 1 },
  { name: "Nov 07", actual: 5, completed: 0, partial: 3 },
];

const processedData = dailyData.map((item) => {
  const bars = [];

  if (item.actual > 0) bars.push({ key: "actual", value: item.actual });

  if (item.completed > 0)
    bars.push({ key: "completed", value: item.completed });

  if (item.partial > 0) bars.push({ key: "partial", value: item.partial });

  return {
    name: item.name,
    bar1: bars[0]?.value || 0,
    bar1Key: bars[0]?.key || null,

    bar2: bars[1]?.value || 0,
    bar2Key: bars[1]?.key || null,

    bar3: bars[2]?.value || 0,
    bar3Key: bars[2]?.key || null,
  };
});

//daily

// const barKeys = Object.keys(processedData[0]).filter((k) => k !== "name");

const getColor = (key) => {
  if (key === "actual") return "#4A90E2";
  if (key === "completed") return "#4CAF50";
  if (key === "partial") return "#F9A825";
  return "transparent";
};
//Weekly
const monthlyData = [
  { name: "Week 1", actual: 15, completed: 15, partial: 0 },
  { name: "Week 2", actual: 13, completed: 0, partial: 11 },
  { name: "Week 3", actual: 13, completed: 15, partial: 0 },
  { name: "Week 4", actual: 7, completed: 5, partial: 0 },
];

const weeklyProcessed = monthlyData.map((item) => {
  const bars = [];

  if (item.actual > 0) bars.push({ key: "actual", value: item.actual });

  if (item.completed > 0)
    bars.push({ key: "completed", value: item.completed });

  if (item.partial > 0) bars.push({ key: "partial", value: item.partial });

  return {
    name: item.name,
    bar1: bars[0]?.value || 0,
    bar1Key: bars[0]?.key || null,

    bar2: bars[1]?.value || 0,
    bar2Key: bars[1]?.key || null,

    bar3: bars[2]?.value || 0,
    bar3Key: bars[2]?.key || null,
  };
}); //weekly

const data = [
  {
    title: "Unit 6: Story Time",
    covered: 12,
    total: 12,
    status: "Completed",
    color: "#4CAF50",
    statusColor: "#C8E6C9",
    statusText: "#2E7D32",
  },
  {
    title: "Unit 5: Let’s Perform",
    covered: 8,
    total: 10,
    status: "Behind Schedule",
    color: "#FF9800",
    statusColor: "#FFE0B2",
    statusText: "#E65100",
  },
  {
    title: "Unit 4: Household things",
    covered: 9,
    total: 11,
    status: "On Track",
    color: "#7E57C2",
    statusColor: "#D1C4E9",
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
    title: "Pending Topics",
    desc: "AI found that the Topic “6.4 Create Characters” is still pending. It is recommended to schedule one revision class to complete this topic.",
    button: "View More",
  },
  {
    title: "AI Suggestions for Your Monthly Herald",
    desc: "AI identified that students have not yet completed the “Where the Story Takes Place” passage exercise. It is suggested to include this in this week’s reading practice schedule.",
    button: "View More",
  },
  {
    title: "Performance Review",
    desc: "AI observed that overall student performance in recent reading activities has slightly declined. It is recommended to conduct a short recap session to strengthen comprehension and accuracy before moving to the next unit.",
    button: "View More",
  },
];

const Analytics = () => {
  return (
    <div className="analytics_main_content bg-light ">
      <Row>
        <Col>
          <div className="header">
            <Row className="">
              <Col md={4}>
                <div className="text-start">
                  <h3 style={{ marginBottom: 4 }}>Analytics Overview</h3>
                  <p style={{ color: "#6b6b6b" }}>
                    Manage your classes, lessons, and student progress
                  </p>
                </div>
              </Col>
              <Col md={2}></Col>

              <Col
                md={6}
                className="d-flex justify-content-end align-items-center gap-3"
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

          <hr className="mt-0" />

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
                  <Col className="mb-4">
                    <div className="text-start">
                      <h5 className="fw-bold text-primary m-0">
                        Daily Completion
                      </h5>
                      <p
                        className="text-muted m-0"
                        style={{ fontSize: "18px" }}
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
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={processedData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis
                      // domain={[0, 10]}
                      />
                      <Tooltip />

                      <Bar
                        dataKey="bar1"
                        barSize={40}
                        shape={(props) => {
                          const { x, y, width, height, payload } = props;
                          if (!payload.bar1Key) return null;
                          return (
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              fill={getColor(payload.bar1Key)}
                              rx={4}
                            />
                          );
                        }}
                      />

                      <Bar
                        dataKey="bar2"
                        barSize={40}
                        shape={(props) => {
                          const { x, y, width, height, payload } = props;
                          if (!payload.bar2Key) return null;
                          return (
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              fill={getColor(payload.bar2Key)}
                              rx={4}
                            />
                          );
                        }}
                      />

                      <Bar
                        dataKey="bar3"
                        barSize={40}
                        shape={(props) => {
                          const { x, y, width, height, payload } = props;
                          if (!payload.bar3Key) return null;
                          return (
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              fill={getColor(payload.bar3Key)}
                              rx={4}
                            />
                          );
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-legend d-flex justify-content-center">
                  <div className="legend-item">
                    <span className="legend-box blue"></span> Actual Topics
                  </div>
                  <div className="legend-item">
                    <span className="legend-box green"></span> Completed Topics
                  </div>
                  <div className="legend-item">
                    <span className="legend-box yellow"></span> Partially
                    completed Topics
                  </div>
                </div>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-3 mb-3">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col className="mb-4">
                    <div className="text-start">
                      <h5 className="fw-bold text-primary m-0">
                        Weekly Completion
                      </h5>
                      <p
                        className="text-muted m-0"
                        style={{ fontSize: "18px" }}
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
                    <div style={{ width: "100%", height: 260 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyProcessed}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />

                          <Bar
                            dataKey="bar1"
                            barSize={40}
                            shape={(props) => {
                              const { x, y, width, height, payload } = props;
                              if (!payload.bar1Key) return null;
                              return (
                                <rect
                                  x={x}
                                  y={y}
                                  width={width}
                                  height={height}
                                  fill={getColor(payload.bar1Key)}
                                  rx={4}
                                />
                              );
                            }}
                          />

                          <Bar
                            dataKey="bar2"
                            barSize={40}
                            shape={(props) => {
                              const { x, y, width, height, payload } = props;
                              if (!payload.bar2Key) return null;
                              return (
                                <rect
                                  x={x}
                                  y={y}
                                  width={width}
                                  height={height}
                                  fill={getColor(payload.bar2Key)}
                                  rx={4}
                                />
                              );
                            }}
                          />

                          <Bar
                            dataKey="bar3"
                            barSize={40}
                            shape={(props) => {
                              const { x, y, width, height, payload } = props;
                              if (!payload.bar3Key) return null;
                              return (
                                <rect
                                  x={x}
                                  y={y}
                                  width={width}
                                  height={height}
                                  fill={getColor(payload.bar3Key)}
                                  rx={4}
                                />
                              );
                            }}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </ResponsiveContainer>
                </div>
                <div className="chart-legend d-flex justify-content-center">
                  <div className="legend-item">
                    <span className="legend-box blue"></span> Actual Topics
                  </div>
                  <div className="legend-item">
                    <span className="legend-box green"></span> Completed Topics
                  </div>
                  <div className="legend-item">
                    <span className="legend-box yellow"></span> Partially
                    completed Topics
                  </div>
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
                        <h5 className="fw-bold text-primary m-0">
                          {" "}
                          Monthly Curriculum Coverage
                        </h5>
                        <p className="text-muted" style={{ fontSize: "18px" }}>
                          Overall Lesson / Chapter completion percentage
                        </p>
                      </div>
                    </Col>
                    <Col>
                      <div className="text-end">
                        <h5 className="text-primary">48%</h5>
                        <p className="text-muted">33 of 69 topics</p>
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
                <div>
                  <span className="text-muted">Topics Covered percentage</span>
                </div>
              </Card>
            </Col>

            <Col md={6}>
              <Card style={{ borderRadius: 16, padding: 20 }}>
                <Row>
                  <Col>
                    <div className=" text-start">
                      <h5 className="text-primary fw-bold m-0">AI Insight</h5>
                      <p className="text-muted" style={{ fontSize: "18px" }}>
                        Personalized insights
                      </p>
                    </div>
                  </Col>
                  <Col className="text-end">
                    <img
                      className=" bg-white me-2 "
                      src={star}
                      style={{
                        width: "40PX",
                        height: "45px",
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
                      padding: 6,
                      marginBottom: 7,
                      border: '1px solid #1890e0ff'
                      // borderBottom: "none",
                      // borderTop: "1px solid #1890e0ff",
                      // borderLeft: "1px solid #1890e0ff",
                      // borderRight: "1px solid #1890e0ff",
                    }}
                  >
                    {" "}
                    <div className="text-start">
                      <h5>{item.title}</h5>
                      <p className="text-muted">{item.desc}</p>
                    </div>
                    <div className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={{
                          fontSize: 13,
                          padding: "4px 12px",
                          borderRadius: 6,
                          border: '1px solid #d6d3d3ff'
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
