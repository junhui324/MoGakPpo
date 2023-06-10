import { useParams } from 'react-router-dom';
import PortfolioWritingForm from '../../components/PortfolioWritingForm/PortfolioWritingForm';
import * as Fetcher from '../../apis/Fetcher';
import { useEffect, useState } from 'react';
import * as Interface from '../../interfaces/Portfolio.interface';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';

function PortfolioWriting() {
  const navigate = useNavigate();
  const loginData = useRecoilValue(loginAtom);
  const params = useParams();
  const [portflioData, setPortfolioData] = useState<Interface.TypePortfolioDetail>();
  const getPortfolioData = async () => {
    console.log(loginData.user_id);
    try {
      const response = await Fetcher.getPortfolio(params.id!);
      const data = response.data;
      if (data.user_id === loginData.user_id) {
        setPortfolioData(data);
      } else {
        alert('접근 권한이 없습니다.');
        navigate(ROUTES.PORTFOLIO_LIST);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPortfolioData();
  }, []);

  useEffect(() => {
    console.log(portflioData);
  }, [portflioData]);

  return portflioData ? (
    <PortfolioWritingForm editMode={true} publishedPostData={portflioData} />
  ) : (
    <></>
  );
}

export default PortfolioWriting;
