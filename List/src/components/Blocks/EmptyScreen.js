import React from 'react';
import { Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Image } from 'react-native-elements';
import { darkColors } from '../../config/Colors';
const noContentImage = require('../../assets/no_results_icon.png');

const EmptyScreen = ({ message, onRefresh, isRefreshing }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={onRefresh ? <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} /> : undefined}
    >
      <Image
        source={noContentImage}
        containerStyle={styles.imageContainer}
        resizeMode="contain"
      />
      <Text style={styles.text}>{message || 'Rezultatų nerasta.'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
  },
  imageContainer: {
    height: 100,
    width: 200,
  },
  text: {
    // fontFamily: 'Inter-Regular',
    color: darkColors.dark7,
    fontSize: 18,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
});

export default EmptyScreen;
