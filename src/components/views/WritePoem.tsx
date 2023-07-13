import { StyleSheet } from 'react-native';

import { PoemIsaEditor } from '@/components/PoemIsaEditor';
import { PoemIsaGradient } from '@/components/PoemIsaGradient';

const EditorGradient = {
  start: { x: 0, y: 2 },
  end: { x: 2, y: 0 }
};

export const WritePoem = () => (
  <PoemIsaGradient label="editor" style={parentView} gradient={EditorGradient}>
    <PoemIsaEditor />
  </PoemIsaGradient>
);

const { parentView } = StyleSheet.create({
  parentView: {
    flex: 1
  }
});
