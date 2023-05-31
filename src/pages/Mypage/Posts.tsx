import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';

function Posts() {
  return (
    <div className={styles.container}>
      <div className={styles.contentConunt}>게시글 0개</div>
      <div className={styles.posts}>
        <img className={styles.image} src={NoContentImage} alt="No Content" />
        <div className={styles.noContent}>아직 작성한 게시글이 없어요.</div>
      </div>
    </div>
  )
}

export default Posts;