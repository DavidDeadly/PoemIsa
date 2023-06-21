import { COLORS } from '@/constants';
import { useRef } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

const contextToolbarOptions = [
  [{ indent: '-1' }, { indent: '+1' }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ script: 'sub' }, { script: 'super' }],
  ['clean']
];

const bottomToolbarOptions = [
  [{ align: [false, 'center', 'right'] }],

  [{ color: [] }, { background: [] }],

  [{ font: [] }],
  [{ size: ['small', false, 'large'] }]
];

const customStyles = {
  toolbar: {
    provider: (provided: object) => ({
      ...provided,
      borderColor: COLORS.MAIN.PRIMARY,
      backgroundColor: COLORS.MAIN.SECONDARY
    }),
    root: (provided: object) => ({
      ...provided,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }),
    toolset: {
      root: (provided: object) => ({
        ...provided,
        justifyContent: 'center',
        alignItems: 'center'
      })
    }
  },
  separator: (provided: object) => {
    console.log('separator: ', provided);
    return {
      ...provided,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      color: 'green'
    };
  },
  selection: {
    close: {
      view: (provided: object) => ({
        ...provided,
        backgroundColor: COLORS.MAIN.PRIMARY
      })
    }
  }
};

export const WritePoem = () => {
  const editorRef = useRef<QuillEditor | null>(null);

  return (
    <>
      <View style={styles.container}>
        <QuillEditor
          ref={editorRef}
          style={styles.editor}
          quill={{
            placeholder: 'Write something beautiful...',
            theme: 'snow',
            modules: {
              toolbar: contextToolbarOptions
            }
          }}
        />
        <QuillToolbar
          editor={editorRef}
          options={bottomToolbarOptions}
          theme="light"
          styles={customStyles}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0
  },
  text: {
    color: '#222'
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'red',
    borderWidth: 1,
    margin: 'auto',
    backgroundColor: 'white'
  }
});
