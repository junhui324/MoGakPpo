import axios from 'axios';

export async function getProjectList() {
  const response = await axios.get('/mock/projects.json');
  return response.data;
}
