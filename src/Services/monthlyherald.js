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

