/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import Colors from '../../config/Colors';
import AvatarImage from '../AvatarImage';

const EmployeeCard = ({ item }) => {
  
  return (
    <View style={styles.container}>      
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text numberOfLines={2} style={styles.title}>{item.first_name}</Text>
          <Text numberOfLines={3} style={styles.subtitle}>{item.last_name}</Text>
        </View>
        <View style={styles.rightContent}>
          <AvatarImage source={item.image } />
        </View>
      </View>
    </View>
  );
};

export default EmployeeCard;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: Colors.lightBorder,
    elevation: 1,
    borderRadius: 2,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    height: 165,
  },
  content: {
    marginTop: 15,
    flexDirection: 'row',
  },
  leftContent: {
    width: '70%',
  },
  title: {
    // fontFamily: 'Inter-SemiBold',
    color: Colors.contentTitle,
    marginBottom: 10,
  },
  subtitle: {
    // fontFamily: 'Inter-Regular',
    color: Colors.blandText,
  },
  rightContent: {
    alignItems: 'center',
    width: '30%',
    paddingLeft: 10,
  },
  imageContainer: {
    height: 50,
    width: 50,
  },
});
