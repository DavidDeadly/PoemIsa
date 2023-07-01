import { FC, useRef, useState } from 'react';
import { TextEditor } from './TextEditor';
import { TextEditorToolbar } from './TextEditorToolbar';
import { useWritePoem } from '@/hooks/useWritePoem';

export const PoemIsaEditor: FC = () => {
  const editorRef = useRef<TextEditor>(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const { content, handleContentChange } = useWritePoem({ editorRef });

  return (
    <>
      <TextEditor
        ref={editorRef}
        placeholder="Escribe algo hermoso..."
        content={content}
        handleContentChange={handleContentChange}
        changeIsTextSelected={setIsTextSelected}
      />
      <TextEditorToolbar
        editorRef={editorRef}
        isTextSelected={isTextSelected}
      />
    </>
  );
};
