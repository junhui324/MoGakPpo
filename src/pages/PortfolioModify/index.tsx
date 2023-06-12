import { useParams } from 'react-router-dom';
import PortfolioWritingForm from '../../components/PortfolioWritingForm/PortfolioWritingForm';
import * as Fetcher from '../../apis/Fetcher';
import { loginAtom } from '../../recoil/loginState';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';
import { useQuery } from 'react-query';
//@ts-nocheck

function PortfolioWriting() {
  const navigate = useNavigate();
  const loginData = useRecoilValue(loginAtom);
  const params = useParams();

  const project = useQuery('portfolio', () => Fetcher.getPortfolio(params.id!), {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onError: (e: any) => {
      console.log(e.message);
    },
  });

  if (project.isLoading) {
    return <span>Loading...</span>;
  }

  if (project.isError) {
    return <span>Error: {project.error.message}</span>;
  }

  if (project.data.data.user_id === loginData.user_id) {
    return project.data ? (
      <PortfolioWritingForm editMode={true} publishedPostData={project.data.data} />
    ) : (
      <></>
    );
  } else {
    alert('접근 권한이 없습니다.');
    navigate(ROUTES.PORTFOLIO_LIST);
    return <></>;
  }
}

export default PortfolioWriting;
