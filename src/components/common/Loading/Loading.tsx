import { BiDotsVertical } from 'react-icons/bi';

import styles from './Loading.module.scss';

const LOADING_LOGO_SIZE: number = 32;
const LOADING_LOGO_COLOR: string = '#95a4b0';

// 로딩 중 로고
export default function Loading() {
  return (
    <div className={styles.container}>
      <BiDotsVertical
        size={LOADING_LOGO_SIZE}
        color={LOADING_LOGO_COLOR}
        className={styles.loadingLogo}
      />
    </div>
  );
}
