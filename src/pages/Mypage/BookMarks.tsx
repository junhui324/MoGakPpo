import styles from './bookMarks.module.scss';
import NoContentImage from '../../assets/NoContent.png';


function BookMarks() {
  return (
    <div className={styles.container}>
      <div className={styles.contentConunt}>북마크 0개</div>
      <div className={styles.bookMarks}>
        <img className={styles.image} src={NoContentImage} alt="No Content" />
        <div className={styles.noContent}>아직 북마크한 게시글이 없어요.</div>
      </div>
    </div>
  )
}

export default BookMarks;