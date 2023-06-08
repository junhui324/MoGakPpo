import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styles from './Editor.module.scss';

import { useRecoilValue } from 'recoil';
import { classificationState } from '../../recoil/projectState';
import { useParams } from 'react-router-dom';

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}
function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const classification = useRecoilValue(classificationState);
  const { type } = useParams();

  useEffect(() => {
    const editorElement = editorRef.current;
    if (!editorElement) return;

    quillRef.current = new Quill(editorElement, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', 'code-block', 'image'],
        ],
      },
      placeholder: '프로젝트 소개를 입력하세요.',
      theme: 'snow',
    });

    // 텍스트 변경 시 이벤트 처리
    quillRef.current.on('text-change', () => {
      const content = quillRef.current?.root.innerHTML || '';
      onChange(content);
    });
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    // 부모 컴포넌트에서 value 변경 시 에디터 내용 초기화
    if (value === '') {
      quill.setText('');
    }
    if (value !== quill.root.innerHTML) {
      quill.root.innerHTML = value;
    }
  }, [value, classification, type]);

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorMiddleContainer} ref={editorRef}>
        <div dangerouslySetInnerHTML={{ __html: value }}></div>
      </div>
    </div>
  );
}

export default Editor;
