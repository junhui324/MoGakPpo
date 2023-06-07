import ProjectWritingForm from '../../components/ProjectWritingForm/ProjectWritingForm';
import { useRecoilState } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import { useEffect } from 'react';

function Modify() {
  const [classification, setClassification] = useRecoilState(classificationState);
  useEffect(() => {
    setClassification('modify');
  }, [classification]);
  return <ProjectWritingForm />;
}
export default Modify;
