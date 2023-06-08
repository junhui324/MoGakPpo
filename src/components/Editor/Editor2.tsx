import React, { useCallback, useEffect, useRef } from 'react';
import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  savedValue: string;
  onEditorValueChange: (content: string) => void;
}
const QuillEditor = ({ savedValue, onEditorValueChange }: QuillEditorProps) => {
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    quillRef.current = new Quill('#editor-container', {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', 'code-block'],
        ],
      },
      theme: 'snow',
    });
  }, []);

  // 텍스트 변경 시 상위 컴포넌트의 이벤트 처리
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on('text-change', () => {
        const value = quillRef.current!.root.innerHTML;
        onEditorValueChange(value);
      });
    }
  }, [onEditorValueChange]);

  // 임시저장 된 값||수정이 필요한 값 이 있는 경우 불러오기
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.root.innerHTML = savedValue;
    }
  }, [savedValue]);

  return <div id="editor-container" />;
};

export default QuillEditor;
