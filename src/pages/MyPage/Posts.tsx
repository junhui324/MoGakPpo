import styles from './posts.module.scss';
import NoContentImage from '../../assets/NoContent.png';
import { useEffect, useState } from 'react';
import { TypeUserPosts } from '../../interfaces/Project.interface';
import { getUserPosts } from '../../apis/Fetcher';
import Project from '../../components/ProjectList/Project';

function Posts() {
  const [posts, setPosts] = useState<TypeUserPosts | []>([]);
  const getUserData = async () => {
    try {
      const data = (await getUserPosts()) as unknown as TypeUserPosts;
      setPosts(data);
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
        <ul>
          {posts.length > 0 ? (
            posts.map((post, index) => {
              if ('project' in post) {
                const {
                  project_id,
                  project_type,
                  project_recruitment_status,
                  project_title,
                  project_goal,
                  project_participation_time,
                  project_bookmark_count,
                  project_comments_count,
                  project_views_count,
                  project_created_at,
                } = post.project;

                const newProjectData = {
                  project_id,
                  project_type,
                  project_recruitment_status,
                  project_title,
                  project_goal,
                  project_participation_time,
                  project_bookmark_count,
                  project_comments_count,
                  project_views_count,
                  project_created_at,
                };

                return (
                  <li key={index}>
                    <span>프로젝트</span>
                    <Project projectData={newProjectData} />
                  </li>
                );
              }
            })
          ) : (
            <div>
              <img className={styles.image} src={NoContentImage} alt="No Content" />
              <div className={styles.noContent}>아직 작성한 게시글이 없어요.</div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Posts;
