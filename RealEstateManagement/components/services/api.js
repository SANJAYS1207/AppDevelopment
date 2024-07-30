import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Function to get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to validate login credentials
export const validateLogin = async (email, password) => {
  try {
    const users = await getUsers();
    const user = users.find(user => user.email === email);
    if (user) {
      if (user.password === password) {
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Invalid password' };
      }
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    console.error('Error validating login:', error);
    throw error;
  }
};
