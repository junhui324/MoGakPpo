import ProjectWritingForm from '../../components/ProjectWritingForm/ProjectWritingForm';
import { useSetRecoilState } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import { useEffect } from 'react';

function Modify() {
  const setClassification = useSetRecoilState(classificationState);
  useEffect(() => {
    setClassification('modify');
  }, [setClassification]);
  return <ProjectWritingForm />;
}
export default Modify;
