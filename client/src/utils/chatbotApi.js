import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/chat';

export const getChatResponse = async (message) => {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data.reply;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return 'Error fetching response.';
  }
};
