import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "../Styles/MyClasses.css";
import { FaBell } from "react-icons/fa6";
import gradeA from "../assets/HIS/images/gradeone.png";
import gradeB from "../assets/HIS/images/gradetwo.png";
import gradeC from "../assets/HIS/images/gradethree.png";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

const MyClasses = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [value, setValue] = useState(new Date());

  const classes = [
    { gradeA: "Grade 3A", students: 36, room: 204, topics: 54 },
    { gradeB: "Grade 3B", students: 34, room: 205, topics: 54 },
    { gradeC: "Grade 3C", students: 32, room: 206, topics: 54 },
  ];

  const schedule = [
    {
      date: "Nov 14",
      title: "Class – Grade 3A",
      topic: "6.1 What Nonsense",
      period: "2 - Period",
    },
    {
      date: "Nov 14",
      title: "Class – Grade 3B",
      topic: "6.2 From Story to Play",
      period: "4 - Period",
    },
    {
      date: "Nov 14",
      title: "Teachers Meeting",
      topic: "All Teachers Meeting at Conference Room",
      period: "6 - Period",
    },
    {
      date: "Nov 14",
      title: "Class – Grade 3C  ",
      topic: "6.1 More Powerful Language",
      period: "2 - Period",
    },
  ];

  return (
    <div className="my-classes-container">
      <Row className="myclassHeader">
        <Col md={6} className="text-start">
          <h3 className="fw-bold m-0">My Classes</h3>
          <p className="text-muted">Manage your classes and student progress</p>
        </Col>

        <Col md={6}>
          <div className="text-end">
            <Button className="notification-btn ">
              <FaBell />
            </Button>
          </div>
        </Col>
      </Row>

      <h5 className="text-primary text-start m-2">Classes</h5>

      <Row className="">
        {classes.map((cls, index) => (
          <Col md={4} key={index}>
            <Card className="class-card">
              <Card.Body>
                <Row>
                  <Col md={5} className="d-flex justify-content-center">
                    <div className="grade-circle">
                      <img src={gradeA} alt="grade" />
                    </div>
                  </Col>

                  <Col md={7}>
                    <p className="info-line d-flex justify-content-between">
                      Students:
                      <span className="fw-bold ms-5"> {cls.students}</span>
                    </p>
                    <p className="info-line d-flex justify-content-between">
                      Room No:
                      <span className="fw-bold ms-5"> {cls.room}</span>
                    </p>
                    <p className="info-line d-flex justify-content-between">
                      Total Topics:
                      <span className="fw-bold ms-5"> {cls.topics}</span>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-2">
        <h5 className="text-primary text-start">Schedules</h5>
        <Row>
          <Col md={7}>
            <Card className="calendar-card p-3">
              <Row>
                <Col>
                  <h6 className="text-start">Calendar</h6>
                </Col>
              </Row>

              <Calendar
                onChange={setValue}
                value={value}
                className="w-100 border-0 custom-calendar"
              />
            </Card>
          </Col>

          <Col xs={12} md={5}>
            {schedule.map((item, idx) => (
              <Card className="schedule-card mb-2" key={idx}>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={3} md={2}>
                      <div className="date-box">
                        <h6 className="m-0 text-primary">
                          {item.date.split(" ")[0]}
                          
                        </h6>
                        <small className=" text-primary">
                          {item.date.split(" ")[1]}
                        </small>
                      </div>
                    </Col>

                    <Col xs={9} md={10}>
                      <Row >
                        <Col xs={12} sm={8}>
                          <h6 className="m-0 d-flex justify-content-between">{item.title}</h6>
                        </Col>

                        <Col
                          xs={12}
                          sm={4}
                          className="text-sm-end text-start mt-1 mt-sm-0"
                        >
                          <span className="period-badge text-primary ">
                            {item.period}
                          </span>
                        </Col>
                      </Row>

                      <Row className="m-0">
                        <Col xs={12}>
                          <small className="text-muted d-flex justify-content-between">{item.topic}</small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </div>

      <Card className="mt-4 p-3">
        <h6>Note</h6>
      </Card>
    </div>
  );
};

export default MyClasses;
