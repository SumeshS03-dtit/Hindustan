import axios from "axios";

const BaseUrl = process.env.REACT_APP_API_BASE_URL;



//create monthly herald
export const createMonthlyHerald = async (formData) => {
  const token = localStorage.getItem("Teachertoken");

  try {
    const response = await axios.post(
      `${BaseUrl}/monthlyHerald/create`,
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
};


//get all monthlydetail
export const getMonthlyHerald = async () => {
  const teacher = JSON.parse(localStorage.getItem("TeacherData"));
  const teacherid = teacher?._id;
  const token = localStorage.getItem("Teachertoken"); 
  try {
    const response = await axios.get(`${BaseUrl}/monthlyHerald/teacher/${teacherid}`,
         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Monthly Herald:", error);
    throw error;
  }
};


//get full detail by id
export const getMonthlyById = async (id) =>{
    const token = localStorage.getItem("Teachertoken");
    try{
      const response = await axios.get(`${BaseUrl}/monthlyHerald/${id}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      return response.data;
    }catch(error){
     console.error("Error fetching Monthly Herald:", error);
     throw error;
    }
}


//get monthly ai report
export const getMonthlyAIReport = async (teacherId, month, year) =>{
  const token = localStorage.getItem("Teachertoken");
  try{
    const response = await axios.post(
      `${BaseUrl}/monthlyHerald/teacher/getMonthlyReport`,
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
  }catch(error){
   console.error("Error fetching Daily Logs:", error);
   throw error;
  }
}


//get report suggestion
export const getMonthlyReportSuggestion = async (teacherId,planned_topics,pending_topics,completed_topics) => {
  const token = localStorage.getItem("Teachertoken");
  try{
    const response = await axios.post(
      `${BaseUrl}/monthlyHerald/teacher/getMonthlyReportByAi`,
      {
        teacherId,
        planned_topics,
        pending_topics,
        completed_topics
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;

  }catch(error){
console.error("Error fetching Daily Logs:", error);
   throw error;
  }
}

