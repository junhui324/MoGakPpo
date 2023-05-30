import axios from 'axios';

export async function getProjectList() {
  const response = await axios.get('/mock/mock-project.json');
  return response;
}
