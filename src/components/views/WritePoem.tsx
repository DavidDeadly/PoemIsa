import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import {
  RichEditor,
  RichToolbar,
  actions
} from 'react-native-pell-rich-editor';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS } from '@/constants';

const AppGradient = {
  start: { x: 0, y: 2 },
  end: { x: 2, y: 0 }
};

const editorStyles = {
  contentCSSText: 'font-size: 20px;',
  placeholderColor: 'lightgray'
};

export const WritePoem = () => {
  const editorRef = useRef<RichEditor | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [title, settitle] = useState('');

  const handleTitleChange = (newtitle: string) => {
    console.log(title);
    settitle(newtitle);
  };

  const handleCursorPosition = useCallback((scrollOffsetY: number) => {
    console.log(scrollOffsetY);
    scrollRef.current!.scrollTo({ y: scrollOffsetY - 130, animated: true });
  }, []);

  const selectRed = () => {
    const editor = editorRef?.current;

    if (editor) {
      editor.setForeColor('red');
    }
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('hided');
        if (editorRef.current) {
          editorRef.current.blurContentEditor();
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <LinearGradient
      accessibilityLabel="login"
      colors={Object.values(COLORS.MAIN)}
      style={styles.parentView}
      start={AppGradient.start}
      end={AppGradient.end}>
      {/* <View style={{ ...styles.editorView, ...styles.titleEditorView }}>
        <TextInput
          autoCorrect={false}
          style={styles.titleEditor}
          value={title}
          onChangeText={handleTitleChange}
          multiline={false}
          cursorColor="black"
          placeholder="Title..."
          placeholderTextColor="lightgray"
        />
      </View> */}
      <ScrollView
        ref={scrollRef}
        style={{ ...styles.editorView, ...styles.contentEditorView }}
        scrollEventThrottle={20}>
        <RichEditor
          ref={editorRef}
          showsVerticalScrollIndicator={false}
          initialHeight={600}
          placeholder="Write something beautiful..."
          androidLayerType="hardware"
          onCursorPosition={handleCursorPosition}
          editorStyle={editorStyles}
        />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          editor={editorRef}
          style={styles.toolbar}
          actions={[
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.removeFormat
          ]}
        />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1
  },
  contentEditorView: {
    marginVertical: 30,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  titleEditorView: {
    marginTop: 2,
    borderRadius: 0,
    paddingTop: 10
  },
  titleEditor: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontWeight: '600'
  },
  editorView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  toolbar: {
    display: 'flex',
    alignContent: 'center',
    backgroundColor: COLORS.MAIN.SECONDARY
  }
});
