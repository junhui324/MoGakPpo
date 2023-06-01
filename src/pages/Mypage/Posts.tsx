import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { TypeUserPosts } from '../../interfaces/Project.interface';
import { getUserPosts } from '../../apis/Fetcher';
import ProjectList from '@/components/ProjectList/ProjectList';

function Posts() {
  const [posts, setPosts] = useState<TypeUserPosts | []>([]);
  const getUserData = async () => {
    try {
      const data = (await getUserPosts()) as unknown as TypeUserPosts;
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error('유저가 작성한 포스팅을 가져오지 못했어요');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentCount}>게시글 {posts.length}개</div>
      <div className={styles.posts}>
        <img className={styles.image} src={NoContentImage} alt="No Content" />
        <ul>
          {posts ? (
            posts.map((post, index) => {
              if ('project' in post) {
                return (
                  <li key={index}>
                    <span>프로젝트</span>
                  </li>
                );
              }
            })
          ) : (
            <div className={styles.noContent}>아직 작성한 게시글이 없어요.</div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Posts;
