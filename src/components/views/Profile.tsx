import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Logout } from 'iconsax-react-native';

import { useNotify, useUser } from '@/hooks';
import { COLORS } from '@/constants';
import { useIsFocused } from '@react-navigation/native';
import { getPoemsByUser } from '@/services/Poems';
import { Auth } from '@/services';
import { Button } from '@/components/Button';
import { Poem } from '@/types/models/poem';
import { PoemIsaGradient } from '@/components/PoemIsaGradient';

const ProfileGradient = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
};

export const Profile = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const isFocused = useIsFocused();
  const notify = useNotify();
  const { user } = useUser();

  const signOut = () => Auth.signOut();

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
    <PoemIsaGradient
      label="profile"
      style={container}
      gradient={ProfileGradient}>
      <View style={userInfoContainer}>
        <Button onPress={signOut} style={signOutBtn}>
          <Logout size="20" color={COLORS.MAIN.SECONDARY} />
          <Text>Salir</Text>
        </Button>
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
    </PoemIsaGradient>
  );
};

const {
  poem,
  list,
  text,
  email,
  image,
  name,
  container,
  authorText,
  poemsContainer,
  userInfoContainer,
  signOutBtn
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
  signOutBtn: {
    position: 'absolute',
    right: 10
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
