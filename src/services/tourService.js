import axios from "axios";

const API_URL = "https://api-ltdd-flutter-5wp1.onrender.com/v1/tour";

// Lấy danh sách tour
export const getAllTours = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tours");
  }
};

// Lấy thông tin một tour
export const getTourById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tour details");
  }
};

// Thêm tour mới
export const createTour = async (tourData) => {
  try {
    const response = await axios.post(API_URL, tourData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create tour");
  }
};

// Cập nhật tour
export const updateTour = async (id, tourData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, tourData);
    return response.data;
  } catch (error) {
    console.error("Update tour error:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to update tour");
  }
};

// Xóa tour
export const deleteTour = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete tour");
  }
};

// Upload ảnh
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.imageUrl;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};
