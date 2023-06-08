import { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './comments.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { TypeMypageComments } from '../../interfaces/Comment.interface';
import { getUserComments } from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';
import getDateFormat from '../../utils/getDateFormat';
import Pagination from '../../components/Pagination';

interface CommentsProps {
  onError: (errorMessage: string) => void;
}

function Comments({ onError }: CommentsProps) {
  const [comments, setComments] = useState<TypeMypageComments>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const navigate = useNavigate();

  const offset = currPage + 1;
  const getUserCommentData = async () => {
    try {
      const { data } = await getUserComments(offset);
      setTotalComments(data.listLength);
      setComments(data.pagenatedComments);
      setTotalPageCount(data.pageSize);
    } catch (loadingError) {
      if (loadingError instanceof Error && typeof loadingError.message === 'string') {
        switch (loadingError.message) {
          case '403':
            onError('잘못된 접근입니다. 회원가입 및 로그인 후 이용해 주세요.');
            break;
          default:
            onError('알 수 없는 오류가 발생했습니다.');
            break;
        }
      }
    }
  };

  const handleClickComment = (event: MouseEvent<HTMLDivElement>, project_id: number) => {
    event.preventDefault();

    navigate(`${ROUTES.PROJECT}${project_id}`);
  };

  useEffect(() => {
    getUserCommentData();
  }, [currPage]);

  return (
    <div className={styles.container}>
      <div className={styles.contentCount}>댓글 {totalComments}개</div>
      {totalComments === 0 ? (
        <div className={styles.noComment}>
          <img className={styles.image} src={NoContentImage} alt="No Content" />
          <div className={styles.noContent}>아직 작성한 댓글이 없어요.</div>
        </div>
      ) : (
        <div className={styles.comments}>
          {comments.map((data, index) => {
            const { comment_content, comment_created_at, project_id, project_title } = data;
            return (
              <div
                className={styles.commentWrapper}
                key={`${comment_created_at}-${index}`}
                onClick={(e) => handleClickComment(e, project_id)}
              >
                <div className={styles.title}>{project_title}</div>
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
