import { useEffect } from 'react';
import { CgShare } from 'react-icons/cg';

// 스타일
import styles from './ProjectShare.module.scss';

const LOGO_SIZE: number = 14;
const LOGO_DEFAULT_COLOR: string = '#D3D3D3';

export default function ProjectShare() {
  return (
    <div className={styles.container}>
      <div className={styles.logoCircle}>
        <CgShare size={LOGO_SIZE} color={LOGO_DEFAULT_COLOR} />
      </div>
      <p>공유하기</p>
    </div>
  );
}
