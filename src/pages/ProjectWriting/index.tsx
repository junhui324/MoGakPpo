import ProjectWritingForm from '../../components/ProjectWritingForm/ProjectWritingForm';
import { useRecoilState } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import { useEffect } from 'react';

function ProjectWriting() {
  const [classification, setClassification] = useRecoilState(classificationState);
  useEffect(() => {
    setClassification('create');
  }, [classification]);
  return <ProjectWritingForm />;
}
export default ProjectWriting;
