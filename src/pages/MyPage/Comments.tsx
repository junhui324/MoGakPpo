import { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './comments.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { TypeMypageProjectComments, TypeMypagePortfolioComments } from '../../interfaces/Comment.interface';
import { getUserComments } from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';
import getDateFormat from '../../utils/getDateFormat';
import Pagination from '../../components/Pagination';
import ContentsFilter from './ContentsFilter';

interface CommentsProps {
  onError: (errorMessage: string) => void;
}

function Comments({ onError }: CommentsProps) {
  const [comments, setComments] = useState<(TypeMypageProjectComments | TypeMypagePortfolioComments)>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState('all');
  const navigate = useNavigate();

  const offset = currPage + 1;

  const getUserCommentData = async () => {
    try {
      const { data } = await getUserComments(selectedOption, offset);
      
      setTotalComments(data.listLength);
      setComments(data.pagenatedComments);
      setTotalPageCount(data.pageSize);
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            onError('잘못된 접근입니다. 회원가입 및 로그인 후 이용해 주세요.');
            break;
        }
      }
    }
  };

  const handleClickComment = (event: MouseEvent<HTMLDivElement>, project_id: number) => {
    event.preventDefault();

    navigate(`${ROUTES.PROJECT}${project_id}`);
  };

  const handleRecruitingSelect = (value: string) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    getUserCommentData();
  }, [selectedOption, currPage]);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.contentCount}>댓글 {totalComments}개</div>
        <ContentsFilter onChange={handleRecruitingSelect}/>
      </div>
      {totalComments === 0 ? (
        <div className={styles.noComment}>
          <img className={styles.image} src={NoContentImage} alt="No Content" />
          <div className={styles.noContent}>아직 작성한 댓글이 없어요.</div>
        </div>
      ) : (
        <div className={styles.comments}>
          {comments.map((data, index) => {
            let comment_content = '';
            let comment_created_at = '';
            let id = 0;
            let title = '';

            switch (selectedOption) {
              case 'project': {
                if ('project_id' in data) {
                  ({ comment_content, comment_created_at, project_id: id, project_title: title } = data);
                }
                break;
              }
              case 'portfolio': {
                if ('portfolio_id' in data) {
                  ({ comment_content, comment_created_at, portfolio_id: id, portfolio_title: title } = data);
                }
                break;
              }
              default:
                break;
            }

            return (
              <div
                className={styles.commentWrapper}
                key={`${comment_created_at}-${index}`}
                onClick={(e) => handleClickComment(e, id)}
              >
                <div className={styles.title}>{title}</div>
                <div className={styles.comment}>{comment_content}</div>
                <div className={styles.createdAt}>{getDateFormat(comment_created_at)}</div>
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
