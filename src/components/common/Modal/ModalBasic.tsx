import { useEffect, useRef } from 'react';
import styles from './ModalBasic.module.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type TypeModalBasicProps = {
  setModalOpen: (newValue: boolean) => void;
  children: React.ReactNode;
  closeButton?: boolean;
  position?: string;
};
function ModalBasic({
  setModalOpen,
  children,
  closeButton,
  position = 'left',
}: TypeModalBasicProps) {
  // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', (event) => handler(event));
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', (event) => handler(event));
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, []);

  return (
    <div className={`${styles.container} ${position === 'left' ? styles.left : styles.right}`}>
      <div ref={modalRef} className={styles.contentsContainer}>
        {closeButton && (
          <div className={styles.closeContainer}>
            <button className={styles.close} onClick={closeModal}>
              <AiOutlineCloseCircle size={24} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
export default ModalBasic;
