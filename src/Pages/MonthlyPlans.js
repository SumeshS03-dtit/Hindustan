import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMonthlyById } from "../Services/monthlyherald";
import { Card } from "react-bootstrap";
import { Button, Form} from "react-bootstrap";
import ailogo from "../assets/HIS/images/AI LOGO 3.png"
import { FaBell } from "react-icons/fa6";

const MonthlyPlans = () => {
  const [monthlyDetail, setMonthlyDetail] = useState("");
  const { id } = useParams();
  console.log("Received ID:", id);

  // Fetch data on page load
  useEffect(() => {
    fetchSinglePlan();
  }, [id]);

  //fetch single data by params id
  const fetchSinglePlan = async () => {
    try {
      const res = await getMonthlyById(id); // FIXED: add await + pass id
      setMonthlyDetail(res);
      console.log("Monthly Plan Detail:", res);
    } catch (error) {
      console.log("Error loading Single Plan", error);
    }
  };

  return (
    <div className="monthlyherald_main_content">
      <div className="row">
        <div className="col-lg-8 col-12">
          <div className="text-start">
            <h3 className=" bold">Monthly Herald</h3>
            <p className="text-muted" style={{ marginTop: "-4px" }}>
             
              {monthlyDetail?.teacher_suggestion?.month} Lesson Plans
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-12">
         <div className="row align-items-center gp-3 justify-content-end">
          <div className="col-lg-8">
              <Form.Select>
                <option>GRADE - 3A</option>
                <option>GRADE - 3B</option>
                <option>GRADE - 4A</option>
              </Form.Select>
           </div> 
           <div className="col-lg-4 text-end mt-0">
            <Button className="radiantBlue">
                              <FaBell />
                            </Button>
            </div> 
         </div>   
        </div>
      </div>
      <hr></hr>
      <div className="row mt-4">
  {Object.entries(monthlyDetail?.period_plan || {}).map(([key, value], index) => (
    <div className="col-md-4 mb-4" key={index}>
      <div className="monthlyheraldbox p-3">

        <div className="row">
            <div className="col-6 text-start">
                <h6 className="fw-bold">
            {`Period ${key.split("_")[1]}`}
          </h6>
            </div>
            <div className="col-6 text-end">
                <p className="text-muted mb-0">
            {value.length} Topics
          </p>
            </div>
          

          
        </div>
        <hr></hr>
        <p className="text-start">Lesson/Chapter</p>
        <h6 className="text-start">U6:Let's Perform</h6>
        <p className="text-start">Topics to Cover:</p>
         <ul
  className="text-start p-0"
  style={{ listStyle: "none" }}
>
  {value.map((item, i) => (
    <li key={i}>{item.topic}</li>
  ))}
</ul>
        <div className="row mt-3">
                 <div className="col-lg-8 text-start gap-3 d-flex flex-column flex-lg-row">
<div className="row g-2">

  <div className="col-lg-6 col-12">
    <div
      className="rounded-4 d-flex align-items-center py-1 px-3"
      style={{
        cursor: "pointer",
        
        background: "#F3A250",
        transition: "all 0.3s ease",
      }}
    >
      
      <span className="ai-text">Completed</span>
    </div>
  </div>

  <div className="col-lg-6 col-12">
  <div
    className="rounded-4 ai-btn border align-items-center border-primary d-flex gap-2 py-1 px-3"
    
  >
    <img
      src={ailogo}
      alt="AI"
      style={{ width: "20px", height: "20px", objectFit: "contain" }}
    />
    <span className="ai-text">AI Suggestions</span>
  </div>
</div>

</div>

 

  

</div>

                  <div className="col-lg-4 col-12 text-end mt-lg-0 mt-2 ">
                    <Button
                      size="sm"
                      className="radiantBlue ai-text"
                      
                    >
                      View Details
                    </Button>
                  </div>
                </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};
export default MonthlyPlans;
