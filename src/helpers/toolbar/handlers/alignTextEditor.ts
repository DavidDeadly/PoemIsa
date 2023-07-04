import { TextEditor } from '@/components/TextEditor';

type AlignValues = false | 'right' | 'center';

export async function alignTextEditor(editor: TextEditor, value: AlignValues) {
  const { length } = await editor.getSelection();

  const nothingIsSelected = length === 0;
  if (nothingIsSelected) {
    const textLength = await editor.getLength();
    await editor.formatText(0, textLength, {
      align: value
    });

    return;
  }

  editor.format('align', value);
}
