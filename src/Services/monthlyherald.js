import axios from "axios";

const BaseUrl = process.env.REACT_APP_API_BASE_URL;


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

