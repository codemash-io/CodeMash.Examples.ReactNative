import React from 'react';
import { Avatar } from 'react-native-elements';
import styles from './styles';

export default function AppLogoAvatar({ logoPath }) {
  return (
    <Avatar
      rounded
      avatarStyle={styles.fixNotRoundedImages}
      size="large"
      title="Logo"
      // eslint-disable-next-line global-require
      source={require(logoPath)}
    />
  );
}
