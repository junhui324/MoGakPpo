import ModalBasic from '../common/Modal/ModalBasic';
import styles from './CommentModal.module.scss';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiCopy } from 'react-icons/fi';

interface ModalBasicProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  isMyComment: boolean;
  onClickEdit: () => void;
  onClickDelete: () => void;
  onClickCopy: () => void;
}

export default function CommentModal({
  modalOpen,
  setModalOpen,
  isMyComment,
  onClickEdit,
  onClickDelete,
  onClickCopy,
}: ModalBasicProps) {
  return (
    <div className={styles.modalContainer}>
      {modalOpen && (
        <ModalBasic setModalOpen={setModalOpen} closeButton={false}>
          <ul className={styles.modalList}>
            {isMyComment && (
              <>
                <li onClick={onClickEdit}>
                  <FiEdit3 />
                  수정
                </li>
                <li onClick={onClickDelete}>
                  <RiDeleteBinLine />
                  삭제
                </li>
              </>
            )}
            <li onClick={onClickCopy}>
              <FiCopy />
              복사
            </li>
          </ul>
        </ModalBasic>
      )}
    </div>
  );
}
