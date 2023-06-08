import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getUserInfo from '../../utils/getUserInfo';
import Comment from '../../components/Comment';
import * as Token from '../../apis/Token';

// component
import ProjectTitle from '../../components/Project/ProjectTitle';
import ProjectBody from '../../components/Project/ProjectBody';
import ProjectAuthorProfile from '../../components/Project/ProjectAuthorProfile';
import ProjectBookmarkBlock from '../../components/Project/ProjectBookmarkBlock';
import ProjectModifyBlock from '../../components/Project/ProjectModifyBlock';

// data
import * as Fetcher from '../../apis/Fetcher';
// 타입
import * as ProjectType from '../../interfaces/Project.interface';
// 스타일
import styles from './Project.module.scss';
import { BiDotsVertical } from 'react-icons/bi';

//상수
import ROUTES from '../../constants/Routes';

//recoil
import { useRecoilState } from 'recoil';
import { projectIdState } from '../../recoil/projectState';

const LOADING_LOGO_SIZE: number = 32;
const LOADING_LOGO_COLOR: string = '#95a4b0';

// 로딩 중 로고
function Loading() {
  return (
    <>
      <BiDotsVertical
        size={LOADING_LOGO_SIZE}
        color={LOADING_LOGO_COLOR}
        className={styles.loadingLogo}
      />
    </>
  );
}

function Project() {
  // 라우터 관련
  const params: { [key: string]: string | undefined } = useParams();
  const navigate = useNavigate();

  // 게시글 데이터
  const projectId: number = params.id ? Number(params.id) : 0;
  const [projectData, setProjectData] = useState<ProjectType.TypeProject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 각 컴포넌트 데이터
  const [titleData, setTitleData] = useState<ProjectType.TypeProjectTitle | null>(null);
  const [bodyData, setBodyData] = useState<ProjectType.TypeProjectBody | null>(null);
  const [authorData, setAuthorData] = useState<ProjectType.TypeProjectAuthor | null>(null);
  const [bookmarksData, setBookmarksData] = useState<ProjectType.TypeProjectBookmarks | null>(null);
  const [modifyData, setModifyData] = useState<ProjectType.TypeProjectModify | null>(null);
  // 업데이트 필요 시에 변경되는 상태
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // Recoil State
  const [projectIdRecoil, setProjectIdRecoil] = useRecoilState(projectIdState);

  // 데이터 API 호출 함수
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await Fetcher.getProject(projectId);
      setProjectIdRecoil(projectId);
      setProjectData(data);
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '404':
            alert(`${loadingError}: 존재하지 않는 요청입니다.`);
            Token.removeToken();
            break;
          default:
            alert(`${loadingError}: 예기치 못한 서버 오류입니다.`);
        }
      }
      navigate(ROUTES.PROJECT_LIST);
    } finally {
      setIsLoading(false);
    }
  };

  // 글 작성자가 현재 작성자인지 확인하는 함수
  const isAuthor = (): boolean => {
    // 전역적인 userId와 user_id아이디가 같으면 true를 호출합니다.
    const userId = Number(getUserInfo()?.user_id);
    return userId === projectData?.user_id ? true : false;
  };

  // 게시글 아이디에 맞게 로딩할 것
  useEffect(() => {
    fetchData();

    // 클린업 코드를 통해 isUpdate 상태를 다시 false로 돌립니다.
    return () => {
      setIsUpdate(false);
    };
  }, [isUpdate]);

  // 데이터가 로딩되면 각 props데이터 할당함
  useEffect(() => {
    // 삭제된 게시글은 projectId가 null을 가짐
    if (projectData && !projectData.project_id) {
      alert('존재하지 않는 게시글입니다.');
      navigate(ROUTES.PROJECT_LIST);
    }

    setTitleData(() => {
      return projectData
        ? {
            project_type: projectData.project_type,
            project_recruitment_status: projectData.project_recruitment_status,
            project_title: projectData.project_title,
            project_created_at: projectData.project_created_at,
            project_comments_count: projectData.project_comments_count,
            project_views_count: projectData.project_views_count,
          }
        : null;
    });
    setBodyData(() => {
      return projectData
        ? {
            project_summary: projectData.project_summary,
            project_recruitment_roles: projectData.project_recruitment_roles,
            project_required_stacks: projectData.project_required_stacks,
            project_goal: projectData.project_goal,
            project_participation_time: projectData.project_participation_time,
            project_introduction: projectData.project_introduction,
          }
        : null;
    });
    setAuthorData(() => {
      return projectData
        ? {
            user_id: projectData.user_id,
            user_name: projectData.user_name,
            user_introduction: projectData.user_introduction,
            user_img: projectData.user_img,
          }
        : null;
    });
    setBookmarksData(() => {
      return projectData
        ? {
            project_id: projectData.project_id,
            is_bookmarked: projectData.is_bookmarked,
            project_bookmark_count: projectData.project_bookmark_count,
            project_type: projectData.project_type,
            project_bookmark_users: projectData.project_bookmark_users,
          }
        : null;
    });
    setModifyData(() => {
      return projectData
        ? {
            project_id: projectData.project_id,
            user_id: projectData.user_id,
            project_recruitment_status: projectData.project_recruitment_status,
          }
        : null;
    });
  }, [projectData]);

  return projectData ? (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <ProjectTitle titleData={titleData} />
          <ProjectBody bodyData={bodyData} />
        </div>
        <div className={styles.rightContainer}>
          <ProjectAuthorProfile authorData={authorData} />
          <ProjectBookmarkBlock bookmarksData={bookmarksData} fetchData={() => setIsUpdate(true)} />
          {/* ProjectModifyBlock은 현재 유저가 글 작성자일때만 활성화됨 */}
          {isAuthor() && (
            <ProjectModifyBlock modifyData={modifyData} fetchData={() => setIsUpdate(true)} />
          )}
        </div>
      </div>
      <Comment />
    </>
  ) : (
    <>
      <div>{isLoading && <Loading />}</div>
    </>
  );
}

export default Project;
