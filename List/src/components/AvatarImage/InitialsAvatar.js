import React from 'react';
import { Avatar } from 'react-native-elements';

export default function InitialsAvatar(title) {
  return (
    <Avatar
      rounded
      size="large"
      title={title}
    />
  );
}
