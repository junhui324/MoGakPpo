// import './editor.css';
import 'quill/dist/quill.snow.css';
import styles from './Editor.module.scss';

interface QuillEditorProps {
  innerRef: any;
}
const QuillEditor = ({ innerRef }: QuillEditorProps) => {
  return <div ref={innerRef} className={styles.editor} id="editor-container" />;
};

export default QuillEditor;
