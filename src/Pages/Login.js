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
  const [verifying, setVerifying] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);


  const navigate = useNavigate();
  const baseurl = process.env.REACT_APP_API_BASE_URL;

const handleMobileSubmit = async () => {
  if (mobileNumber.length !== 10) {
    setError("Please enter a valid 10-digit mobile number");
    return;
  }

  setError("");
  setSending(true); // 🔥 start loading

  try {
    const res = await fetch(`${baseurl}/teacher/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: mobileNumber }),
    });

    const data = await res.json();
    console.log("OTP:", data.sent?.otpNo);
    setRealOtp(data.sent?.otpNo);

    if (data.message === "OTP sent successfully") {
      setShow("otp");
    } else if (data.message === "Teacher not found") {
      alert(data.message);
      setShow("login");
      
    } else {
      setError("Something went wrong");
    }
  } catch (err) {
    console.log(err);
    setError("Failed to send OTP");
  } finally {
    setSending(false);  // ⬅ stop loading
  }
};



const handleOtpVerify = async () => {
  if (otp.length !== 6) return; // prevent request if OTP not full

  setVerifying(true); // 🔥 start loading

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
      localStorage.setItem("Teachertoken", data.token);
      localStorage.setItem("TeacherData", JSON.stringify(data.data));
      navigate("/analytics");
    } 
    else if (data.message === "Invalid OTP") {
      setShow("otp");
      alert("Invalid OTP");
    } 
    else if (data.message === "OTP expired"){
      alert("OTP expired");
      setShow("login");
      setOtp("")
    }
    else {
      alert("Invalid OTP");
    }
  } catch (err) {
    alert("Invalid OTP");
  } finally {
    setVerifying(false); // ⬅ Stop loader
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
                <Form className="text-center" onSubmit={(e) => { e.preventDefault(); handleMobileSubmit(); }}>
  <h1 className="custom_bold">Welcome to HIS</h1>
  <p className="custom_bold">Enter Your Mobile Number to receive</p>
  <p className="custom_bold">One Time Passcode (OTP)</p>

  <Form.Group className="my-3">
    <div className="input-group">
      <span className="input-group-text" style={{ background: "white", borderRight: "none" }}>
        <img src={mobile} style={{ width: "20px" }} alt="mobile-icon" />
      </span>

      <Form.Control
        type="tel"
        inputMode="numeric"
        placeholder="Enter Your Mobile Number"
        style={{ borderLeft: "none" }}
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        maxLength={10}    // ⬅ prevents entering more than 10 digits
      />
    </div>

    {error && (
      <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{error}</p>
    )}
  </Form.Group>

  {/* Send OTP button — disabled until 10 digits */}
  <Button
  className="w-100 my-2 radiant-btn"
  onClick={handleMobileSubmit}
  disabled={mobileNumber.length !== 10 || sending}  // prevent double click
>
  {sending ? "Sending..." : "Send OTP"}  {/* 🔥 change text */}
</Button>

  <p className="mt-2 custom_bold">
    Already have an account?
    <span className="custom_bold" style={{ color: "#88ce07ff", cursor: "pointer" }}>
      {" "}Sign Up
    </span>
  </p>
</Form>

              )}

              {show === "otp" && (
                <Form
  className="text-center"
  onSubmit={(e) => {
    e.preventDefault();
    handleOtpVerify();
  }}
>
  <h1 className="custom_bold">Enter Code</h1>
  <p className="custom_bold">{`We send a code to ${maskMobile(mobileNumber)}`}</p>

  <Form.Group className="my-3">
    <Input.OTP
      length={6}
      formatter={(str) => str.toUpperCase()}
      {...sharedProps}
      value={otp}
      onChange={(value) => setOtp(value)}
    />
  </Form.Group>

  <small>Your Login OTP: <span className="text-danger">{realOtp}</span></small>

 <Button
  className="w-100 my-3 radiant-btn"
  onClick={handleOtpVerify}
  disabled={otp.length !== 6 || verifying}  // disable until OTP typed & not verifying
>
  {verifying ? "Verifying..." : "Submit"}  {/* 🔥 change text */}
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