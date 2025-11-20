import axios from "axios";

const BaseUrl = process.env.REACT_APP_API_BASE_URL;


//get all weekly detail
export const getWeeklyDetail = async (teacherId, month, year) => {
 
  const token = localStorage.getItem("Teachertoken");

  try {
    const response = await axios.post(
      `${BaseUrl}/dailylogs/getWeeklyReports`,
      {
        teacherId,
        month,
        year,
      },
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