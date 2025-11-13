import React, { useState } from "react";
import { Row, Col, Button, Form, Pagination } from "react-bootstrap";
import "../Styles/MonthlyHerald.css";
import { FaPencilAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaBell } from "react-icons/fa6";
import ailogo from "../assets/HIS/images/AI LOGO 3.png"


const MonthlyHerald = () => {
  const [search, setSearch] = useState("");

  const cards = [
    {
      date: "Nov 12",
      time: "9:00 AM",
      period: "1 - Period",
      chapter: "U6: Let's Perform",
      topic: "6.1 What Nonsense",
      status: "Upcoming",
    },
    {
      date: "Nov 11",
      time: "03:00 PM",
      period: "3 - Period",
      chapter: "U6: Let's Perform",
      topic: "6.2 From Story to Play",
      status: "Upcoming",
    },
    {
      date: "Nov 10",
      time: "9:00 AM",
      period: "1 - Period",
      chapter: "U6: Let's Perform",
      topic: "6.3 More Powerful Language",
      status: "Pending",
    },
    {
      date: "Nov",
      time: "9:00 AM",
      period: "1 - Period",
      chapter: "U6: Let's Perform",
      topic: "6.3 More Powerful Language",
      status: "Completed",
    },
    {
      date: "Oct 15",
      time: "12:00 PM",
      period: "4 - Period",
      chapter: "U3: My World",
      topic: "Describing surroundings",
      status: "Complete",
    },
    {
      date: "Oct 28",
      time: "2:00 PM",
      period: "3 - Period",
      chapter: "U5: Story Time",
      topic: "Where the story takes place",
      status: "Complete",
    },
    {
      date: "Oct 20",
      time: "1:00 PM",
      period: "2 - Period",
      chapter: "U4: Numbers Around",
      topic: "Understanding place value",
      status: "Pending",
    },
    {
      date: "Nov 04",
      time: "2:00 PM",
      period: "5 - Period",
      chapter: "U5: Story Time",
      topic: "Where the story takes place",
      status: "Complete",
    },
    {
      date: "Oct 29",
      time: "2:00 PM",
      period: "3 - Period",
      chapter: "U5: Story Time",
      topic: "The central struggle",
      status: "Complete",
    },
    {
  date: "Nov 09",
  time: "11:00 AM",
  period: "2 - Period",
  chapter: "U6: Let's Perform",
  topic: "6.4 Create Characters",
  status: "Upcoming",
},
{
  date: "Nov 08",
  time: "02:00 PM",
  period: "4 - Period",
  chapter: "U6: Let's Perform",
  topic: "6.5 Practice Dialogue Reading",
  status: "Pending",
},
{
  date: "Nov 07",
  time: "9:00 AM",
  period: "1 - Period",
  chapter: "U6: Let's Perform",
  topic: "6.6 Group Performance Prep",
  status: "Completed",
},
{
  date: "Nov 06",
  time: "3:00 PM",
  period: "5 - Period",
  chapter: "U5: Story Time",
  topic: "5.4 Story Summary Writing",
  status: "Complete",
},
{
  date: "Nov 05",
  time: "2:00 PM",
  period: "4 - Period",
  chapter: "U5: Story Time",
  topic: "5.5 Character Analysis",
  status: "Upcoming",
},
{
  date: "Nov 03",
  time: "12:00 PM",
  period: "3 - Period",
  chapter: "U5: Story Time",
  topic: "5.6 Theme Exploration",
  status: "Pending",
},
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredCards = cards.filter((card) =>
  card.topic.toLowerCase().includes(search.toLowerCase())
);

  const currentCards = filteredCards.slice(startIndex, endIndex);


  return (
    <div className="monthlyherald_main_content">
       <Row className="">
                <Col className="col-12 col-lg-8">
                  <div className="text-start">
                    <h3 className=" bold">Monthly Herald</h3>
                    <p className="text-muted" style={{ marginTop: "-4px" }}>
                      Plan and Organize Your Curriculum
                    </p>
                  </div>
                </Col>
                <Col className="col-12 col-lg-4 ">
                  <Row className="justify-content-lg-center justify-content-end ">
                    {/* <Col md={3}>
                      <Form.Select>
                        <option className="bold">Oct 2025</option>
                        <option className="bold">Sep 2025</option>
                        <option className="bold">Aug 2025</option>
                      </Form.Select>
                    </Col> */}
      
                    <Col className="col-lg-8">
  <Form.Select>
    <option>GRADE - 3A</option>
    <option>GRADE - 3B</option>
    <option>GRADE - 4A</option>
  </Form.Select>
</Col>

<Col className="text-end  mt-sm-2 mt-0">
  <Button className="radiantBlue">
    <FaBell />
  </Button>
</Col>
                  </Row>
                </Col>
              </Row>
      <hr />

      <Row className="mt-3 align-items-center">
        <Col md={3} className="text-start ps-2 text-primary">
          <h5>Monthly Plans</h5>
        </Col>

        <Col md={9}>
          <Row className="justify-content-end g-2">
            <Col md={4}>
  <Form.Select>
    <option>2024 - 2025</option>
    <option>2025 - 2026</option>
    <option>2026 - 2027</option>
  </Form.Select>
</Col>

            <Col md={3}>
              <Form.Select>
                <option>Complete</option>
              </Form.Select>
            </Col>


            <Col md={3} className="text-end">
              <Button className=" w-100 radiantBlue">+ Upload</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-4">
        {currentCards.map((card, index) => (
            <Col md={4} className="mb-4" key={index}>
              <div
                className="monthlyheraldbox p-3"
              >
                <Row>
                  <Col className="text-start">
                    <h6 style={{ fontWeight: "bold", color: "#1179f0ff" }}>
                      {card.date}
                    </h6>
                  </Col>
                  <Col className="text-end">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#d9e6f8ff",
                        color: "#1b76f5ff",
                        border: "none",
                      }}
                    >
                      <FaPencilAlt className="me-2" />
                      Edit
                    </Button>
                  </Col>
                </Row>
                <hr className="mt-2 mb-0"/>

                <div className="row mt-2">
                  <div className="col-4 text-start">
                    <div className="h6">Total Topics</div>
                    <p>0/32</p>
                  </div>
                  <div className="col-4 text-start">
                    <div className="h6">Total Periods</div>
                    <p>22</p>
                  </div>
                  <div className="col-4 text-start">
                    <div className="h6">Subjects</div>
                    <p>English</p>
                  </div>
                </div>

                <Row className="mt-3">
                 <div className="col-8 text-start gap-3 d-flex">
<div   className="rounded-4 d-flex align-items-center gap-2 py-2 px-1"
  style={{
    cursor: "pointer",
    fontWeight: 400,
    background:" #F3A250",
    transition: "all 0.3s ease",
  }}>
  Completed
</div>
<div
  className="rounded-4 border border-primary d-flex align-items-center gap-2 py-2 px-1"
  style={{
    cursor: "pointer",
    color: "#0d6efd", // Bootstrap primary
    fontWeight: 400,
    transition: "all 0.3s ease",
  }}
>
  <img
    src={ailogo}
    alt="AI"
    style={{ width: "20px", height: "20px", objectFit: "contain" }}
  />
  <span>AI Suggestions</span>
</div>

  
</div>
                  <Col className="text-end">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#d9e6f8ff",
                        color: "#1b76f5ff",
                        border: "none",
                      }}
                    >
                      View Details
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
      </Row>
      <div className="mt-auto">
        <div className="d-flex justify-content-between mt-3">
          <span className="text-muted">
  Page {currentPage} of {Math.ceil(filteredCards.length / itemsPerPage)} • 
  Showing {filteredCards.length === 0 ? 0 : startIndex + 1} -
  {Math.min(endIndex, filteredCards.length)} of {filteredCards.length} items
</span>



          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            />

            {[...Array(Math.ceil(filteredCards.length / itemsPerPage))]
.map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              disabled={currentPage === Math.ceil(filteredCards.length / itemsPerPage)}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};
export default MonthlyHerald;
