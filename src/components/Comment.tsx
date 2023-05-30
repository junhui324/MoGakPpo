import styles from './Comment.module.scss';

export default function () {
  return (
    <div>
      <div className={styles.inputArea}>
        <h3>
          댓글 <strong>3</strong>
        </h3>
        <input type="text" placeholder="댓글을 작성해보세요." readOnly />
      </div>
      <div className={styles.commentArea}>
        <div className={styles.userInfo}>
          <img src="#" alt="profile" />
          <p>차차미</p>
          <p>2023.05.30 13:15</p>
        </div>
        <p className={styles.comment}>안녕하세요, 참여하고싶습니다😀</p>
      </div>
    </div>
  );
}
