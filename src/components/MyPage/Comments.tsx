import { useState, useEffect, useMemo, useCallback, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './comments.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { TypeMypageProjectComments, TypeMypagePortfolioComments } from '../../interfaces/Comment.interface';
import { getUserProjectComments, getUserPortfolioComments } from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';
import getDateFormat from '../../utils/getDateFormat';
import Pagination from '../../components/Pagination';
import ContentsFilter from './ContentsFilter';

interface CommentsProps {
  onError: (errorMessage: string) => void;
}

function Comments({ onError }: CommentsProps) {
  const [projectComments, setProjectComments] = useState<TypeMypageProjectComments>([]);
  const [portfolioComments, setPortfolioComments] = useState<TypeMypagePortfolioComments>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState('project');
  const navigate = useNavigate();

  const offset = useMemo(() => {
    return currPage + 1;
  }, [currPage]);

  const getUserCommentData = useCallback(async () => {
    try {
      switch (selectedOption) {
        case 'project': {
          const { data } = await getUserProjectComments(offset);
          
          setTotalComments(data.listLength);
          setProjectComments(data.pagenatedComments);
          setTotalPageCount(data.pageSize);
          break;
        }
        case 'portfolio': {
          const { data } = await getUserPortfolioComments(offset);
          
          setTotalComments(data.listLength);
          setPortfolioComments(data.pagenatedComments);
          setTotalPageCount(data.pageSize);
          break;
        }
      }
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            onError('잘못된 접근입니다. 회원가입 및 로그인 후 이용해 주세요.');
            break;
        }
      }
    }
  }, [offset, selectedOption, onError]);

  const handleClickComment = (event: MouseEvent<HTMLDivElement>, id: number) => {
    event.preventDefault();

    switch (selectedOption) {
      case 'project': {
        navigate(`${ROUTES.PROJECT}${id}`);
        break;
      }
      case 'portfolio': {
        navigate(`${ROUTES.PORTFOLIO_DETAIL}${id}`);
        break;
      }
    }
  };

  const handleSelectFilter = (value: string) => {
    setSelectedOption(value);
    setCurrPage(0);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getUserCommentData();
  }, [selectedOption, offset]);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.contentCount}>댓글 {totalComments}개</div>
        <ContentsFilter onChange={handleSelectFilter}/>
      </div>
      {totalComments === 0 ? (
        <div className={styles.noComment}>
          <img className={styles.image} src={NoContentImage} alt="No Content" />
          <div className={styles.noContent}>아직 작성한 댓글이 없어요.</div>
        </div>
      ) : (
        <div className={styles.comments}>
          {selectedOption === 'project' && projectComments.map((data, index) => {
            return (
              <div
                className={styles.commentWrapper}
                key={`${data.comment_created_at}-${index}`}
                onClick={(e) => handleClickComment(e, data.project_id)}
              >
                <div className={styles.title}>{data.project_title}</div>
                <div className={styles.comment}>{data.comment_content}</div>
                <div className={styles.createdAt}>{getDateFormat(data.comment_created_at)}</div>
              </div>
            );
          })}
          {selectedOption === 'portfolio' && portfolioComments.map((data, index) => {
            return (
              <div
                className={styles.commentWrapper}
                key={`${data.comment_created_at}-${index}`}
                onClick={(e) => handleClickComment(e, data.portfolio_id)}
              >
                <div className={styles.title}>{data.portfolio_title}</div>
                <div className={styles.comment}>{data.comment_content}</div>
                <div className={styles.createdAt}>{getDateFormat(data.comment_created_at)}</div>
              </div>
            );
          })}
          <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={totalPageCount} />
        </div>
      )}
    </div>
  );
}

export default Comments;
