import axios from "axios";

const BaseUrl = process.env.REACT_APP_API_BASE_URL;


//create monthly logs
export const createDailyLogs = async (formData) => {
  const token = localStorage.getItem("Teachertoken");
    try {
    const response = await axios.post(
      `${BaseUrl}/dailyLogs/create`,
      formData,    // <-- Send FormData here
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating Monthly Herald:", error);
    throw error;
  }
}


//get all dailylogs
export const getDailyLogsdata = async () => {
  const teacher = JSON.parse(localStorage.getItem("TeacherData"));
  const teacherid = teacher?._id;
  const token = localStorage.getItem("Teachertoken");

  try {
    const response = await axios.post(
      `${BaseUrl}/dailylogs/getByTeacher`,
      { teacherId: teacherid },   // ⬅ body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Daily Logs:", error);
    throw error;
  }
};


//get detail by today date
export const getdetailbyDate = async (data) => {
  const token = localStorage.getItem("Teachertoken");

  try {
    const response = await axios.post(
      `${BaseUrl}/monthlyHerald/teacher/get-period-by-date`,
      data, // ⬅ body data goes here
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching details by date:", error);
    throw error;
  }
};
