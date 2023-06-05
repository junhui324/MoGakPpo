import { useEffect, useState } from 'react';
import { CgShare } from 'react-icons/cg';
import { FacebookShareButton, FacebookIcon } from 'react-share';

// 스타일
import styles from './ProjectShare.module.scss';
import ModalBasic from '../common/Modal/ModalBasic';
import { MdClose } from 'react-icons/md';

const LOGO_SIZE: number = 14;
const LOGO_DEFAULT_COLOR: string = '#D3D3D3';

const CLOSE_LOGO_SIZE: number = 24;
const CLOSE_LOGO_COLOR: string = '#555555';

const ShareModal = ({
  onClose,
  shareText,
  url,
}: {
  onClose: () => void;
  shareText: string;
  url: string;
}) => {
  const shareToTwitter = () => {
    const sharedLink = 'text=' + encodeURIComponent(shareText + '\n') + encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?${sharedLink}`, '_black');
  };
  const shareToFacebook = () => {
    const sharedLink = encodeURIComponent(url);
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`, '_black');
  };

  return (
    <ModalBasic setModalOpen={() => true} closeButton={false} fullScreen={true}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <MdClose size={CLOSE_LOGO_SIZE} color={CLOSE_LOGO_COLOR} />
        </button>
        <p className={styles.modalText}>공유하기</p>
        <div className={styles.modalButtonBox}>
          <button className={styles.kakaoLogoCircle}>카카오톡</button>
          <button className={styles.facebookLogoCircle} onClick={shareToFacebook}>
            페이스북
          </button>
          <button className={styles.twitterLogoCircle} onClick={shareToTwitter}>
            트위터
          </button>
          <button className={styles.linkLogoCircle}>주소복사</button>
        </div>
      </div>
    </ModalBasic>
  );
};

export default function ProjectShare({ projectTitle }: { projectTitle: string }) {
  // 모달 설정
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleModal = () => {
    setIsModal(false);
  };

  // 공유 텍스트 설정
  const currentURL = window.location.href;
  const shareText = `모프에서 게시글을 확인하세요!   |
${projectTitle}
`;

  return (
    <>
      <div className={styles.container} onClick={() => setIsModal(true)}>
        <div className={styles.logoCircle}>
          <CgShare size={LOGO_SIZE} color={LOGO_DEFAULT_COLOR} />
        </div>
        <p>공유하기</p>
      </div>
      {isModal ? <ShareModal onClose={handleModal} shareText={shareText} url={currentURL} /> : ''}
    </>
  );
}
