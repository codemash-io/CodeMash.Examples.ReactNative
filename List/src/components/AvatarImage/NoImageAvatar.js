import React from 'react';
import { Avatar } from 'react-native-elements';
import styles from './styles';

export default function NoImageAvatar({ noPhotoPath }) {
  return (
    <Avatar
      rounded
      avatarStyle={styles.fixNotRoundedImages}
      size="large"
      title="No Image"
      // eslint-disable-next-line global-require
      source={require(noPhotoPath)}
    />
  );
}
