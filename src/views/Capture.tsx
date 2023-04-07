import { useState } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

import { HandWrittenTextResponse } from '../../functions/src';
import { Button } from '../components/Button';
import { openai } from '../services/openai';

export const Capture = () => {
  const [image, setImage] = useState<string>();
  const [imageText, setImageText] = useState<string>();

  const onTakePhoto = () =>
    launchCamera({ mediaType: 'photo', includeBase64: true }, onImageSelect);

  const onSelectImagePress = () =>
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      onImageSelect
    );

  const onImageSelect = async (media: ImagePickerResponse) => {
    if (!media.didCancel && media.assets && media.assets[0].uri) {
      const imageUri = media.assets[0].uri;
      setImage(imageUri);

      const imageReference = storage()
        .ref('images')
        .child(media.assets[0].fileName ?? 'image.jpg');

      await imageReference.putFile(imageUri);

      const handWrittenTextRecognition = functions().httpsCallable(
        'handWrittenTextRecognition'
      );

      console.log('Image uploaded to the bucket: ', imageReference.fullPath);
      handWrittenTextRecognition(imageReference.fullPath)
        .then((result: HandWrittenTextResponse) => {
          console.log('Text Recognition Result: ', result.data.text);
          setImageText(result.data.text);
        })
        .catch(error => console.log(error));
    }
  };

  async function askChatGPT(ev: GestureResponderEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    console.log('Asking chatGPT to fix your text: ', imageText);

    const prompt = `Este fue el resultado de un proceso de OCR, con el servicio de google cloud visión, a un documento escrito a mano: \n
"${imageText}"
Al parecer solo reconoce las palabras, entonces las entrega en un orden que carecen de sentido, incluso las repite; podrías reordenar la frase y eliminar las palabras que estén repetidas o no encajen en la frase?`;

    console.log({ prompt });
    openai
      .createCompletion({
        model: 'text-davinci-003',
        prompt: prompt
      })
      .then(response => {
        const davinciSuggestion = response.data.choices[0].text;
        console.log("davinci's response: ", davinciSuggestion);
        setImageText(davinciSuggestion);
      })
      .catch(error => console.log("davinci's error:", error));
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Text Recognition</Text>
      <View>
        <Button text="Take a picture" onPress={onTakePhoto} />
        <Button text="Pick a picture" onPress={onSelectImagePress} />
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {image && !imageText && (
        <Text style={styles.loading}>loading image text...</Text>
      )}
      {imageText && (
        <>
          <Text style={styles.text_title}>Text result</Text>
          <Text style={styles.text}>{imageText}</Text>
          <Button text="Ask chatGPT to fix your text" onPress={askChatGPT} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center'
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
    color: '#823BC4'
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 30,
    borderRadius: 10
  },
  loading: {
    marginTop: 30,
    color: '#a4dcef'
  },
  text_title: {
    fontSize: 25,
    color: '#26abd9',
    margin: 15
  },
  text: {
    fontSize: 18,
    color: '#26abd9',
    margin: 15,
    borderColor: '#26abd9',
    borderRadius: 10,
    borderWidth: 1,
    padding: 15
  }
});
