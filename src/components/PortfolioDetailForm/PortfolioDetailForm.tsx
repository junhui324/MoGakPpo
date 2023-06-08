import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PortfolioDetailForm.module.scss';
import DOMPurify from 'dompurify';
import { BsGithub } from 'react-icons/bs';

// api
import * as Fetcher from '../../apis/Fetcher';

//recoil
import { useRecoilState } from 'recoil';
import { portfolioState } from '../../recoil/portfolioState';

import DetailShareButton from './DetailShareButton';
import { StackIcon } from '../Project/ProjectBodyLogo';
import ProjectAuthorProfile from '../Project/ProjectAuthorProfile';
import ProjectBookmarkBlock from '../Project/ProjectBookmarkBlock';

const DEFAULT_STACK = '미정';

function PortfolioDetailForm() {
  const [portfolio, setPortfolio] = useRecoilState(portfolioState);
  const { id } = useParams();
  // 업데이트 필요 시에 변경되는 상태
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = async () => {
    try {
      const data = await Fetcher.getProject(Number(id));
      setPortfolio(data);
      console.log('project 87번 데이터 가져오기: ', portfolio);
    } catch (error) {
      console.log(error);
    }
  };

  // 게시글 아이디에 맞게 로딩할 것
  useEffect(() => {
    getPortfolio();

    // 클린업 코드를 통해 isUpdate 상태를 다시 false로 돌립니다.
    return () => {
      setIsUpdate(false);
    };
  }, [isUpdate]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.title}>
          <h2>{portfolio.project_title}</h2>
        </div>

        <div className={styles.summary}>
          <h2>프로젝트 요약</h2>
          <div className={styles.paragraph}>{portfolio.project_summary}</div>
        </div>

        <div className={styles.etc}>
          <h2>이 프로젝트의 인기는?</h2>
          <span>👀</span>
          <span className={styles.count}>{portfolio.project_views_count}</span>
          <span>💬</span>
          <span className={styles.count}>{portfolio.project_comments_count}</span>
          <span>📌</span>
          <span className={styles.count}>{portfolio.project_bookmark_count}</span>
        </div>

        <div className={styles.stack}>
          <h2>프로젝트에 사용된 기술 스택</h2>
          <div className={styles.logoLine}>
            {portfolio.project_required_stacks.stackList ? (
              portfolio.project_required_stacks.stackList.map((stack) => {
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
          <h2>프로젝트 상세 설명</h2>
          <div
            className={styles.paragraph}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(portfolio.project_introduction) }}
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
              project_id: portfolio.project_id,
              is_bookmarked: portfolio.is_bookmarked,
              project_bookmark_count: portfolio.project_bookmark_count,
              project_type: portfolio.project_type,
              project_bookmark_users: portfolio.project_bookmark_users,
            }}
            fetchData={() => setIsUpdate(true)}
          />
        </div>

        <div className={styles.link}>
          <button className={styles.linkButton}>
            <BsGithub className={styles.logo} />
            <span>깃허브 링크</span>
          </button>
        </div>

        <div className={styles.share}>
          <DetailShareButton title="temp"></DetailShareButton>
        </div>

        <div className={styles.participate}>
          <h2>프로젝트에 참여한 유저</h2>
          <div className={styles.userBox}>
            <p>이새미</p>
            <p>김차미</p>
            <p>박지원</p>
            <p>송현수</p>
            <p>신혜지</p>
            <p>이주영</p>
            <p>장준희</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioDetailForm;
