import ROUTES from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';

function PortfolioSearch() {
  const navigate = useNavigate();

  return (
    <div>
      포트폴리오 서치
      <button
        onClick={() => {
          navigate(ROUTES.PORTFOLIO_CREATE);
        }}
      >
        글 작성
      </button>
    </div>
  );
}

export default PortfolioSearch;
