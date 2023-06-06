import ProjectWritingForm from '../../components/ProjectWritingForm/ProjectWritingForm';
import { useRecoilState } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import { useEffect } from 'react';

function Modify() {
  const [classification, setClassification] = useRecoilState(classificationState);
  console.log('modify 저장');
  useEffect(() => {
    setClassification('modify');
  }, [classification]);
  return <ProjectWritingForm />;
}
export default Modify;
