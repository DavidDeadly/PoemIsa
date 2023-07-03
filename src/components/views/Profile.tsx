import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useNotify, useUser } from '@/hooks';
import { COLORS } from '@/constants';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { getPoemsByUser } from '@/services/Poems';

const AppGradient = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
};

export const Profile = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const isFocused = useIsFocused();
  const notify = useNotify();
  const { user } = useUser();

  useEffect(() => {
    if (isFocused && user?.uid) {
      getPoemsByUser(user.uid)
        .then(setPoems)
        .catch(err => {
          console.error('Error getting: ', err.message);
          notify.error('Error obteniendo todos los poemas');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <LinearGradient
      accessibilityLabel="profile"
      colors={Object.values(COLORS.MAIN)}
      style={container}
      start={AppGradient.start}
      end={AppGradient.end}>
      <View style={userInfoContainer}>
        <Image
          defaultSource={require('@/assets/images/default-profile-photo.png')}
          source={{ uri: user?.photoURL ?? undefined }}
          style={image}
        />
        <View>
          <Text style={name}>{user?.displayName}</Text>
          <Text style={email}>{user?.email}</Text>
        </View>
      </View>
      <FlatList
        style={list}
        contentContainerStyle={poemsContainer}
        data={poems}
        renderItem={({
          item: {
            title,
            author: { displayName: authorName }
          }
        }) => {
          return (
            <View style={poem}>
              <Text style={text}>Title: {title}</Text>
              <Text style={[text, authorText]}>
                By: {authorName ?? 'Anonymous'}
              </Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  );
};

const {
  container,
  authorText,
  poem,
  poemsContainer,
  userInfoContainer,
  list,
  text,
  email,
  image,
  name
} = StyleSheet.create({
  email: {
    color: '#222',
    textAlign: 'center',
    fontFamily: 'MontserratAlternates-Medium'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    marginTop: 20,
    borderColor: COLORS.MAIN.SECONDARY
  },
  name: {
    fontSize: 30,
    color: '#222',
    textAlign: 'center',
    fontFamily: 'MontserratAlternates-BlackItalic'
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  text: {
    textAlign: 'center',
    color: '#222'
  },
  authorText: {
    fontStyle: 'italic',
    fontWeight: '500'
  },
  list: {
    flex: 3,
    borderRadius: 10
  },
  poemsContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    gap: 5
  },
  poem: {
    backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10
  }
});
