import axios from 'axios';

export async function ApiService(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default ApiService;
