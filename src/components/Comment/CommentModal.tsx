import ModalBasic from '../common/Modal/ModalBasic';

interface ModalBasicProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  isMyComment: boolean;
}

export default function CommentModal({ modalOpen, setModalOpen, isMyComment }: ModalBasicProps) {
  return (
    <div>
      {modalOpen && (
        <ModalBasic setModalOpen={setModalOpen} closeButton={false}>
          <ul>
            {isMyComment && (
              <>
                <li>수정</li>
                <li>삭제</li>
              </>
            )}
            <li>댓글 복사</li>
          </ul>
        </ModalBasic>
      )}
    </div>
  );
}
