import ProjectWritingForm from '../../components/ProjectWritingForm/ProjectWritingForm';
import { useSetRecoilState } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import { useEffect } from 'react';

function ProjectWriting() {
  const setClassification = useSetRecoilState(classificationState);
  useEffect(() => {
    setClassification('create');
  }, [setClassification]);
  return <ProjectWritingForm />;
}
export default ProjectWriting;
