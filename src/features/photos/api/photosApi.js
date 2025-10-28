import axios from "axios";

const BASE_URL = "https://picsum.photos/v2";

export async function fetchPhotos(page = 1, limit = 30) {
  try {
    const response = await axios.get(`${BASE_URL}/list?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
}

export async function fetchPhotoById(photoId) {
  try {
    const response = await axios.get(`${BASE_URL}/list?page=1&limit=100`);
    return response.data.find(photo => photo.id === photoId);
  } catch (error) {
    console.error(`Error fetching photo with ID ${photoId}:`, error);
    throw error;
  }
}