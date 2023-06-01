import { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './comments.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { TypeUserComments } from '../../interfaces/Comment.interface';
import { getUserComments } from '../../apis/Fetcher';
import ROUTES from '../../constants/Routes';

function Comments() {
  const [comments, setComments] = useState<TypeUserComments | []>([]);
  const navigate = useNavigate();

  const getUserCommentData = async () => {
    try {
      const data = (await getUserComments()) as unknown as TypeUserComments;
      setComments(data);
    } catch (error) {
      console.error('유저가 작성한 댓글을 가져오지 못했어요');
    }
  };

  const handleClickComment = (event: MouseEvent<HTMLDivElement>, project_id: number) => {
    event.preventDefault();

    navigate(`${ROUTES.PROJECT}${project_id}`);
  }

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
          {comments.map((data, index) => {
            const { comment_content, comment_created_at, project_id } = data.comment;
            return (
              <div 
                className={styles.commentWrapper} 
                key={`${comment_created_at}-${index}`}
                onClick={(e) => handleClickComment(e, project_id)}
              >
                <div className={styles.comment}>{comment_content}</div>
                <div className={styles.createdAt}>작성시간: {comment_created_at}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Comments;