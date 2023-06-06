import ProjectWritingForm from '../../components/ProjectWritingForm/ProjectWritingForm';
import { useRecoilState } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import { useEffect } from 'react';

function ProjectWriting() {
  const [classification, setClassification] = useRecoilState(classificationState);
  useEffect(() => {
    console.log('create 저장');
    setClassification('create');
  }, [classification]);
  return <ProjectWritingForm />;
}
export default ProjectWriting;
