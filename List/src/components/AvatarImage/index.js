import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { files } from 'codemash';
// import styles from './styles';

export default function AvatarImage({ source, optimization, editButtonIcon, size }) {
  if (!source || !source[0]) {
    return null;
  }

  const optimizationSize = optimization || '300x300';
  const image = source[0];

  let { directory } = image;
  let { fileName } = image;

  if (image.optimizations && image.optimizations.length > 0) {
    const found = image.optimizations.find((opt) => opt.optimization === optimizationSize);
    if (found) {
      directory = found.directory;
      fileName = found.fileName;
    }
  }

  const path = files.getFilePath(directory, fileName);

  return (
    <Avatar
      rounded
      size={size || 'large'}
      showEditButton={editButtonIcon && true}
      editButton={
        {
          name: editButtonIcon && editButtonIcon.icon_name,
          type: 'material',
          iconStyle: {
            color: editButtonIcon && editButtonIcon.color,
          },
        }
      }
      source={{ uri: path }}
      placeholderStyle={{ backgroundColor: '#ededed' }}
      renderPlaceholderContent={<ActivityIndicator animating />}
    />
  );
}
