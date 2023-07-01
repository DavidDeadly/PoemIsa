import { FC } from 'react';
import { QuillToolbar } from 'react-native-cn-quill';

import { COLORS } from '@/constants';
import { TextEditorRef } from '@/components//TextEditor';
import {
  customFormatHandler,
  defaultToolbarOptions,
  selectionToolbarOptions,
  toolbarsStyles
} from '@/helpers/toolbar';
import { customFormats } from '@/helpers/toolbar/handlers';

type TextEditorToolbarProps = {
  editorRef: TextEditorRef;
  isTextSelected: boolean;
};

export const TextEditorToolbar: FC<TextEditorToolbarProps> = ({
  editorRef,
  isTextSelected
}) => {
  const toolbarOptions = isTextSelected
    ? selectionToolbarOptions
    : defaultToolbarOptions;

  const customHandler = (name: string, value: any) => {
    const editor = editorRef.current;

    if (!editor) return;

    const formatHandler = customFormatHandler.get(name);

    if (!formatHandler) return;

    formatHandler(editor, value);
  };

  return (
    <QuillToolbar
      editor={editorRef}
      options={toolbarOptions}
      theme={{
        background: COLORS.MAIN.SECONDARY,
        color: COLORS.MAIN.PRIMARY,
        overlay: `${COLORS.MAIN.PRIMARY}30`,
        size: 35
      }}
      custom={{
        handler: customHandler,
        actions: customFormats
      }}
      styles={toolbarsStyles}
    />
  );
};
