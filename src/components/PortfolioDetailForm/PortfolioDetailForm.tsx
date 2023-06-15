import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './PortfolioDetailForm.module.scss';
import DOMPurify from 'dompurify';
import { BsGithub } from 'react-icons/bs';

// api
import * as Fetcher from '../../apis/Fetcher';
import * as Token from '../../apis/Token';

//recoil
import { useRecoilState } from 'recoil';
import { portfolioState } from '../../recoil/portfolioState';
import { loginAtom } from '../../recoil/loginState';

import DetailShareButton from './DetailShareButton';
import ProjectAuthorProfile from '../Project/ProjectAuthorProfile';
import ProjectBookmarkBlock from '../Project/ProjectBookmarkBlock';
import PortfolioModifyBlock from './PortfolioModifyBlock';
import { StackIcon } from '../Project/ProjectBodyLogo';

import ROUTES from '../../constants/Routes';

import DefaultUserImage from '../../assets/DefaultUser.png';

const DEFAULT_STACK = '미정';
const ONE_DAY = 1;
const WEEK_DAY = 7;
const MONTH_ADJUSTMENT = 1;

function PortfolioDetailForm() {
  const [portfolio, setPortfolio] = useRecoilState(portfolioState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // 로컬 스토리지에 있는 user 정보 가져오기
  const LoginData = useRecoilState(loginAtom);
  const userId = LoginData[0];

  // 업데이트 필요 시에 변경되는 상태
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // timestamp를 받아온 후, 현재 Time Zone에 맞게 계산합니다. getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환한다.
  const timestamp = new Date(portfolio.portfolio_created_at);
  const localDate = new Date(timestamp.getTime());
  const now: Date = new Date();

  const getPortfolio = useCallback(async () => {
    setIsLoading(true);
    try {
      if (id) {
        const data = await Fetcher.getPortfolio(id);
        setPortfolio(data.data);
      }
    } catch (error) {
      if (error instanceof Error && typeof error.message === 'string') {
        switch (error.message) {
          case '401':
            alert(`${error}: 토큰이 만료되었습니다.`);
            Token.removeToken();
            break;
          default:
            alert(`${error}: 예기치 못한 서버 오류입니다.`);
        }
      }
      navigate(ROUTES.MAIN);
    } finally {
      setIsLoading(false);
    }
  }, [setPortfolio, id]);

  useEffect(() => {
    getPortfolio();
    window.scrollTo(0, 0);
  }, []);

  // 게시글 아이디에 맞게 로딩할 것
  useEffect(() => {
    isUpdate && getPortfolio();

    // 클린업 코드를 통해 isUpdate 상태를 다시 false로 돌립니다.
    return () => {
      setIsUpdate(false);
    };
  }, [isUpdate, getPortfolio]);

  // 글 작성자가 현재 작성자인지 확인하는 함수
  const isAuthor = (): boolean => {
    // 전역적인 userId와 user_id아이디가 같으면 true를 호출합니다.
    return Number(userId.user_id) === portfolio?.user_id ? true : false;
  };

  // 7일전까지는 글로 나타내고, 그 이후엔 날짜를 반환합니다.
  const projectDate = () => {
    if (now.getDate() === localDate.getDate()) {
      if (now.getHours() === localDate.getHours()) {
        if (now.getMinutes() === localDate.getMinutes()) {
          return '방금 전';
        } else {
          return `${now.getMinutes() - localDate.getMinutes()}분 전`;
        }
      } else {
        return `${now.getHours() - localDate.getHours()}시간 전`;
      }
    } else if (now.getDate() - localDate.getDate() === ONE_DAY) return '하루 전';
    else if (now.getDate() - localDate.getDate() <= WEEK_DAY)
      return `${now.getDate() - localDate.getDate()}일 전`;
    else
      return `${localDate.getFullYear()}년 ${
        localDate.getMonth() + MONTH_ADJUSTMENT
      }월 ${localDate.getDate()}일`;
  };

  return isLoading ? (
    <div className={styles.loadingContainer}>
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.title}>
          <h2>💜 {portfolio.portfolio_title}</h2>
          <span>{projectDate()}</span>
          <span> · </span>
          <span>조회수 {portfolio.portfolio_views_count}</span>
          <span> · </span>
          <span>댓글 {portfolio.portfolio_comments_count}</span>
          <span> · </span>
          <span>북마크 {portfolio.portfolio_bookmark_count}</span>
        </div>

        <div className={styles.summary}>
          <h2>🔍 프로젝트 요약</h2>
          <div className={styles.paragraph}>{portfolio.portfolio_summary}</div>
        </div>
        
        <div className={styles.stack}>
          <h2>🔨 프로젝트에 사용된 기술 스택</h2>
          <div className={styles.logoLine}>
            {portfolio.portfolio_stacks?.stackList ? (
              portfolio.portfolio_stacks.stackList.map((stack) => {
                return (
                  <div className={styles.logoBlock} key={stack}>
                    <div className={styles.logoCircle}>
                      <StackIcon stack={stack} />
                    </div>
                    <p className={styles.logoText}>{stack}</p>
                  </div>
                );
              })
            ) : (
              <div className={styles.logoBlock}>
                <div className={styles.logoCircle}>
                  <StackIcon stack={DEFAULT_STACK} />
                </div>
                <p className={styles.logoText}>{DEFAULT_STACK}</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.mainText}>
          <h2>📝 프로젝트 상세 설명</h2>
          <div
            className={styles.paragraph}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(portfolio.portfolio_description),
            }}
          ></div>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.profile}>
          <ProjectAuthorProfile
            authorData={{
              user_id: portfolio.user_id,
              user_name: portfolio.user_name,
              user_introduction: portfolio.user_introduction,
              user_img: portfolio.user_img,
            }}
          />
        </div>

        <div className={styles.bookmark}>
          <ProjectBookmarkBlock
            bookmarksData={{
              project_id: portfolio.portfolio_id,
              is_bookmarked: portfolio.is_bookmarked,
              project_bookmark_count: portfolio.portfolio_bookmark_count,
              project_type: 'portfolio',
              project_bookmark_users: portfolio.portfolio_bookmark_users,
            }}
            fetchData={() => setIsUpdate(true)}
          />
          {isAuthor() && (
            <PortfolioModifyBlock
              modifyData={{
                portfolio_id: portfolio.portfolio_id,
                user_id: portfolio.user_id,
              }}
            />
          )}
        </div>

        <div className={styles.link}>
          <button
            className={styles.linkButton}
            onClick={() => window.open(`${portfolio.portfolio_github}`, '_blank')}
          >
            <BsGithub className={styles.logo} />
            <span>깃허브 링크</span>
          </button>
        </div>

        <div className={styles.share}>
          <DetailShareButton title="temp"></DetailShareButton>
        </div>

        {portfolio.participated_members.length === 0 ? (
          <div></div>
        ) : (
          <div className={styles.participate}>
            <div className={styles.participateBox}>
              <h2 onClick={() => setIsOpen(!isOpen)}>😎 프로젝트에 참여한 유저</h2>
            </div>
            {isOpen && (
              <div className={styles.userBox}>
                {portfolio.participated_members.map((user, index) => (
                  <div className={styles.userInfoBox} key={index}>
                    <Link
                      className={styles.imgLink}
                      to={
                        user.user_id === Number(userId?.user_id)
                          ? '/user/mypage'
                          : `/user/${user.user_id}`
                      }
                    >
                      <img
                        src={user.user_img === null ? DefaultUserImage : user.user_img}
                        alt={`${user.user_name} 프로필`}
                      />
                      <div className={styles.userInfo}>
                        <p>{user.user_name}</p>
                        <p>{user.user_email}</p>
                        <p>{user.user_career_goal}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PortfolioDetailForm;
