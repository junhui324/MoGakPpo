import styles from './comments.module.scss';
import NoContentImage from '../../assets/NoContent.png';

function Comments() {
  return (
    <div className={styles.container}>
      <div className={styles.contentConunt}>댓글 0개</div>
      <div className={styles.comments}>
        <img className={styles.image} src={NoContentImage} alt="No Content" />
        <div className={styles.noContent}>아직 작성한 댓글이 없어요.</div>
      </div>
    </div>
  )
}

export default Comments;