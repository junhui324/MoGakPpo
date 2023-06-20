import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TypeComment } from '../../interfaces/Comment.interface';
import { getComment, getProject, getPortfolio } from '../../apis/Fetcher';
import Pagination from '../../components/Pagination';
import styles from './Comment.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

export default function Comment() {
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isListUpdated, setIsListUpdated] = useState(false);
  const editTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [authorId, setAuthorId] = useState<number>(0);
  //라우팅관련
  const params = useParams();
  const location = useLocation();
  const postId = Number(params.id) || 0;
  const [postType, setPostType] = useState<'project' | 'portfolio'>('project');
  const [commentTotal, setCommentTotal] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  useEffect(() => {
    if (location.pathname.split('/')[1] === 'projects') {
      setPostType('project');
    }
    if (location.pathname.split('/')[1] === 'portfolios') {
      setPostType('portfolio');
    }
  }, [location.pathname]);

  //코멘트 api get요청
  const getCommentData = useCallback(async () => {
    try {
      const PostType = location.pathname.split('/')[1];
      const response = await getComment(PostType, postId, currPage + 1);
      setComments(response.data.pagenatedComments);
      setCommentTotal(response.data.listLength);
      setTotalPageCount(response.data.pageSize);
    } catch (error) {
      console.log(error);
    }
  }, [postId, currPage, location.pathname]);
  useEffect(() => {
    getCommentData();
  }, [getCommentData, isListUpdated]);

  //게시글 작성자 정보 받아오기
  const getAuthor = useCallback(async () => {
    try {
      const PostType = location.pathname.split('/')[1];
      if (PostType === 'projects') {
        const response = await getProject(postId);
        setAuthorId(response.user_id);
      }
      if (PostType === 'portfolios') {
        const response = await getPortfolio(String(postId));
        setAuthorId(response.data.user_id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [location.pathname, postId]);
  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  //댓글 수정 시 value의 초깃값을 기존 댓글 내용으로 설정함
  useEffect(() => {
    const comment = comments?.find((comment) => comment.comment_id === editingCommentId);
    if (editTextareaRef.current) {
      editTextareaRef.current.value = comment?.comment_content || '';
      editTextareaRef.current.focus();
    }
  }, [comments, editingCommentId]);

  return (
    <div className={styles.commentContainer}>
      <h3 className={styles.commentCount}>
        댓글 <strong>{commentTotal}</strong>
      </h3>

      {/* 댓글리스트 영역 */}
      {commentTotal === 0 ? (
        <div className={styles.noComment}>
          <img src={NoContentImage} alt="No Content" />
          <p>
            아직 댓글이 없어요.
            <br />첫 번째 댓글을 남겨보세요!
          </p>
        </div>
      ) : (
        <ul className={styles.commentList}>
          <CommentItem comments={comments} />
        </ul>
      )}
      {/* 댓글리스트 영역 끝 */}
      <Pagination
        currPage={currPage}
        onClickPage={setCurrPage}
        pageCount={Math.ceil(totalPageCount)}
      />
      <CommentInput />
    </div>
  );
}
