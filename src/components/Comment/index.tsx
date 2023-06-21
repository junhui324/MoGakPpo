import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TypeComment } from '../../interfaces/Comment.interface';
import { getComment } from '../../apis/Fetcher';
import Pagination from '../../components/Pagination';
import styles from './Comment.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

type TypeCommentProps = {
  authorData: { user_id: number } | null;
};

export default function Comment({ authorData }: TypeCommentProps) {
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [isListUpdated, setIsListUpdated] = useState(false);
  const checkUpdate = () => {
    setIsListUpdated(!isListUpdated);
  };

  //라우팅관련
  const params = useParams();
  const location = useLocation();
  const postId = Number(params.id) || 0;
  const [commentTotal, setCommentTotal] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(0);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  const [postType, setPostType] = useState<'project' | 'portfolio'>('project');
  useEffect(() => {
    if (location.pathname.split('/')[1] === 'projects') {
      setPostType('project');
    }
    if (location.pathname.split('/')[1] === 'portfolios') {
      setPostType('portfolio');
    }
  }, [location.pathname]);
  //코멘트 data get요청
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

  return (
    <div className={styles.commentContainer}>
      <h3 className={styles.commentCount}>
        댓글 <strong>{commentTotal}</strong>
      </h3>

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
          <CommentItem
            initComments={comments}
            comments={comments}
            authorData={authorData}
            postType={postType}
            checkUpdate={checkUpdate}
          />
        </ul>
      )}
      <Pagination
        currPage={currPage}
        onClickPage={setCurrPage}
        pageCount={Math.ceil(totalPageCount)}
      />
      <CommentInput
        postType={postType}
        checkUpdate={checkUpdate}
        setCurrPage={setCurrPage}
        commentTotal={commentTotal}
      />
    </div>
  );
}
