import axios from 'axios';

export async function getProjectList() {
  const response = await axios.get('/mock/project-list.json');
  return response.data;
}
