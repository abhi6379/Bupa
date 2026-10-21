const BASE_URL = process.env.REACT_APP_API_BASE_URL;

class ApiService {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`GET request failed with status: ${response.status}`);
    }
    return await response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST request failed with status: ${response.status}`);
    }
    return await response.json();
  }
}

const apiService = new ApiService();
export default apiService;