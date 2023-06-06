import ModalBasic from '../common/Modal/ModalBasic';

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
    <div>
      {modalOpen && (
        <ModalBasic setModalOpen={setModalOpen} closeButton={false}>
          <ul>
            {isMyComment && (
              <>
                <li onClick={onClickEdit}>수정</li>
                <li onClick={onClickDelete}>삭제</li>
              </>
            )}
            <li onClick={onClickCopy}>댓글 복사</li>
          </ul>
        </ModalBasic>
      )}
    </div>
  );
}
