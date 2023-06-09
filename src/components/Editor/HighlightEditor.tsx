import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import { HighlightModules } from './Highlight';

function HighlightEditor() {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const editorElement = editorRef.current;
    if (!editorElement) return;

    const quill = new Quill(editorElement, {
      modules: {
        ...HighlightModules,
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ 'code-block': 'highlight' }],
        ],
      },
      theme: 'snow',
    });

    // 텍스트 변경 시 이벤트 처리
    quill.on('text-change', () => {
      const value = quill.root.innerHTML;
      console.log(value)
    });
  }, []);

  return (
    <div ref={editorRef}>
    </div>
  );
}

export default HighlightEditor;
