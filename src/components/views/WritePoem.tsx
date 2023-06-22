import { useCallback, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
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

export const WritePoem = () => {
  const editorRef = useRef<RichEditor | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [touchCordenates, setTouchCordenates] = useState<{
    x: number;
    y: number;
  }>();

  const handleCursorPosition = useCallback((scrollY: number) => {
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  const selectRed = () => {
    const editor = editorRef?.current;

    if (editor) {
      editor.setForeColor('red');
    }
  };

  const focusEditor = () => editorRef.current!.focusContentEditor();

  const shouldFocusEditor = (event: GestureResponderEvent) => {
    if (!touchCordenates) return;

    const { x, y } = touchCordenates;
    const {
      nativeEvent: { pageX, pageY }
    } = event;

    const isNotDragTouch = x === pageX && y === pageY;

    if (isNotDragTouch) {
      focusEditor();
    }
  };

  return (
    <LinearGradient
      accessibilityLabel="login"
      colors={Object.values(COLORS.MAIN)}
      style={styles.parentView}
      start={AppGradient.start}
      end={AppGradient.end}>
      <View>
        <RichToolbar
          editor={editorRef}
          style={styles.toolbarTop}
          actions={[
            actions.indent,
            actions.outdent,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight
          ]}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        nestedScrollEnabled
        scrollEventThrottle={20}
        onTouchStart={ev => {
          setTouchCordenates({
            x: ev.nativeEvent.pageX,
            y: ev.nativeEvent.pageY
          });
        }}
        onTouchEnd={shouldFocusEditor}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichEditor
            focusable
            ref={editorRef}
            placeholder="Write something beautiful..."
            androidLayerType="hardware"
            onCursorPosition={handleCursorPosition}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View>
        <RichToolbar
          editor={editorRef}
          style={styles.toolbar}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.setSuperscript,
            actions.setSubscript,
            actions.keyboard,
            actions.removeFormat
          ]}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: 'gray',
    borderRadius: 5,
    elevation: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  toolbarTop: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: 'gray',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  toolbar: {
    display: 'flex',
    alignContent: 'center',
    backgroundColor: COLORS.MAIN.SECONDARY
  }
});
