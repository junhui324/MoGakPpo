import 'quill/dist/quill.snow.css';
import styles from './Editor.module.scss';

interface QuillEditorProps {
  innerRef: any;
  onFocus: () => void;
  onBlur: () => void;
}
const QuillEditor = ({ innerRef, onFocus, onBlur }: QuillEditorProps) => {
  return (
    <div
      ref={innerRef}
      className={`${styles.editor}`}
      id="editor-container"
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default QuillEditor;
