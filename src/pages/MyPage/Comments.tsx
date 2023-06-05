import { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './comments.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { TypeMypageComments } from '../../interfaces/Comment.interface';
import { getUserComments } from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';
import getDateFormat from '../../utils/getDateFormat';
import Pagination from '../../components/Pagination';

function Comments() {
  const [comments, setComments] = useState<TypeMypageComments>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const navigate = useNavigate();

  const getUserCommentData = async () => {
    try {
      const { data } = await getUserComments();

      setComments(data.project_comments);
      setTotalPageCount(data.project_comments.length);
    } catch (error) {
      console.error('유저가 작성한 댓글을 가져오지 못했어요');
    }
  };

  const handleClickComment = (event: MouseEvent<HTMLDivElement>, project_id: number) => {
    event.preventDefault();

    navigate(`${ROUTES.PROJECT}${project_id}`);
  };

  const PER_PAGE = 5; // 한 페이지당 표시할 댓글 개수

  // 현재 페이지에 해당하는 댓글들을 자르기
  const getCurrentPageComments = () => {
    const startIndex = currPage * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return comments.slice(startIndex, endIndex);
  };

  useEffect(() => {
    getUserCommentData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentConunt}>댓글 {comments.length}개</div>
      {comments.length === 0 ? (
        <div className={styles.noComment}>
          <img className={styles.image} src={NoContentImage} alt="No Content" />
          <div className={styles.noContent}>아직 작성한 댓글이 없어요.</div>
        </div>
      ) : (
        <div className={styles.comments}>
          {getCurrentPageComments().map((data, index) => {
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
        </div>
      )}
      <Pagination 
        currPage={currPage}
        onClickPage={setCurrPage}
        pageCount={Math.ceil(totalPageCount / PER_PAGE)}
      />
    </div>
  );
}

export default Comments;
