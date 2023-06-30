import React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useUser } from '@/hooks';
import { COLORS } from '@/constants';
import { posts } from '@/mocks/Posts';
import LinearGradient from 'react-native-linear-gradient';

const AppGradient = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
};

export const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <h1>No has iniciado sesión!!</h1>;
  }

  return (
    <LinearGradient
      accessibilityLabel="login"
      colors={Object.values(COLORS.MAIN)}
      style={styles.container}
      start={AppGradient.start}
      end={AppGradient.end}>
      <Image
        defaultSource={require('@/assets/images/default-profile-photo.png')}
        source={{ uri: user.photoURL ?? undefined }}
        style={styles.image}
      />
      <View style={styles.identity}>
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.content}
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Text style={styles.poems}>{item.body}</Text>}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    gap: 15
  },
  name: {
    fontSize: 30,
    color: '#222',
    textAlign: 'center',
    fontFamily: 'MontserratAlternates-BlackItalic'
  },
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
  identity: {},
  list: {
    width: '90%',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#222'
  },
  content: {
    display: 'flex',
    alignSelf: 'center',
    minHeight: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  poems: {
    marginVertical: 10,
    textAlign: 'left'
  }
});
