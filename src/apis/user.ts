import axios from 'axios';

export async function getUser() {
  const response = await axios.get('/mock/user.json');
  return response.data;
}