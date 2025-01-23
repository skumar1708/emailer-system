import axios from 'axios';

export const sendEmails = async (emailData) => {
  const response = await axios.post('http://localhost:5000/api/emails/send', emailData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};