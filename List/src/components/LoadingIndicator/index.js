import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';

export default function LoadingIndicator({ relative }) {
  return (
    <View style={relative ? styles.relativeLoader : styles.absoluteLoader}>
      <ActivityIndicator animating size="large" />
    </View>
  );
}
