import ModalBasic from '../common/Modal/ModalBasic';

interface ModalBasicProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export default function CommentModal({ modalOpen, setModalOpen }: ModalBasicProps) {
  return (
    <div>
      {modalOpen && (
        <ModalBasic setModalOpen={setModalOpen} closeButton={false}>
          <ul>
            <li>수정</li>
            <li>삭제</li>
          </ul>
        </ModalBasic>
      )}
    </div>
  );
}
