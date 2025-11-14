import { Row, Col, Card, Form, Button } from "react-bootstrap";
import HISKLogo from "../assets/HIS/images/HIS-logo.png";
import login from "../assets/HIS/icons/login.png";
import mobile from "../assets/HIS/icons/mobile.png";
import "../Styles/login.css";
import { Switch } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Input, Typography } from "antd";
import { GetProps } from "antd";

const { Title } = Typography;
type OTPProps = GetProps<typeof Input.OTP>;

const Login = () => {
  const [show, setShow] = useState("login");
  const [realOtp,setRealOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  const handleMobileSubmit = async () => {
    if (mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setError("");

    try {
      const res = await fetch(`${baseurl}/teacher/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobileNumber,
        }),
      });

      const data = await res.json();
      console.log("OTP:", data.sent?.otpNo);
      setRealOtp(data.sent?.otpNo);

      if (data.message === "OTP sent successfully") {
        setShow("otp");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to send OTP");
    }
  };

  const handleOtpVerify = async () => {
    try {
      const res = await fetch(`${baseurl}/teacher/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobileNumber,
          otp: otp,
        }),
      });

      const data = await res.json();
      console.log("Teacher Data:", data.data);

      if (data.message === "Login successful") {
          // Save token
        localStorage.setItem("Teachertoken", data.token);

          // Save teacher details
        localStorage.setItem("TeacherData", JSON.stringify(data.data));

        navigate("/analytics");
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  const onToggle = (checked) => {
    console.log(`switch to ${checked}`);
  };
  
  const maskMobile = (num) => {
    if (!num || num.length < 4) return num;
    const first = num.slice(0, 2);
    const last = num.slice(-2);
    return `${first}*****${last}`;
  };

  //antd input
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };
  
  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  return (
    <div style={{ 
      overflow: "hidden", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column" 
    }}>
      <Row className="m-0 p-0 flex-grow-1" style={{ overflow: "hidden" }}>
        <Col
          md={6}
          className="d-flex flex-column"
          style={{ 
            height: "100%", 
            padding: "20px",
            overflow: "hidden"
          }}
        >
          <div style={{ textAlign: "left", flexShrink: 0 }}>
            <img
              src={HISKLogo}
              style={{ width: "35%", marginBottom: "20px" }}
              alt="HISK Logo"
            />
          </div>

          <div className="d-flex flex-grow-1 justify-content-center align-items-center" style={{ overflow: "hidden" }}>
            <Card
              style={{
                padding: "30px",
                width: "100%",
                maxHeight: "90%",
                borderRadius: "15px",
                maxWidth: "400px",
                border: "1px solid #e7e0e0",
                overflow: "auto"
              }}
            >
              <div className="d-flex justify-content-center mb-3">
                <img src={login} style={{ width: "20%" }} alt="Login Icon" />
              </div>

              {show === "login" && (
                <Form className="text-center">
                  <h1 className="custom_bold">Welcome to HIS</h1>
                  <p className="custom_bold">
                    Enter Your Mobile Number to receive
                  </p>
                  <p className="custom_bold">One Time Passcode (OTP)</p>

                  <Form.Group className="my-3">
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        style={{ background: "white", borderRight: "none" }}
                      >
                        <img
                          src={mobile}
                          style={{ width: "20px" }}
                          alt="mobile-icon"
                        />
                      </span>

                      <Form.Control
                        type="tel"
                        inputMode="numeric"
                        placeholder="Enter Your Mobile Number"
                        style={{ borderLeft: "none" }}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                    {error && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "14px",
                          marginTop: "5px",
                        }}
                      >
                        {error}
                      </p>
                    )}
                  </Form.Group>

                  <div className="d-flex align-items-center gap-2">
                    {/* <Switch
                      defaultChecked
                      onChange={onToggle}
                      className="toggle"
                    /> */}
                    {/* <p className="m-0 classRemember">Remember me</p> */}
                  </div>

                  <Button
                    className="w-100 my-2 radiant-btn"
                    onClick={handleMobileSubmit}
                  >
                    Send OTP
                  </Button>

                  <p className="mt-2 custom_bold">
                    Already have an account?
                    <span
                      className="custom_bold"
                      style={{ color: "#88ce07ff", cursor: "pointer" }}
                    >
                      {" "}
                      Sign Up
                    </span>
                  </p>
                </Form>
              )}

              {show === "otp" && (
                <Form className="text-center">
                  <h1 className="custom_bold">Enter Code</h1>
                  <p className="custom_bold">{`We send a code to ${maskMobile(
                    mobileNumber
                  )}`}</p>

                  <Form.Group className="my-3">
                    <Input.OTP
                      length={6}
                      formatter={(str) => str.toUpperCase()}
                      {...sharedProps}
                      onChange={(value) => setOtp(value)}
                    />
                  </Form.Group>
                  <small>Your Login OTP: {realOtp}</small>
                  <Button className="w-100 my-3 radiant-btn" onClick={handleOtpVerify}>
                    Submit
                  </Button>
                </Form>
              )}
            </Card>
          </div>

          <div className="footer" style={{ flexShrink: 0 }}>
            <p className="custom_bold">Developed By:</p>
            <p>
              <a
                href="https://doubletapinnovations.ai/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                Double Tap Innovation Technologies Private Limited
              </a>
            </p>
          </div>
        </Col>

        <Col
          md={6}
          className="p-0 schoolImage"
          style={{ overflow: "hidden" }}
        ></Col>
      </Row>
    </div>
  );
};

export default Login;